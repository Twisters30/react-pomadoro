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
	setMainTimerAction,
	setBreakTimerAction,
	setBreakAction,
	resetMainTimerAction,
	handleDragEndAction
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
	const createTask = (title: Task["title"]) => {
		dispatch(createTaskAction({title}));
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
	const setTaskStart = () => {
		dispatch(setTaskStartAction())
	}
	const setBreakStart = (payload: boolean) => {
		dispatch(setBreakAction(payload));
	}
	const setTaskComplete = (payload: Task["id"]) => {
		dispatch(setTaskCompleteAction(payload))
	}
	const setMainTimer = (time: {minutes: string, seconds: string}) => {
		dispatch(setMainTimerAction(time));
	}
	const setBreakTimer = (time: {minutes: string, seconds: string}) => {
		dispatch(setBreakTimerAction(time));
	}
	const resetMainTimer = () => {
		dispatch(resetMainTimerAction());
	}
	const handleDragEnd = (payload) => {
		dispatch(handleDragEndAction(payload))
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
				handleDragEnd={handleDragEnd}
			/>
			<TimerInterface
				key={currentTask?.id || uuidv4()}
				task={currentTask}
				setTaskStart={setTaskStart}
				setTaskComplete={setTaskComplete}
				timerState={timerState}
				setMainTimer={setMainTimer}
				setBreakTimer={setBreakTimer}
				setBreakStart={setBreakStart}
				decrementPomodoro={decrementPomodoro}
				resetMainTimer={resetMainTimer}
			/>
		</div>
	)
}