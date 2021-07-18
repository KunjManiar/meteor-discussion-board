import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import "./button.css";

export default ButtonBesideSpan = ({ style, onClick, children }) => {
	return (
		<button
			className="button-beside-span"
			// placeholder={label}
			onClick={onClick}
			style={style}
		>
			{children}
		</button>
	);
};
