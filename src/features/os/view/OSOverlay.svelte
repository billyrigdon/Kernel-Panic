<!-- OSOverlay.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { windows, zIndexCounter } from '../store/WindowStore';
  import type {OSWindow} from '../store/WindowStore';

  import Window from './Window.svelte';
  import Taskbar from './Taskbar.svelte';
  import StartMenu from './StartMenu.svelte';
  import SettingsMenu from './SettingsMenu.svelte';
  import DesktopIcon from './DesktopIcon.svelte';

  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragWindowId: number | null = null;

  let startMenuOpen = false;
  let showSettingsMenu = false;
  let settingsMenuX = 0;
  let settingsMenuY = 0;

  let terminalOutput: string[] = [];
  let terminalInput = "";

  let defaultFolders = ["Documents", "Pictures", "Downloads"];
  let myFiles: { name: string; data: string }[] = [];

  let theme = {
    taskbarBg: "#333333",
    taskbarText: "#ffffff",
    startMenuBg: "#3b3b3b",
    startMenuText: "#ffffff",
    windowTitleBg: "#202020",
    windowTitleText: "#ffffff",
    windowContentBg: "#222222",
    windowContentText: "#ffffff"
  };

  let backgroundImageUrl = "/assets/background.jpg";

  onMount(() => {
    // Load any pre-existing files from localStorage
    const saved = localStorage.getItem("myFiles");
    if (saved) {
      try {
        myFiles = JSON.parse(saved);
      } catch (err) {
        myFiles = [];
      }
    }

    // Load background image from localStorage
    const stored = localStorage.getItem('backgroundImageUrl');
    if (stored) {
      backgroundImageUrl = stored;
    }
  });

  function openWindow(title: string, appType: string) {
    zIndexCounter.update(z => z + 1);
    const newZ = zIndexCounter; // or get(zIndexCounter)
    windows.update((ws) => {
      const newId = ws.length ? Math.max(...ws.map(w => w.id)) + 1 : 1;
      return [
        ...ws,
        {
          id: newId,
          title,
          minimized: false,
          maximized: false,
          x: 200,
          y: 150,
          width: 400,
          height: 300,
          zIndex: Number(newZ),
          appType
        }
      ];
    });
  }

  // Minimizes or toggles minimized state
  function minimizeWindow(id: number) {
    windows.update((ws) => {
      const w = ws.find((win) => win.id === id);
      if (w) w.minimized = !w.minimized;
      return [...ws];
    });
  }

  function toggleStartMenu() {
    startMenuOpen = !startMenuOpen;
  }

  // Desktop Right-click
  function handleDesktopContextMenu(e: MouseEvent) {
    e.preventDefault();
    showSettingsMenu = true;
    settingsMenuX = e.clientX;
    settingsMenuY = e.clientY;
  }

  function handleDesktopClick() {
    if (showSettingsMenu) {
      showSettingsMenu = false;
    }
  }

  // Drag logic
  function handleTitleBarMouseDown(event: MouseEvent, w: OSWindow) {
    if (!w.maximized) {
      isDragging = true;
      dragWindowId = w.id;
      dragOffsetX = event.clientX - w.x;
      dragOffsetY = event.clientY - w.y;
    }
    focusWindow(w.id);
    event.stopPropagation();
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging || dragWindowId === null) return;
    windows.update((ws) => {
      const w = ws.find((win) => win.id === dragWindowId);
      if (w) {
        w.x = event.clientX - dragOffsetX;
        w.y = event.clientY - dragOffsetY;
      }
      return [...ws];
    });
  }

  function handleMouseUp() {
    isDragging = false;
    dragWindowId = null;
  }

  function focusWindow(id: number) {
    zIndexCounter.update(z => z + 1);
    const newZ = Number(zIndexCounter);
    windows.update((ws) => {
      const w = ws.find((win) => win.id === id);
      if (w) w.zIndex = newZ;
      return [...ws];
    });
  }

  // Change background
  function handleBackgroundUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64URL = reader.result as string;
      localStorage.setItem('backgroundImageUrl', base64URL);
      backgroundImageUrl = base64URL;
    };
    reader.readAsDataURL(file);
  }

  // Terminal commands
  function runCommand() {
    const cmd = terminalInput.trim();
    if (!cmd) return;
    terminalOutput = [...terminalOutput, `$ ${cmd}`];

    if (cmd.toLowerCase() === "battle") {
      terminalOutput = [
        ...terminalOutput,
        "You have started a hypothetical battle!",
        "..."
      ];
    } else {
      terminalOutput = [...terminalOutput, `Command not found: ${cmd}`];
    }
    terminalInput = "";
  }

  function openFolder() {
    let existingFolder: OSWindow | undefined;
    $windows.forEach((w) => {
      if (w.appType === "folder") existingFolder = w;
    });
    if (existingFolder) {
      focusWindow(existingFolder.id);
    } else {
      openWindow("My Folder", "folder");
    }
  }
</script>

<!-- Global listeners -->
<svelte:window
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:contextmenu={handleDesktopContextMenu}
  on:click={handleDesktopClick}
/>

<div
  class="os-overlay"
  style="background-image: url('{backgroundImageUrl}');"
>
  <!-- Desktop Folder Icon -->
  <DesktopIcon
    x={50}
    y={50}
    label="My Folder"
    iconUrl="https://cdn-icons-png.flaticon.com/512/715/715676.png"
    onDblClick={openFolder}
  />

  <!-- Render each open window -->
  {#each $windows as w (w.id)}
    <Window
      win={w}
      theme={theme}
      defaultFolders={defaultFolders}
      myFiles={myFiles}
      terminalOutput={terminalOutput}
      terminalInput={terminalInput}
      runCommand={runCommand}
      on:focusWindow
      {handleTitleBarMouseDown}
    />
  {/each}

  <!-- Taskbar -->
  <Taskbar
    {theme}
    {toggleStartMenu}
    {minimizeWindow}
  />

  <!-- Start menu -->
  <StartMenu
    {theme}
    {startMenuOpen}
    {openWindow}
  />

  <!-- Right-click settings menu -->
  <SettingsMenu
    {showSettingsMenu}
    {settingsMenuX}
    {settingsMenuY}
    {theme}
    {handleBackgroundUpload}
  />
</div>

<style>
  .os-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: center center no-repeat;
    background-size: cover;
    pointer-events: auto;
    overflow: hidden;
  }
</style>
