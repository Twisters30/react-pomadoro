import { ITaskReducer } from "@/store/taskReducer.ts";
import {DragOverEvent} from "@dnd-kit/core";

type TPayload = ITaskReducer["action"]["payload"];
interface TimerGuardPayload {
    minutes: number;
    seconds: number;
}


interface TaskPayload {
    id: string;
    title: string;
}

export const guardTimerPayload = (payload: TPayload): payload is TimerGuardPayload => {
    return typeof payload === "object" && "minutes" in payload && "seconds" in payload;
}
export const guardTaskPayload = (payload: TPayload): payload is TaskPayload => {
    return typeof payload === "object" && "title" in payload && "id" in payload;
}
export const guardCreateTaskPayload = (payload: TPayload): payload is Pick<TaskPayload, "title"> => {
    return typeof payload === "object" && "title" in payload;
}
export const guardDragEndEventPayload = (payload: TPayload): payload is DragOverEvent => {
    return typeof payload === "object" && "over" in payload;
}