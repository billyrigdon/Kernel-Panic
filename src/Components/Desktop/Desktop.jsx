import "./Desktop.scss";
import { useState, useEffect } from "react";
import browserIcon from "../../Assets/Icons/browser.svg";
import notesIcon from "../../Assets/Icons/notepad-48.svg";
import startIcon from "../../Assets/Icons/syspeek-90.svg";
import filesIcon from "../../Assets/Icons/file-manager.svg";
import terminalIcon from "../../Assets/Icons/terminal.svg";
import StartMenu from "../StartMenu/StartMenu"

const Desktop = (props) => {
	const [time, setTime] = useState(new Date());
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	} 

	useEffect(() => {
		const timer = setInterval(setTime(new Date()), 1000);
		return function cleanup() {
			clearInterval(timer);
		};
	});

	return (
		<div>
			<div id="desktop"></div>
			{menuOpen && <StartMenu/>}
			<div id="taskbar">
				<div id="start-container">
					<img
						id="startMenuButton"
						src={startIcon}
						onClick={toggleMenu}
						alt="Start"
						height="100%"
						width="auto"
					/>
				</div>
				<div id="taskbarApps">
					<img
						src={filesIcon}
						alt="File Manager"
						width="100%"
						height="100%"
					/>
					<img
						src={notesIcon}
						alt="Notes"
						width="100%"
						height="100%"
					/>
					<img
						src={terminalIcon}
						alt="Terminal"
						width="100%"
						height="100%"
					/>
					<img
						src={browserIcon}
						alt="Browser"
						width="100%"
						height="100%"
					/>
				</div>
				<div id="time-container">
					<p id="taskbarTime">{time.toLocaleString()}</p>
				</div>
			</div>
		</div>
	);
};

export default Desktop;
