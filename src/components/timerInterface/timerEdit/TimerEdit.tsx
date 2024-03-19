import styles from "./timerEdit.module.scss";
import {FC, useEffect, useRef} from "react";
import { PatternFormat } from 'react-number-format';

type TProps = {
	time: number;
	handleInput: (time: string) => void;
}

export const TimerEdit:FC<TProps> = ({time, handleInput}) => {
	const ref = useRef(null);
	console.log(time)
	useEffect(() => {
		ref.current.focus();
	}, [])
	return (
		<div>
			<PatternFormat
				allowEmptyFormatting
				mask={"_"}
				getInputRef={ref}
				format="##:##"
				displayType="input"
				className={styles.timer}
				value={time}
				onBlur={handleInput}
			/>
		</div>
	)
}