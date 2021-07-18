import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import "./TextArea.css";

export default TextArea = ({
	children,
	name,
	placeholder,
	style,
	onChange,
	value,
}) => {
	return (
		<textarea
			className="text-area"
			// placeholder={label}
			name={name}
			value={value}
			placeholder={placeholder}
			style={style}
			onChange={onChange}
		>
			{children}
		</textarea>
	);
};
