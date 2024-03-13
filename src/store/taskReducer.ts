
export type Task = {
	id: string;
	title: string;
	pomodoroCount: number;
	statistics?:{
		weeks:[]
	}
}
type DefaultState = {
	tasks: Task[];
}

const defaultState: DefaultState = {
	tasks: [{
		id: "1",
		title: "TEST",
		pomodoroCount: 4
	}]
}
interface ITaskReducer {
	state: Task[],
	action: {
		type: "CREATE_TASK" | "REMOVE_TASK";
		payload: Task;
	}
}

export const taskReducer = (state = defaultState, action: ITaskReducer['action']) => {
	switch (action.type) {
		case "CREATE_TASK":
			return {...state, tasks: [...state.tasks, action.payload]}
		case "REMOVE_TASK":
			return {...state, tasks: [...state.tasks.filter((task) => task.id !== action.payload.id)]}
		default :
			return state
	}
}