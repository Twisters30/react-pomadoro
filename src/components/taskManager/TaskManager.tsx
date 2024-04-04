import { ManualDescription } from "@/components/taskManager/manualDescription/manualDescription";
import { TaskInput } from "@/components/uiux/inputs/taskInput/TaskInput";
import { BaseButton } from "@/components/uiux/buttons/baseButton/BaseButton";
import { TaskViewInput } from "@/components/uiux/inputs/taskViewInput/TaskViewInput";
import { Task } from "@/store/taskReducer";
import { Dispatch, FC, FormEvent, useState } from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDndKitConfig } from "@/hooks/dndKit";

type TProps = {
	tasks: Task[];
	createTask: (title: Task["title"]) => void;
	removeTask: (id: Task["id"]) => void;
	incrementPomodoro: (id: Task["id"]) => void;
	decrementPomodoro: (id: Task["id"]) => void;
	editTitleTask: (id:{id:Task["id"], title: Task["title"]}) => void;
	handleDragEnd: ({active, over}) => void;
}

export const TaskManager: FC<TProps> = (
	{
		tasks= [],
		createTask,
		removeTask,
		incrementPomodoro,
		decrementPomodoro,
		editTitleTask,
		handleDragEnd
	}) => {
	const [taskInputValue, setTaskInputValue] = useState("");
	const [taskIdEditing, setTaskIdEditing] = useState<Task["id"] | null>(null);
	const {sensors} = useDndKitConfig();
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
			createTask(taskInputValue);
			setTaskInputValue("");
		}
	}
	const editTitleTaskActive = function (id: Task["id"], refInput) {
		refInput.current.focus();
		if (typeof this === "function") this();
		setTaskIdEditing(id);
	}
	return(
		<form
			onSubmit={(e) => e.preventDefault()}
			className={"d-flex flex-column col-5"}>
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
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}>
					<SortableContext
						items={tasks.map((item) => item.id)}
						strategy={verticalListSortingStrategy}>
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
					</SortableContext>
				</DndContext>
			</ul>
		</form>
	)
}