import {BaseButton} from "@/components/uiux/buttons/baseButton/BaseButton";
import {FC} from "react";
type TProps = {
	isDisableStartBtn: boolean;
	isDisableStopBtn: boolean;
	startTaskTimer: () => void;
	classNameStartBtn: string;
	classNameStopBtn: string;
}

export const StartTimerButtons: FC<TProps> = (
	{
		isDisableStartBtn,
		startTaskTimer,
		isDisableStopBtn,
		classNameStopBtn,
		classNameStartBtn
	}
) => {
	return (
		<>
			<BaseButton
				isDisable={isDisableStartBtn}
				onClick={startTaskTimer}
				className={`${classNameStartBtn} prime-play-btn`}
			>
				Старт
			</BaseButton>
			<BaseButton
				isDisable={isDisableStopBtn}
				className={`${classNameStopBtn} prime-pause-btn`}
			>
				Стоп
			</BaseButton>
		</>
	)
}