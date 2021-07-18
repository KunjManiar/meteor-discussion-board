import React from "react";

export default Image = ({ size, src, padding, style }) => {
	return (
		<img
			src={src}
			height={size}
			width={size}
			style={{ padding: padding, borderRadius: "50%", ...style }}
		/>
	);
};
