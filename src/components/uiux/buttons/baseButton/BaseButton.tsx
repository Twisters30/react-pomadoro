import styles from "./primeButton.module.scss";
import { FC } from "react";

type TProp = {
	children: string;
	bgColor?: "#A8B64F" | "#DC3E22" | string;
	className?: string;
	onClick: () => void;
	isDisable?: boolean;
}

export const BaseButton: FC<TProp> = (
	{
		bgColor,
		children,
		className= "",
		onClick,
		isDisable = false}
) => {
	return (
		<button
			disabled={!!isDisable}
			onClick={onClick}
			className={`${styles.button} ${className} ${isDisable ? "disable" : ""}`}
			style={{backgroundColor:bgColor || "#A8B64F"}}
		>
			{children}
		</button>
	)
}