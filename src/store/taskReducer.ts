
export type Task = {
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
type DefaultState = {
	tasks: Task[];
}
const time = new Date();
time.setSeconds(time.getSeconds() + 1500); // 10 minutes timer
const defaultState: DefaultState = {
	tasks: [{
		timer: time,
		timerOnPause: 0,
		id: "1",
		title: "TEST",
		pomodoroCount: 4,
		done: false
	}]
}
interface ITaskReducer {
	state: Task[],
	action: {
		type: "CREATE_TASK" | "REMOVE_TASK" | "INCREMENT_POMODORO_TASK" | "DECREMENT_POMODORO_TASK" | "EDIT_TASK_TASK";
		payload: {id: Task["id"] , title: Task["title"]} | Task["id"] ;
	}
}
const CREATE_TASK = "CREATE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const INCREMENT_POMODORO_TASK = "INCREMENT_POMODORO_TASK";
const DECREMENT_POMODORO_TASK = "DECREMENT_POMODORO_TASK";
const EDIT_TASK_TASK = "EDIT_TASK_TASK";

export const taskReducer = (state = defaultState, action: ITaskReducer['action']) => {
	switch (action.type) {
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