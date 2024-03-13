import { TaskManager } from "@/components/taskManager/TaskManager";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "@/store/taskReducer";

export const MainPage = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks);
	console.log(tasks);
	const createTask = (payload: Task) => {
		dispatch({type: "CREATE_TASK", payload: payload});
	}

	return (
		<>
			<TaskManager tasks={tasks} createTask={createTask} />
		</>
	)
}