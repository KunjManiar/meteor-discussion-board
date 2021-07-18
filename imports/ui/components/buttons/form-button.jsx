import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import "./button.css";

export default FormButton = ({ onClick, children }) => {
	return (
		<div className="form-button-div">
			<button
				className="form-button"
				// placeholder={label}
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	);
};
