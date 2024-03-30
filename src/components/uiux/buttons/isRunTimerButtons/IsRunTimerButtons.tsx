import { FC } from "react";
import { BaseButton } from "@/components/uiux/buttons/baseButton/BaseButton";

type TProps = {
	isRunning: boolean;
	isBreak: boolean;
	pauseTimer: () => void;
	resume: () => void;
	skipBreak: () => void;
	clickTaskComplete: () => void;
	classNameBtnStart: string;
	classNameBtnStop: string;
}

export const IsRunTimerButtons:FC<TProps> = (
	{
		isRunning,
		pauseTimer,
		resume,
		isBreak,
		skipBreak,
		clickTaskComplete,
		classNameBtnStart,
		classNameBtnStop
	}
) => {
	return (
		<>
			<BaseButton
				onClick={isRunning ? pauseTimer : resume}
				className={`${classNameBtnStart} prime-play-btn`}
			>
				{isRunning ? "Пауза" : "Продолжить"}
			</BaseButton>
			{ isBreak ?
				<BaseButton
					onClick={skipBreak}
					className={`${classNameBtnStop} prime-pause-btn play`}
				>
					Пропустить
				</BaseButton>
				:
				<BaseButton
					onClick={clickTaskComplete}
					className={`${classNameBtnStop} prime-pause-btn play`}
				>
					{isRunning ? "Стоп" : "Сделано"}
				</BaseButton>
			}
		</>
	)
}