import styles from "./taskViewInput.module.scss";
import {FC, FormEvent, ReactElement, useState, useRef, RefObject} from "react";
import { SettingsTodoDropdown } from "@/components/uiux/baseDropdown/SettingsTodoDropdown";
import { useOnClickOutside } from "usehooks-ts";
import { Task } from "@/store/taskReducer";

type TProp = {
	task: Task;
	handleInput: (value: string, setInputView) => void;
	removeTask: (id: Task["id"]) => void;
	incrementPomodoro: (id: Task["id"]) => void;
	decrementPomodoro: (id: Task["id"]) => void;
	editTitleTaskActive: (id: Task["id"], ref) => void;
}

export const TaskViewInput: FC<TProp> = (
	{
		handleInput,
		task,
		removeTask,
		incrementPomodoro,
		decrementPomodoro,
		editTitleTaskActive
	}): ReactElement => {
	const [dropdownActive, setDropdownActive] = useState(false);
	const refDropdown = useRef<HTMLUListElement | null>(null);
	const refInputView = useRef(null);
	const openDropdown = () => {
		setDropdownActive(true);
	}
	const closeDropdown = () => {
		setDropdownActive( () => false);
	}
	useOnClickOutside(refDropdown, closeDropdown)
	const [value, setValue] = useState<Task["title"]>(task.title);
	const handleInputValue = (event: FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setValue(value);
		handleInput(value, setValue);
	}
	return (
		<li className={styles.wrapper}>
			<div className={styles.icon}>{task.pomodoroCount}</div>
			<input ref={refInputView!} onInput={handleInputValue} value={value} className={styles.input} type="text" />
			<button onClick={openDropdown} className={styles.button}>...</button>
			<SettingsTodoDropdown
				refDropdown={refDropdown}
				openDropdown={dropdownActive}
				task={task}
				refInputView={refInputView}
				removeTask={removeTask}
				incrementPomodoro={incrementPomodoro}
				decrementPomodoro={decrementPomodoro}
				editTitleTaskActive={editTitleTaskActive}
			/>
		</li>
	)
}