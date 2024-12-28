<script context="module" lang="ts">

    import type { Game, Scene } from "phaser";

    export type TPhaserRef = {
        game: Game | null,
        scene: Scene | null
    };

</script>

<script lang="ts">

    import { onMount } from "svelte";
    import StartGame from "./PhaserConfig";
    import { EventBus } from './features/game/EventBus';
		import OSOverlay from './features/os/view/OSOverlay.svelte';

    export let phaserRef: TPhaserRef = {
        game: null,
        scene: null
    };

		// Track whether the os overlay is visible
		let osVisible = false;

    export let currentActiveScene: (scene: Scene) => void | undefined;

    onMount(() => {

			phaserRef.game = StartGame("game-container");

			window.addEventListener("keydown", (evt) => {
				if (evt.key === "o") {
					osVisible = !osVisible;
				}
			});

        EventBus.on('current-scene-ready', (scene_instance: Scene) => {

            phaserRef.scene = scene_instance;

            if(currentActiveScene)
            {
                
                currentActiveScene(scene_instance);
                
            }

        });

    });

</script>

<div id="game-container"></div>

{#if osVisible}
	<OSOverlay />
{/if}