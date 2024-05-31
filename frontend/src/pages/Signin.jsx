import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Alert } from "../components/Alert";
import videoBG from "../assets/videoBG.mp4";
import videoLeft from "../assets/videoBgLeft.mp4";


export const Signin = () => {
	const [username, setUsername] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [signInMethod, setSignInMethod] = useState("email");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let credentials = {};
			if (signInMethod === "email") {
				credentials = { username, password };
			} else if (signInMethod === "phone") {
				credentials = { phoneNumber, password };
			}
			const response = await axios.post(
				`http://localhost:3000/api/v1/user/signin${
					signInMethod === "phone" ? `?phoneNumber=${phoneNumber}` : ""
				}`,
				credentials
			);
			localStorage.setItem("token", response.data.token);
			navigate("/dashboard");
		} catch (error) {
			setError({ message: error.response.data.message, severity: "danger" });
		}
	};

	return (
		<div className='bg-slate-300 h-screen flex overflow-hidden'>
			<div className='relative w-1/2 h-full'>
				<video
					src={videoLeft}
					autoPlay
					loop
					muted
					alt='Illustration of the signup process'
					className='absolute top-0 left-0 w-full h-full object-cover'
				/>

				<div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-10'>
					<div className='flex flex-col justify-center'>
						<div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
							<Heading label={"Sign in"} />
							<SubHeading
								label={"Enter your credentials to access your account"}
							/>
							<div className='flex gap-4'>
								<Button
									label={"Email"}
									onClick={() => setSignInMethod("email")}
								/>
								<Button
									label={"Phone"}
									onClick={() => setSignInMethod("phone")}
								/>
							</div>
							{signInMethod === "email" && (
								<>
									<InputBox
										onChange={(e) => {
											setUsername(e.target.value);
										}}
										placeholder='harkirat@gmail.com'
										label={"Email"}
									/>
								</>
							)}
							{signInMethod === "phone" && (
								<>
									<InputBox
										onChange={(e) => {
											setPhoneNumber(e.target.value);
										}}
										placeholder='Phone Number'
										label={"Phone Number"}
									/>
								</>
							)}
							<InputBox
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								placeholder='123456'
								label={"Password"}
							/>
							<div className='pt-4'>
								<Button onClick={handleSubmit} label={"Sign in"} />
							</div>
							{error && (
								<Alert
									message={error.message}
									type={error.type}
									onClose={() => setError(null)}
								/>
							)}
							<BottomWarning
								label={"Don't have an account?"}
								buttonText={"Sign up"}
								to={"/signup"}
							/>
							<BottomWarning
								label={"Forgot Your Password?"}
								buttonText={"Reset Password"}
								to={"/reset"}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='w-1/2 h-full'>
				<video
					src={videoBG}
					autoPlay
					loop
					muted
					alt='Illustration of the signin process'
					className='m-0 p-0 w-full h-full object-cover'
				/>
			</div>
		</div>
	);
};
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BottomWarning } from "../components/BottomWarning";
// import { Button } from "../components/Button";
// import { Heading } from "../components/Heading";
// import { InputBox } from "../components/InputBox";
// import { SubHeading } from "../components/SubHeading";

// export const Signin = () => {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const navigate = useNavigate();

// 	return (
// 		<div className='bg-slate-300 h-screen flex'>
// 			<div className='w-1/2 bg-white p-4'>
// 				<Heading label={"Sign in"} />
// 				<SubHeading label={"Enter your credentials to access your account"} />
// 				<InputBox
// 					onChange={(e) => {
// 						setUsername(e.target.value);
// 					}}
// 					placeholder='harkirat@gmail.com'
// 					label={"Email"}
// 				/>
// 				<InputBox
// 					onChange={(e) => {
// 						setPassword(e.target.value);
// 					}}
// 					placeholder='123456'
// 					label={"Password"}
// 				/>
// 				<div className='pt-4'>
// 					<Button
// 						onClick={async () => {
// 							const response = await axios.post(
// 								"http://localhost:3000/api/v1/user/signin",
// 								{ username, password }
// 							);
// 							localStorage.setItem("token", response.data.token);
// 							navigate("/dashboard");
// 						}}
// 						label={"Sign in"}
// 					/>
// 				</div>
// 				<BottomWarning
// 					label={"Don't have an account?"}
// 					buttonText={"Sign up"}
// 					to={"/signup"}
// 				/>
// 				<p>
// 					Forgot your password? <a href='#'>Reset password</a>
// 				</p>
// 				<p>
// 					Looking for the Customer portal? <a href='#'>Go to Customer portal</a>
// 				</p>
// 				<p>
// 					<a href='#'>Resend confirmation email</a>
// 				</p>
// 			</div>
// 			<div className='w-1/2 flex justify-center'>
// 				<img
// 					src='path/to/your/image.jpg'
// 					alt='Image of people at a conference'
// 				/>
// 			</div>
// 		</div>
// 	);
// };
