import { TaskManager } from "@/components/taskManager/TaskManager";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
	Task,
	createTaskAction,
	removeTaskAction,
	incrementTaskAction,
	decrementTaskAction,
	editTitleTaskAction,
	setTaskStartAction,
	setTaskCompleteAction,
	setUpdateTimerAction,
	setBreakTimerAction
} from "@/store/taskReducer";
import { confirmModal } from "@/components/modals/confirmModal/ConfirmModal";
import { TimerInterface } from "@/components/timerInterface/TimerInterface";

export const MainPage = () => {
	const dispatch = useDispatch();

	const [timerState,tasks] = useSelector(
		(state) => [
			state.timerState,
			state.tasks,
		], shallowEqual);
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
	const setTaskStart = (payload: Task["id"]) => {
		dispatch(setTaskStartAction(payload))
	}
	const setTaskComplete = (payload: Task["id"]) => {
		dispatch(setTaskCompleteAction(payload))
	}
	const updateTimer = (time: {minutes: string, seconds: string}) => {
		dispatch(setUpdateTimerAction(time));
	}
	const setBreakTimer = (time: {minutes: string, seconds: string}) => {
		dispatch(setBreakTimerAction(time));
	}
	const unCompleteTasks = tasks.filter((task) => !task.done)
	const currentTask: Task = unCompleteTasks.find((task) => task != task.done);

	return (
		<div className={"row"}>
			<TaskManager
				tasks={unCompleteTasks}
				createTask={createTask}
				removeTask={removeTask}
				incrementPomodoro={incrementPomodoro}
				decrementPomodoro={decrementPomodoro}
				editTitleTask={editTitleTask}
			/>
			<TimerInterface
				key={currentTask?.id || uuidv4()}
				task={currentTask}
				setTaskStart={setTaskStart}
				setTaskComplete={setTaskComplete}
				timerState={timerState}
				updateTimer={updateTimer}
				setBreakTimer={setBreakTimer}
			/>
		</div>
	)
}