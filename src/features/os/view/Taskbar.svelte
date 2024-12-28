<script lang="ts">
	import { windows } from '../store/WindowStore';
	import type { OSWindow } from '../store/WindowStore';

	export let theme: any;
	export let toggleStartMenu: () => void;
	export let minimizeWindow: (id: number) => void;

</script>

<div
	class="taskbar"
	style="
    background-color: {theme.taskbarBg};
    color: {theme.taskbarText};
  "
>
	<button
		class="start-button"
		style="background-color: {theme.windowTitleBg}; color: {theme.windowTitleText};"
		on:click={toggleStartMenu}
	>
		Start
	</button>

	<div class="taskbar-windows">
		{#each $windows as w (w.id)}
			<button
				class="taskbar-window-btn"
				style="background-color: {theme.windowTitleBg}; color: {theme.windowTitleText};"
				on:click={() => minimizeWindow(w.id)}
			>
				{w.title}
			</button>
		{/each}
	</div>
</div>

<style>
    .taskbar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        display: flex;
        align-items: center;
        pointer-events: auto;
        z-index: 9999;
        padding-left: 8px;
    }

    .start-button {
        margin-right: 12px;
        cursor: pointer;
        font-weight: bold;
        padding: 4px 10px;
        border: none;
        border-radius: 4px;
    }

    .taskbar-windows {
        display: flex;
        gap: 8px;
    }

    .taskbar-window-btn {
        border: none;
        padding: 4px 8px;
        cursor: pointer;
    }
</style>
