<script lang="ts">
	import { windows, zIndexCounter } from '../store/WindowStore';
	import type { OSWindow } from '../store/WindowStore';
	import { get } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	export let win: OSWindow;
	export let terminalOutput: string[];
	export let terminalInput: string;
	export let theme: any;       // For color theming
	export let defaultFolders: string[];
	export let myFiles: { name: string; data: string }[];
	export let runCommand: () => void;  // callback to run a terminal command
	export let handleTitleBarMouseDown: (e: MouseEvent, w: OSWindow) => void;

	function closeWindow(id: number) {
		windows.update((ws) => ws.filter((w) => w.id !== id));
	}

	function minimizeWindow(id: number) {
		windows.update((ws) => {
			const w = ws.find((win) => win.id === id);
			if (w) w.minimized = !w.minimized;
			return [...ws];
		});
	}

	function maximizeWindow(id: number) {
		windows.update((ws) => {
			const w = ws.find((win) => win.id === id);
			if (!w) return ws;
			if (!w.maximized) {
				w.oldX = w.x;
				w.oldY = w.y;
				w.oldWidth = w.width;
				w.oldHeight = w.height;
				w.x = 0;
				w.y = 0;
				w.width = window.innerWidth;
				w.height = window.innerHeight - 40;
				w.maximized = true;
			} else {
				w.x = w.oldX ?? 100;
				w.y = w.oldY ?? 100;
				w.width = w.oldWidth ?? 400;
				w.height = w.oldHeight ?? 300;
				w.maximized = false;
			}
			focusWindow(id);
			return [...ws];
		});
	}

	function focusWindow(id: number) {
		zIndexCounter.update((z) => z + 1);
		const newZ = get(zIndexCounter);
		windows.update((ws) => {
			const w = ws.find((win) => win.id === id);
			if (w) w.zIndex = newZ;
			return [...ws];
		});
	}
</script>

<div
	class="window {win.minimized ? 'minimized' : ''}"
	style="
    top: {win.y}px;
    left: {win.x}px;
    width: {win.width}px;
    height: {win.height}px;
    z-index: {win.zIndex};
    border-color: {theme.windowTitleBg};
  "
>
	<!-- Title bar -->
	<div
		class="title-bar"
		style="
      background-color: {theme.windowTitleBg};
      color: {theme.windowTitleText};
    "
		on:mousedown={(event) => handleTitleBarMouseDown(event, win)}
	>
		<div>{win.title}</div>
		<div class="buttons">
			<button on:click={() => minimizeWindow(win.id)}>—</button>
			<button on:click={() => maximizeWindow(win.id)}>□</button>
			<button on:click={() => closeWindow(win.id)}>X</button>
		</div>
	</div>

	<!-- Window Content -->
	{#if !win.minimized}
		<div
			class="content"
			style="
        background-color: {theme.windowContentBg};
        color: {theme.windowContentText};
      "
		>
			{#if win.appType === "terminal"}
				<!-- Terminal -->
				<div class="terminal-output">
					{#each terminalOutput as line}
						<p class="terminal-line">{line}</p>
					{/each}
				</div>
				<input
					class="terminal-input"
					type="text"
					bind:value={terminalInput}
					on:keydown={(e) => {
            if (e.key === 'Enter') runCommand();
          }}
					placeholder="Type commands here..."
				/>
			{:else if win.appType === "browser"}
				<!-- Browser -->
				<iframe
					src="https://bing.com"
					style="width: 100%; height: 100%; border: 0;"
				/>
			{:else if win.appType === "ide"}
				<!-- IDE -->
				<textarea
					style="
            width:100%;
            height:100%;
            background:#1e1e1e;
            color:#d4d4d4;
            font-family: monospace;
            border: 1px solid #555;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 8px;
          "
					placeholder="Write some code here..."
				></textarea>
			{:else if win.appType === "folder"}
				<!-- Folder Window: default subfolders + any stored files -->
				<p style="margin-top: 0;">
					<strong>Contents:</strong>
				</p>
				<div class="folder-grid">
					<!-- Default Folders -->
					{#each defaultFolders as folder}
						<div class="folder-item">
							<img
								src="https://cdn-icons-png.flaticon.com/512/715/715676.png"
								alt="Folder"
							/>
							<div class="folder-name">{folder}</div>
						</div>
					{/each}

					<!-- Files (from local storage) -->
					{#each myFiles as file}
						<div class="file-item">
							<img
								src="https://cdn-icons-png.flaticon.com/512/3022/3022250.png"
								alt="File"
							/>
							<div class="file-name">{file.name}</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
    .window {
        position: absolute;
        border: 2px solid #000;
        pointer-events: auto;
        display: flex;
        flex-direction: column;
    }

    .minimized {
        display: none;
    }

    .title-bar {
        padding: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        font-weight: bold;
        user-select: none;
    }

    .buttons button {
        margin-left: 5px;
    }

    .content {
        padding: 8px;
        flex: 1;
        overflow: auto;
    }

    /* Terminal */
    .terminal-output {
        background-color: #000000;
        color: #33ff33;
        font-family: Consolas, monospace;
        padding: 8px;
        min-height: 220px;
        box-sizing: border-box;
        margin-bottom: 6px;
        border: 1px solid #555;
        border-radius: 4px;
    }

    .terminal-line {
        margin: 0;
        white-space: pre-wrap;
    }

    .terminal-input {
        width: 100%;
        box-sizing: border-box;
        font-family: Consolas, monospace;
        border: 1px solid #555;
        color: #33ff33;
        background-color: #000;
        padding: 4px;
        border-radius: 4px;
    }

    .terminal-input:focus {
        outline: none;
    }

    /* File Explorer */
    .folder-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 8px;
    }

    .folder-item, .file-item {
        width: 72px;
        text-align: center;
        user-select: none;
    }

    .folder-item img, .file-item img {
        width: 48px;
        height: 48px;
        display: block;
        margin: 0 auto;
    }

    .folder-name, .file-name {
        margin-top: 4px;
        font-size: 12px;
        color: #fff;
        word-wrap: break-word;
    }
</style>
