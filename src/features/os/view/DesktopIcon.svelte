<script lang="ts">
	export let x = 50;
	export let y = 50;
	export let label = "My Folder";
	export let iconUrl = "https://cdn-icons-png.flaticon.com/512/715/715676.png";
	export let onDblClick: () => void;
</script>

<div class="desktop-icon" style="top: {y}px; left: {x}px;" on:dblclick={onDblClick}>
	<img src={iconUrl} alt={label} />
	<div>{label}</div>
</div>

<style>
    .desktop-icon {
        position: absolute;
        width: 60px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        cursor: default;
        pointer-events: auto;
        user-select: none;
    }

    .desktop-icon img {
        width: 40px;
        height: 40px;
        display: block;
        margin: 0 auto;
    }
</style>
