// import React from "react";
// import { ToastContainer } from "react-toastify";

// export const Alert = ({ message, type, onClose }) => {
// 	const getType = () => {
// 		switch (type) {
// 			case "error":
// 				return "error";
// 			case "warning":
// 				return "warning";
// 			case "success":
// 				return "success";
// 			default:
// 				return "info";
// 		}
// 	};

// 	return (
// 		<div>
// 			<ToastContainer />
// 			<div
// 				className={`bg-${getType()}-500 text-white px-4 py-2 rounded`}
// 				role='alert'
// 			>
// 				{message}
// 				{onClose && (
// 					<button className='ml-2 font-bold text-white p-1' onClick={onClose}>
// 						&times;
// 					</button>
// 				)}
// 			</div>
// 		</div>
// 	);
// };
// // import React from "react";
// // import { ToastContainer, Toast } from "react-toastify";
// // import { Slide } from "react-toastify";

// // export const Alert = ({ message, type, onClose }) => {
// // 	const getColor = () => {
// // 		switch (type) {
// // 			case "error":
// // 				return "red";
// // 			case "warning":
// // 				return "orange";
// // 			case "success":
// // 				return "green";
// // 			default:
// // 				return "blue";
// // 		}
// // 	};

// // 	return (
// // 		<div>
// // 			<ToastContainer
// // 				position='top-center'
// // 				autoClose={false}
// // 				newestOnTop={false}
// // 				closeOnClick
// // 				rtl={false}
// // 				pauseOnFocusLoss={false}
// // 				draggable={false}
// // 				theme='colored'
// // 				transition={Slide}
// // 				onClose={onClose}
// // 			>
// // 				<Toast type={getColor()}>{message}</Toast>
// // 			</ToastContainer>
// // 		</div>
// // 	);
// // };

import React from "react";

export const Alert = ({ message, severity, onClose }) => {
  return (
    <div
      className={`alert alert-${severity} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      {onClose && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      )}
    </div>
  );
};
