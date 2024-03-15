import { TaskManager } from "@/components/taskManager/TaskManager";
import { useDispatch, useSelector } from "react-redux";
import { createTaskAction, removeTaskAction, Task, incrementTaskAction, decrementTaskAction, editTitleTaskAction } from "@/store/taskReducer";
import { confirmModal } from "@/components/modals/confirmModal/ConfirmModal";
import { TimerInterface } from "@/components/timerInterface/TimerInterface";

export const MainPage = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks);
	const createTask = (payload: Task) => {
		dispatch(createTaskAction(payload));
	}
	const removeTask = async (payload: Task["id"]) => {
		confirmModal(() => dispatch(removeTaskAction(payload)));
	}
	const incrementPomodoro = (payload: Task["id"]) => {
		dispatch(incrementTaskAction(payload));
	}
	const decrementPomodoro = (payload: Task["id"]) => {
		dispatch(decrementTaskAction(payload));
	}
	const editTitleTask = (payload: {id: Task["id"], title: Task["title"]}) => {
		dispatch(editTitleTaskAction(payload));
	}

	return (
		<div className={"row"}>
			<TaskManager
				tasks={tasks}
				createTask={createTask}
				removeTask={removeTask}
				incrementPomodoro={incrementPomodoro}
				decrementPomodoro={decrementPomodoro}
				editTitleTask={editTitleTask}
			/>
			<TimerInterface tasks={tasks} />
		</div>
	)
}