
export type Task = {
	isStart: boolean,
	timer: number,
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
	ms: number;
	getTimeWork: (number?: number) => number;
}
type DefaultState = {
	timerConfig: TConfigPomodoro
	tasks: Task[];
}

const timerConfig: TConfigPomodoro = {
	ms: 1500,
	getTimeWork: function (timeWork = this.ms) {
		const time = new Date();
		return time.setSeconds(time.getSeconds() + timeWork);
	}
}
const defaultState: DefaultState = {
	timerConfig,
	tasks: [{
		isStart: false,
		timer: timerConfig.getTimeWork(),
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
		;
		payload: {id: Task["id"] , title: Task["title"]} | Task["id"] ;
	}
}
const CREATE_TASK = "CREATE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const INCREMENT_POMODORO_TASK = "INCREMENT_POMODORO_TASK";
const DECREMENT_POMODORO_TASK = "DECREMENT_POMODORO_TASK";
const EDIT_TASK_TASK = "EDIT_TASK_TASK";
const SET_TASK_START = "SET_TASK_START";
const SET_TASK_COMPLETE = "SET_TASK_COMPLETE";

export const taskReducer = (state = defaultState, action: ITaskReducer['action']) => {
	switch (action.type) {
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