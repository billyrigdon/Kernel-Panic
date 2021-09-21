import "./StartMenu.scss";
import terminalIcon from "../../Assets/Icons/terminal.svg";
import browserIcon from "../../Assets/Icons/browser.svg";
import notesIcon from "../../Assets/Icons/notepad-48.svg";
import startIcon from "../../Assets/Icons/syspeek-90.svg";
import filesIcon from "../../Assets/Icons/file-manager.svg";
import { gsap } from "gsap";
import React, { Component } from "react";

class StartMenu extends Component {

	constructor(props) {
		super(props);
		this.startRef = React.createRef();
	}

	componentDidMount() {	
		gsap.from(this.startRef.current, {
			y: 300,
			duration: 0.2,
			opacity: 0,
			ease: "back"
		});
	}

	render() {
		return (
			<div id="startMenu" tabIndex={0} ref={this.startRef}>
				<div className="startApps">
					<img src={filesIcon} alt="File Manager" />
					<p>Files</p>
				</div>
				<div className="startApps">
					<img src={terminalIcon} alt="Terminal" />
					<p>Terminal</p>
				</div>
				<div className="startApps">
					<img src={browserIcon} alt="Browser" />
					<p>Browser</p>
				</div>
				<div className="startApps">
					<img src={notesIcon} alt="Notes" />
					<p>Notes</p>
				</div>
			</div>
		);
	}
}

export default StartMenu;