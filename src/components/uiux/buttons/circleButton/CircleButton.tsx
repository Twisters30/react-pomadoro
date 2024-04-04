import styles from "./circleButton.module.scss";
import { FC } from "react";

type TProps = {
	className?: string;
	onCLick: () => void;
	children: unknown;
	isDisabled?: boolean | undefined;
}

export const CircleButton: FC<TProps> = (
	{
		onCLick,
		className = "",
		children,
		isDisabled
	}
) => {
	return (
		<>
			<button
				disabled={isDisabled ? isDisabled : false}
				onClick={onCLick}
				className={`${styles.circle} ${className}`}
			>
				{children}
			</button>
		</>
	)
}