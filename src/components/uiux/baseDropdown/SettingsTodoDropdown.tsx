import styles from "./settingsTodoDropdown.module.scss";
import controlMinus from "@/assets/icons/control_minus.svg";
import controlPlus from "@/assets/icons/control_plus.svg";
import deleteIcon from "@/assets/icons/delete.svg";
import editIcon from "@/assets/icons/edit.svg";

import { FC } from "react";
type TProp = {
	openDropdown: boolean;
	refDropdown: any
}
type TDropdown = {
	options: {
		value: string;
		icon: string;
	}[];
};

const dropdown: TDropdown = {
	options: [
		{
			value: "Увеличить",
			icon: controlPlus,
		},
		{
			value: "Уменьшить",
			icon: controlMinus,
		},
		{
			value: "Редактировать",
			icon: editIcon,
		},
		{
			value: "Удалить",
			icon: deleteIcon,
		},
	],
};

export const SettingsTodoDropdown: FC<TProp> = ({ openDropdown, refDropdown }) => {
	return (
		openDropdown && <ul ref={refDropdown} className={styles.dropdown}>
			{
				dropdown.options.map((item) => (
					<li key={item.value}>
						<button
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