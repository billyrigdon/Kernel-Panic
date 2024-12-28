import { writable } from 'svelte/store';

export interface OSWindow {
	id: number;
	title: string;
	minimized: boolean;
	maximized: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	zIndex: number;
	oldX?: number;
	oldY?: number;
	oldWidth?: number;
	oldHeight?: number;
	appType?: string; // "terminal", "browser", "ide", "folder"
}

export const windows = writable<OSWindow[]>([]);
export let zIndexCounter = writable<number>(100);
