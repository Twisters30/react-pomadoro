import styles from "./taskViewInput.module.scss";
import { FC, FormEvent, ReactElement, useState, useRef } from "react";
import { SettingsTodoDropdown } from "@/components/uiux/baseDropdown/SettingsTodoDropdown";
import { useOnClickOutside } from "usehooks-ts";
import { Task } from "@/store/taskReducer";

type TProp = {
	task: Task;
	handleInput: (value) => void;
}

export const TaskViewInput: FC<TProp> = ({handleInput, task}): ReactElement => {
	const [dropdownActive, setDropdownActive] = useState(false);
	const openDropdown = () => {
		setDropdownActive(true);
	}
	const closeDropdown = () => {
		setDropdownActive( () => false);
	}
	const ref = useRef(null);
	useOnClickOutside(ref, closeDropdown)
	const [value, setValue] = useState(task.title);
	const handleInputValue = (event: FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setValue(value);
		handleInput(value);
	}

	return (
		<li className={styles.wrapper}>
			<div className={styles.icon}>{task.pomodoroCount}</div>
			<input onInput={handleInputValue} value={value} className={styles.input} type="text" />
			<button onClick={openDropdown} className={styles.button}>...</button>
			<SettingsTodoDropdown refDropdown={ref} openDropdown={dropdownActive} />
		</li>
	)
}