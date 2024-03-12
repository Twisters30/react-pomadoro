import styles from "./taskViewInput.module.scss"
import {FC, FormEvent, ReactElement, useState} from "react";

type TProp = {
	handleInput: (value) => void;
	taskNumber: number;
}

export const TaskViewInput: FC<TProp> = ({handleInput, taskNumber}): ReactElement => {
	const [value, setValue] = useState('');
	const handleInputValue = (event: FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		if (value) {
			setValue(value);
			handleInput(value);
		}
	}
	return (
		<li className={styles.wrapper}>
			<div className={styles.icon}>{taskNumber}</div>
			<input onInput={handleInputValue} value={value} className={styles.input} type="text" />
			<button className={styles.button}>...</button>
		</li>
	)
}