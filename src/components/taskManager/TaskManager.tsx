import styles from "./taskManager.module.scss";
import { ManualDescription } from "@/components/taskManager/manualDescription/manualDescription";
import { TaskInput } from "@/components/uiux/inputs/taskInput/TaskInput";
import { BaseButton } from "@/components/uiux/buttons/baseButton/BaseButton";
import {TaskViewInput} from "@/components/uiux/inputs/taskViewInput/TaskViewInput";

export const TaskManager = () => {
	const handleInput = (value) => {
		console.log(value);
	}
	return(
		<div className={"d-flex flex-column"}>
			<ManualDescription className="mb-25p" />
			<TaskInput className="mb-25p" />
			<BaseButton className="mb-25p">Добавить</BaseButton>
			<TaskViewInput taskNumber={1} handleInput={handleInput}/>
		</div>
	)
}