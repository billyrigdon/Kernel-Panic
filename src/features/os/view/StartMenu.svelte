<script lang="ts">
	import type { OSWindow } from '../store/WindowStore';

	export let theme: any;
	export let startMenuOpen: boolean;
	export let openWindow: (title: string, appType: string) => void;
</script>

{#if startMenuOpen}
	<div
		class="start-menu"
		style="
      background-color: {theme.startMenuBg};
      color: {theme.startMenuText};
    "
	>
		<p><strong>Start Menu</strong></p>
		<button on:click={() => openWindow("Terminal", "terminal")}>Open Terminal</button>
		<button on:click={() => openWindow("Browser", "browser")}>Open Browser</button>
		<button on:click={() => openWindow("IDE", "ide")}>Open IDE</button>
	</div>
{/if}

<style>
    .start-menu {
        position: absolute;
        left: 0;
        bottom: 40px;
        width: 220px;
        height: 300px;
        border: 2px solid #999;
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        padding: 8px;
        overflow: auto;
        box-sizing: border-box;
    }

    .start-menu p {
        margin-top: 0;
    }

    .start-menu button {
        margin-bottom: 5px;
        padding: 6px 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-align: left;
    }

    .start-menu button:hover {
        background-color: rgba(255,255,255,0.2);
    }
</style>
