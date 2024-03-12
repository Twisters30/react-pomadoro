import styles from "./primeButton.module.scss";
import { FC } from "react";

type TProp = {
	children: string;
	bgColor?: "#A8B64F" | "#DC3E22" | string;
	className?: string;
}

export const BaseButton: FC<TProp> = ({bgColor, children, className= ""}) => {
	return (
		<button className={`${styles.button} ${className}`} style={{backgroundColor:bgColor || "#A8B64F"}}>
			{children}
		</button>
	)
}