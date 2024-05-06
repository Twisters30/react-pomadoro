import styles from "./settingsTodoDropdown.module.scss";
import controlMinus from "@/assets/icons/control_minus.svg";
import controlPlus from "@/assets/icons/control_plus.svg";
import deleteIcon from "@/assets/icons/delete.svg";
import editIcon from "@/assets/icons/edit.svg";

import { FC, RefObject } from "react";
import type { Task } from "@/store/taskReducer";
type TProp = {
	openDropdown: boolean;
	refDropdown: RefObject<HTMLUListElement> | null;
	removeTask: (id: Task["id"]) => void;
	task: Task;
	incrementPomodoro: (id: Task["id"]) => void;
	decrementPomodoro: (id: Task["id"]) => void;
	editTitleTaskActive: (id: Task["id"], ref: RefObject<HTMLInputElement>  | null) => void;
	refInputView: RefObject<HTMLInputElement> | null;
}
type TDropdown = {
	options: {
		value: string;
		icon: string;
		onClick?: (task: Task["id"], refInputView: TProp["refInputView"]) => void;
	}[];
};

export const SettingsTodoDropdown: FC<TProp> = (
	{
		openDropdown,
		refDropdown,
		removeTask,
		task,
		incrementPomodoro,
		decrementPomodoro,
		editTitleTaskActive,
		refInputView
	}) => {
	const dropdown: TDropdown = {
		options: [
			{
				value: "Увеличить",
				icon: controlPlus,
				onClick: incrementPomodoro
			},
			{
				value: "Уменьшить",
				icon: controlMinus,
				onClick: decrementPomodoro
			},
			{
				value: "Редактировать",
				icon: editIcon,
				onClick: editTitleTaskActive
			},
			{
				value: "Удалить",
				icon: deleteIcon,
				onClick: removeTask
			},
		],
	};
	return (
		openDropdown && <ul ref={refDropdown!} className={styles.dropdown}>
			{
				dropdown.options.map((item) => (
					<li key={item.value}>
						<button
							onClick={() => item.onClick ? item.onClick(task.id, refInputView) : null}
							style={{backgroundImage: `url(${item.icon})`}}
							className={`${styles.button}`}
						>
							{item.value}
						</button>
					</li>
				))
			}
    </ul>
	)
}