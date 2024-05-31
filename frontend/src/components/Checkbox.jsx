import { useState } from "react";

export const CheckBox = ({ label }) => {
	const [isChecked, setIsChecked] = useState(false);

	return (
		<div className='flex items-center'>
			<input
				type='checkbox'
				checked={isChecked}
				onChange={() => setIsChecked(!isChecked)}
				className='form-checkbox h-5 w-5 text-blue-600'
			/>
			<label className='ml-2 text-gray-700'>{label}</label>
		</div>
	);
};
