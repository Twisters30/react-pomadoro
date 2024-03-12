import styles from "./taskInput.module.scss";
import { FC, FormEvent, useState } from "react";

type TProp = {
	handleInput: (value) => void;
	className?: string;
}

export const TaskInput: FC<TProp> = ({ handleInput, className= "" }) => {
	const [value, setValue] = useState('');
	const handleInputValue = (event: FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		if (value) {
			setValue(value);
			handleInput(value);
		}
	}
	return (
		<input onInput={handleInputValue} value={value} className={`${styles['task-input']} ${className}`} />
	)
}