import styles from "./taskManager.module.scss";
import { ManualDescription } from "@/components/taskManager/manualDescription/manualDescription";
import { TaskInput } from "@/components/uiux/inputs/taskInput/TaskInput";
import { BaseButton } from "@/components/uiux/buttons/baseButton/BaseButton";
import { TaskViewInput } from "@/components/uiux/inputs/taskViewInput/TaskViewInput";
import { configPomodoro, Task } from "@/store/taskReducer";
import { Dispatch, FC, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TProps = {
	tasks: Task[];
	createTask: (task: Task) => void;
	removeTask: (id: Task["id"]) => void;
	incrementPomodoro: (id: Task["id"]) => void;
	decrementPomodoro: (id: Task["id"]) => void;
	editTitleTask: (payload:{id:Task["id"], title: Task["title"]}) => void;
}

export const TaskManager: FC<TProps> = (
	{
		tasks= [],
		createTask,
		removeTask,
		incrementPomodoro,
		decrementPomodoro,
		editTitleTask
	}) => {
	const [taskInputValue, setTaskInputValue] = useState("");
	const [taskIdEditing, setTaskIdEditing] = useState<Task["id"] | null>(null);
	const handleTaskInputValue = (event: FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setTaskInputValue(value);
	}
	const isDisableBtn = taskInputValue === "";

	const handleInputView = (title: Task["title"], setInputView: Dispatch<Task["title"]>) => {
		if (taskIdEditing) {
			editTitleTask({id: taskIdEditing, title});
			setInputView(title);
			return;
		}
	}
	const clickButtonCreateTask = () => {
		if (taskInputValue) {
			const time = new Date();
			time.setSeconds(time.getSeconds() + 1500);
			const task: Task = {
				isStart: false,
				title: taskInputValue,
				id: uuidv4(),
				pomodoroCount: 4,
				timer: configPomodoro.time,
				timerOnPause: 0,
				done: false
			};
			createTask(task);
			setTaskInputValue("");
		}
	}
	const editTitleTaskActive = function (id: Task["id"], refInput) {
		refInput.current.focus();
		if (typeof this === "function") this();
		setTaskIdEditing(id);
	}
	return(
		<div className={"d-flex flex-column col-5"}>
			<ManualDescription className="mb-25p" />
			<TaskInput className="mb-25p" handleInput={handleTaskInputValue} inputValue={taskInputValue} />
			<BaseButton
				isDisable={isDisableBtn}
				onClick={clickButtonCreateTask}
				className="mb-25p prime-play-btn"
			>
				Добавить
			</BaseButton>
			<ul>
				{
					tasks.map((task) => (
							<TaskViewInput
								key={task.id}
								task={task}
								handleInput={handleInputView}
								removeTask={removeTask}
								incrementPomodoro={incrementPomodoro}
								decrementPomodoro={decrementPomodoro}
								editTitleTaskActive={editTitleTaskActive}
							/>
						)
					)
				}
			</ul>
		</div>
	)
}