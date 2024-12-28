<script lang="ts">
	export let showSettingsMenu: boolean;
	export let settingsMenuX: number;
	export let settingsMenuY: number;
	export let theme: any;
	export let handleBackgroundUpload: (e: Event) => void;
</script>

{#if showSettingsMenu}
	<div
		class="settings-menu"
		style="top: {settingsMenuY}px; left: {settingsMenuX}px;"
	>
		<p><strong>Settings</strong></p>
		<label>
			Taskbar BG:
			<input type="color" bind:value={theme.taskbarBg} />
		</label>
		<label>
			Taskbar Text:
			<input type="color" bind:value={theme.taskbarText} />
		</label>
		<label>
			Start Menu BG:
			<input type="color" bind:value={theme.startMenuBg} />
		</label>
		<label>
			Start Menu Text:
			<input type="color" bind:value={theme.startMenuText} />
		</label>
		<label>
			Window Title BG:
			<input type="color" bind:value={theme.windowTitleBg} />
		</label>
		<label>
			Window Title Text:
			<input type="color" bind:value={theme.windowTitleText} />
		</label>
		<label>
			Window Content BG:
			<input type="color" bind:value={theme.windowContentBg} />
		</label>
		<label>
			Window Content Text:
			<input type="color" bind:value={theme.windowContentText} />
		</label>
		<!-- Background image upload -->
		<label>
			Change background:
			<input type="file" accept="image/*" on:change={handleBackgroundUpload} />
		</label>
	</div>
{/if}

<style>
    .settings-menu {
        position: absolute;
        pointer-events: auto;
        width: 200px;
        background-color: #ccc;
        border: 1px solid #999;
        padding: 8px;
        z-index: 99999;
    }

    .settings-menu label {
        display: block;
        margin-bottom: 4px;
    }
</style>
