import styles from "./circleButton.module.scss";
import { FC } from "react";

type TProps = {
	className?: string;
	onCLick: () => void;
	children: unknown;
}

export const CircleButton: FC<TProps> = ({ onCLick, className = "", children }) => {
	return (
		<>
			<button
				onClick={onCLick}
				className={`${styles.circle} ${className}`}
			>
				{children}
			</button>
		</>
	)
}