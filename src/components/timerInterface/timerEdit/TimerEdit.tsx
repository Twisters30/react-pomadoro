import styles from "./timerEdit.module.scss";
import { FC, useEffect, useRef } from "react";
import { PatternFormat } from 'react-number-format';

type TProps = {
	time: number;
	handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TimerEdit:FC<TProps> = ({time, handleInput}) => {

	const ref: React.RefObject<HTMLInputElement> = useRef(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, [])
	return (
		<div>
			<PatternFormat
				getInputRef={ref}
				format="##:##" allowEmptyFormatting mask=""
				className={styles.timer}
				value={time}
				onBlur={handleInput}
			/>
		</div>
	)
}