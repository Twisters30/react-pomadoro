import { addMinutes, addSeconds } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";

export type Task = {
	queueNumber: number;
	timer: Date,
	timerOnPause: number,
	id: string;
	title: string;
	pomodoroCount: number;
	done: boolean;
	statistics?:{
		weeks:[]
	}
}
export type TConfigPomodoro = {
	minutes: string;
	seconds: string;
	getTimeWork: (number?: string, seconds?: string) => Date;
}
export type TimerConfig = {
	minutes: string;
	seconds: string;
}
type TAppStatus =  "init" | "loading" | "error" | "success";
export type DefaultState = {
	appStatus: TAppStatus;
	timerState:{
		timerDate: Date;
		breakTimerDate: Date | null;
		isBreak: boolean,
		isStart: boolean,
		isLongBreak: boolean,
		timerConfig: TimerConfig;
		breakTimerConfig: TimerConfig;
		longBreakTimerConfig: TimerConfig;
	};
	tasks: Task[];
}

export const timerConfigInstance: TConfigPomodoro = {
	minutes: "25",
	seconds: "00",
	getTimeWork: function (minutes: string = this.minutes, seconds: string = this.seconds) {
		let currentTime = new Date();
		currentTime = addMinutes(currentTime, +minutes);
		currentTime = addSeconds(currentTime, +seconds);
		return currentTime
	}
}
const defaultState: DefaultState = {
	appStatus: "init",
	timerState: {
		timerDate: timerConfigInstance.getTimeWork("00","10"),
		breakTimerDate: null,
		isBreak: false,
		isStart: false,
		isLongBreak: false,
		timerConfig: {
			minutes: "00",
			seconds: "10",
		},
		breakTimerConfig: {
			minutes: "00",
			seconds: "05",
		},
		longBreakTimerConfig: {
			minutes: "40",
			seconds: "00",
		},
	},
	tasks: [
		{
		queueNumber: 1,
		timer: timerConfigInstance.getTimeWork(),
		timerOnPause: 0,
		id: "1",
		title: "Сделать pomodoro трекер",
		pomodoroCount: 4,
		done: false
	},
		{
			queueNumber: 2,
			timer: timerConfigInstance.getTimeWork(),
			timerOnPause: 0,
			id: "2",
			title: "Сделать dnd sortable",
			pomodoroCount: 4,
			done: false
		},
	]
}
interface ITaskReducer {
	state: Task[],
	action: {
		type: "CREATE_TASK"
			| "REMOVE_TASK"
			| "INCREMENT_POMODORO_TASK"
			| "DECREMENT_POMODORO_TASK"
			| "EDIT_TASK"
			| "SET_TASK_START"
			| "SET_TASK_COMPLETE"
			| "SET_MAIN_TIMER"
			| "SET_BRAKE_TIMER"
			| "SET_BREAK"
			| "RESET_MAIN_TIMER"
			| "UPDATE_ORDER_TASKS"
			| "HANDLE_DRAG_END"
		;
		payload:
			{ id: Task["id"], title: Task["title"]}
			| {tasks}
			| { title: Task["title"] }
			| Task["id"]
			| {minutes: number, seconds: number};
	}
}
const CREATE_TASK = "CREATE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const INCREMENT_POMODORO_TASK = "INCREMENT_POMODORO_TASK";
const DECREMENT_POMODORO_TASK = "DECREMENT_POMODORO_TASK";
const EDIT_TASK = "EDIT_TASK";
const SET_TASK_START = "SET_TASK_START";
const SET_TASK_COMPLETE = "SET_TASK_COMPLETE";
const SET_MAIN_TIMER = "SET_MAIN_TIMER";
const SET_BREAK_TIMER = "SET_BRAKE_TIMER";
const SET_BREAK = "SET_BREAK";
const RESET_MAIN_TIMER = "RESET_MAIN_TIMER";
const HANDLE_DRAG_END = "HANDLE_DRAG_END";

