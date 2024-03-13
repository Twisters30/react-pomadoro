import { createStore } from "redux";
import { taskReducer } from "@/store/taskReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

export const store = createStore(taskReducer, composeWithDevTools())