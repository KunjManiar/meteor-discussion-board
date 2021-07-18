import React from "react";
// import styled from 'styled-components';

// const Loading = styled.div`
import "./loading.css";

// `;

const Loader = ({ fullPage = true }) => {
	return (
		// <div className="loading">
		//     <div></div>
		//     <div></div>
		//     <div></div>
		//     <div></div>
		//     <div className="lds-ellipsis">
		//         <div>
		//         </div>
		//         <div>
		//         </div>
		//         <div>
		//         </div>
		//         <div>
		//         </div>
		//     </div>
		// </div>
		<div style={{ height: fullPage ? "100vh" : "inherit" }}>
			<div className="lds-default">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;
