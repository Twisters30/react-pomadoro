import styles from "./taskViewInput.module.scss";
import {FC, FormEvent, ReactElement, useState, useRef, Dispatch} from "react";
import { SettingsTodoDropdown } from "@/components/uiux/baseDropdown/SettingsTodoDropdown";
import { useOnClickOutside } from "usehooks-ts";
import { Task } from "@/store/taskReducer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TProp = {
	task: Task;
	handleInput: (value: string, setInputView: Dispatch<Task["title"]>) => void;
	removeTask: (id: Task["id"]) => void;
	incrementPomodoro: (id: Task["id"]) => void;
	decrementPomodoro: (id: Task["id"]) => void;
	editTitleTaskActive: (id: Task["id"], ref: React.RefObject<HTMLInputElement> | null) => void;
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
	const openDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setDropdownActive(true);
	}
	const closeDropdown = () => {
		setDropdownActive( () => false);
	}
	editTitleTaskActive.bind(closeDropdown);
	useOnClickOutside(refDropdown, closeDropdown);
	const [value, setValue] = useState<Task["title"]>(task.title);
	const handleInputValue = (event: FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setValue(value);
		handleInput(value, setValue);
	}
	const { setNodeRef, listeners, attributes, transition, transform} = useSortable({id:task.id})
	const style = {transition, transform: CSS.Transform.toString(transform)};
	return (
		<li className={styles.wrapper} {...attributes} {...listeners} ref={setNodeRef} style={style}>
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
				editTitleTaskActive={editTitleTaskActive.bind(closeDropdown)}
			/>
		</li>
	)
}