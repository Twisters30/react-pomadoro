import {addMinutes, addSeconds, setMinutes, setSeconds, toDate} from "date-fns";

export type Task = {
	isStart: boolean,
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
	minutes: number;
	seconds: number;
	getTimeWork: (number?: number) => Date;
}
export type TimerConfig = {
	minutes: number;
	seconds: number;
}
type DefaultState = {
	timerConfig: TimerConfig;
	timerDate: Date;
	tasks: Task[];
}

export const timerConfigInstance: TConfigPomodoro = {
	minutes: 25,
	seconds: 0,
	getTimeWork: function (timeWork = this.minutes) {
		const currentTime = new Date();
		this.time = addMinutes(currentTime, timeWork);
		return this.time
	}
}
const defaultState: DefaultState = {
	timerConfig: {
		minutes: 25,
		seconds: 0,
	},
	timerDate: timerConfigInstance.getTimeWork(),
	tasks: [{
		isStart: false,
		timer: timerConfigInstance.getTimeWork(),
		timerOnPause: 0,
		id: "1",
		title: "Сделать pomodoro трекер",
		pomodoroCount: 4,
		done: false
	}]
}
interface ITaskReducer {
	state: Task[],
	action: {
		type: "CREATE_TASK"
			| "REMOVE_TASK"
			| "INCREMENT_POMODORO_TASK"
			| "DECREMENT_POMODORO_TASK"
			| "EDIT_TASK_TASK"
			| "SET_TASK_START"
			| "SET_TASK_COMPLETE"
			| "UPDATE_TIMER"
		;
		payload: {id: Task["id"] , title: Task["title"]} | Task["id"] | {minutes: number, seconds: number} ;
	}
}
const CREATE_TASK = "CREATE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const INCREMENT_POMODORO_TASK = "INCREMENT_POMODORO_TASK";
const DECREMENT_POMODORO_TASK = "DECREMENT_POMODORO_TASK";
const EDIT_TASK_TASK = "EDIT_TASK_TASK";
const SET_TASK_START = "SET_TASK_START";
const SET_TASK_COMPLETE = "SET_TASK_COMPLETE";
const UPDATE_TIMER = "UPDATE_TIMER";

export const taskReducer = (state = defaultState, action: ITaskReducer['action']) => {
	switch (action.type) {
		case UPDATE_TIMER:
			if ("minutes" in action.payload && "seconds" in action.payload) {
				const currentTime = new Date();
				let timer = addMinutes(currentTime, action.payload.minutes);
				timer = addSeconds(timer, action.payload.seconds);
				return {
					...state,
					timerDate: timer,
					timerConfig: { minutes: action.payload.minutes, seconds:  action.payload.seconds} };
			}
			return;
		case SET_TASK_COMPLETE :
			return {...state, tasks: [...state.tasks.map((task) => {
				if (task.id === action.payload) {
					task.done = true;
				}
				return task;
				})]}
		case SET_TASK_START :
			return {...state, tasks: [...state.tasks.map((task) => {
				if (task.id === action.payload) {
					task.isStart = true;
				}
				return task;
				})]}
		case EDIT_TASK_TASK:
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
			return {...state, tasks: [...state.tasks, action.payload]}
		case REMOVE_TASK:
			return {...state, tasks: [...state.tasks.filter((task) => task.id !== action.payload)]}
		default :
			return state
	}
}

export const createTaskAction = (payload:Task) => ({type: CREATE_TASK, payload});
export const removeTaskAction = (payload: Task["id"]) => ({type: REMOVE_TASK, payload});
export const incrementTaskAction = (payload: Task["id"]) => ({type: INCREMENT_POMODORO_TASK, payload});
export const decrementTaskAction = (payload: Task["id"]) => ({type: DECREMENT_POMODORO_TASK, payload});
export const editTitleTaskAction = (payload:{id:Task["id"],title: Task["title"]}) => ({type: EDIT_TASK_TASK, payload});
export const setTaskStartAction = (payload: Task["id"]) => ({type: SET_TASK_START, payload});
export const setTaskCompleteAction = (payload: Task["id"]) => ({type: SET_TASK_COMPLETE, payload});
export const setUpdateTimerAction = (payload:{minutes: number, seconds: number}) => ({type: UPDATE_TIMER, payload});