export const taskReducer = (state = defaultState, action: ITaskReducer['action']) => {
	switch (action.type) {
		case HANDLE_DRAG_END:
			const { active, over } = action.payload;
			if (active.id !== over.id) {
				const oldIndex = state.tasks.findIndex(({ id }) => id === active.id);
				const newIndex = state.tasks.findIndex(({ id }) => id === over.id);
				const updatedTasksOrder = arrayMove([...state.tasks], oldIndex, newIndex);
				const timer = getResetMainTimer(state);
				return {
					...state,
					timerState: {
						...state.timerState,
						timerDate: timer,
					},
					tasks: setTaskNumber(updatedTasksOrder)
				}
			}
			return;
		case RESET_MAIN_TIMER :
			const timer = getResetMainTimer(state);
			return {
				...state,
				timerState: {
					...state.timerState,
					timerDate: timer,
				},
			}
		case SET_BREAK_TIMER:
			if ("minutes" in action.payload && "seconds" in action.payload) {
				const timer = timerConfigInstance.getTimeWork(
					action.payload.minutes.toString(),
					action.payload.seconds.toString()
				);
				return {
					...state,
					timerState: {
						...state.timerState,
						breakTimerDate: timer,
						breakTimerConfig: {
							minutes: action.payload.minutes,
							seconds: action.payload.seconds
						}
					}
				}
			}
			console.error("SET_BRAKE_TIMER reducer ERROR")
			return;
		case SET_MAIN_TIMER:
			if ("minutes" in action.payload && "seconds" in action.payload) {
				const timer = timerConfigInstance.getTimeWork(
					action.payload.minutes.toString(),
					action.payload.seconds.toString()
				);
				return {
					...state,
					timerState: {
						...state.timerState,
						timerDate: timer,
						timerConfig: {
							minutes: action.payload.minutes,
							seconds: action.payload.seconds
						}
					}
				}
			}
			console.error("UPDATE_TIMER reducer ERROR")
			return;
		case SET_TASK_COMPLETE :
			return {
				...state,
				timerState: {
					...state.timerState,
					isStart: false
				},
				tasks: [...state.tasks.map((task) => {
				if (task.id === action.payload) {
					task.done = true;
				}
				return task;
				})]}
		case SET_BREAK :
			return {
				...state,
				timerState: {
					...state.timerState,
					isBreak: action.payload
				}
			};
		case SET_TASK_START :
			return {
				...state,
				timerState: {
					...state.timerState,
					isStart: true
				}
			};
		case EDIT_TASK:
			return  {...state, tasks: [...state.tasks.map((task) => {
				if ("id" in action.payload && task.id === action.payload.id) {
					task.title = action.payload.title;
				}
				return task;
				})]}
		case INCREMENT_POMODORO_TASK:
			return {...state, tasks: [...state.tasks.map((task) => {
					if (task.id === action.payload) task.pomodoroCount += 1;
					return task;
				})]}
		case DECREMENT_POMODORO_TASK:
			return {...state, tasks: [...state.tasks.map((task) => {
					if (task.id === action.payload) task.pomodoroCount -1 > 0 ? task.pomodoroCount-- : task.pomodoroCount;
					return task;
				})]}
		case CREATE_TASK:
			if ("title" in action.payload) {
				const task: Task = {
					queueNumber: 2,
					title: action.payload.title,
					id: uuidv4(),
					pomodoroCount: 4,
					timer: timerConfigInstance.getTimeWork(),
					timerOnPause: 0,
					done: false
				};
				const updatedTasks = setTaskNumber([...state.tasks, task]);
				return {...state, tasks: updatedTasks}
			}
			console.error("CREATE_TASK reducer ERROR")
			return;
		case REMOVE_TASK:
			const updatedTasks = setTaskNumber([...state.tasks.filter((task) => task.id !== action.payload)]);
			return {...state, tasks: updatedTasks}
		default :
			return state
	}
}

const setTaskNumber = (tasks: Task[]): Task[] => {
	return tasks.map((task, index) => {
		return {
			...task,
			queueNumber: index + 1,
		}
	})
}
const getResetMainTimer = (state: DefaultState) => {
	return timerConfigInstance.getTimeWork(
		state.timerState.timerConfig.minutes,
		state.timerState.timerConfig.seconds
	);
}

export const createTaskAction = (payload:{title: Task["title"]}) => ({type: CREATE_TASK, payload});
export const removeTaskAction = (payload: Task["id"]) => ({type: REMOVE_TASK, payload});
export const incrementTaskAction = (payload: Task["id"]) => ({type: INCREMENT_POMODORO_TASK, payload});
export const decrementTaskAction = (payload: Task["id"]) => ({type: DECREMENT_POMODORO_TASK, payload});
export const editTitleTaskAction = (payload:{id:Task["id"],title: Task["title"]}) => ({type: EDIT_TASK, payload});
export const setTaskStartAction = () => ({type: SET_TASK_START});
export const setBreakAction = (payload: boolean) => ({type: SET_BREAK, payload});
export const setTaskCompleteAction = (payload: Task["id"]) => ({type: SET_TASK_COMPLETE, payload});
export const setMainTimerAction = (payload:{minutes: string, seconds: string}) => ({type: SET_MAIN_TIMER, payload});
export const setBreakTimerAction = (payload:{minutes: string, seconds: string}) => ({type: SET_BREAK_TIMER, payload});
export const resetMainTimerAction = () => ({type: RESET_MAIN_TIMER});
export const handleDragEndAction = (payload:{ active, over }) => ({type: HANDLE_DRAG_END, payload});