import styles from "./taskInput.module.scss";
import { FC, FormEvent } from "react";

type TProp = {
	handleInput: (event: FormEvent<HTMLInputElement>) => void;
	className?: string;
	inputValue: string;
}

export const TaskInput: FC<TProp> = ({ inputValue, className= "", handleInput }) => {
	return (
		<input onChange={handleInput} value={inputValue} className={`${styles['task-input']} ${className}`} />
	)
}