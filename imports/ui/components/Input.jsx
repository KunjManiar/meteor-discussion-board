import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import "./input.css";

export default Input = ({ label, type, name, setInput, placeholder }) => {
	return (
		<div className="input-div">
			<label className="input-label" htmlFor={name}>
				{label}
			</label>
			<input
				className="input-input"
				type={type}
				placeholder={placeholder}
				name={name}
				required
				onChange={(e) => setInput(e.target.value)}
			/>
		</div>
	);
};
