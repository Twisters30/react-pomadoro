import styles from "./primeButton.module.scss";
import { FC } from "react";

type TProp = {
	children: string;
	className?: string;
	onClick: () => void;
	isDisable?: boolean;
}

export const BaseButton: FC<TProp> = (
	{
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
		>
			{children}
		</button>
	)
}