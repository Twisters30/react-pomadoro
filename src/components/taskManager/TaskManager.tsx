import styles from "./taskManager.module.scss";
import { ManualDescription } from "@/components/taskManager/manualDescription/manualDescription";
import { TaskInput } from "@/components/uiux/inputs/taskInput/TaskInput";
import { BaseButton } from "@/components/uiux/buttons/baseButton/BaseButton";
import { TaskViewInput } from "@/components/uiux/inputs/taskViewInput/TaskViewInput";
import { Task } from "@/store/taskReducer";
import {FC, FormEvent, useState} from "react";
import { v4 as uuidv4 } from "uuid";

type TProps = {
	tasks: Task[];
	createTask: (task: Task) => void;
}

export const TaskManager: FC<TProps> = ({tasks= [], createTask }) => {
	const [taskInputValue, setTaskInputValue] = useState("");
	const handleInputValue = (event: FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setTaskInputValue(value);
	}
	const isDisableBtn = taskInputValue === "";

	const handleInputView = (value) => {
		console.log(value);
	}
	const clickButtonCreateTask = () => {
		if (taskInputValue) {
			const task: Task = { title: taskInputValue, id: uuidv4(), pomodoroCount: 4 };
			createTask(task);
			setTaskInputValue("");
		}
	}
	return(
		<div className={"d-flex flex-column"}>
			<ManualDescription className="mb-25p" />
			<TaskInput className="mb-25p" handleInput={handleInputValue} inputValue={taskInputValue} />
			<BaseButton
				isDisable={isDisableBtn}
				onClick={clickButtonCreateTask}
				className="mb-25p"
			>
				Добавить
			</BaseButton>
			<ul>
				{
					tasks.map((task) => (
							<TaskViewInput
								key={task.id}
								task={task}
								taskNumber={task.pomodoroCount}
								handleInput={handleInputView}
								inputValue={task.title}
							/>
						)
					)
				}
			</ul>
		</div>
	)
}