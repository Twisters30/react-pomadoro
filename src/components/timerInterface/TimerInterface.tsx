import "./timerInterface.scss";
import {CircleButton} from "@/components/uiux/buttons/circleButton/CircleButton";
import {BaseButton} from "@/components/uiux/buttons/baseButton/BaseButton";
import { useTimer } from 'react-timer-hook';
import { FC } from "react";
import { Task } from "@/store/taskReducer";
type TProps = {
	tasks: Task[]
}

export const TimerInterface: FC<TProps> = ({ tasks }) => {
	const currentTask: Task = tasks.find((task) => task != task.done);
	const { seconds, minutes, hours, start, pause, isRunning } = useTimer(
		{
			expiryTimestamp: currentTask.timer,
			autoStart: false,
			onExpire: () => console.warn('onExpire called')
		});
	const clickAddTime = () => {
		console.log("click add time")
	}
	return (
		<div className={"timer-interface__wrapper col-7"}>
			<div className={"timer-interface__header"}>
				<div className={"timer-interface__header-task-name"}>Task name</div>
				<div>Pomodoro counter</div>
			</div>
			<div className={"timer-interface__menu-wrapper"}>
				<div className={"timer-interface__content"}>
					<div className={"timer-interface__time-wrapper"}>
						<div className={"timer-interface__time"}>
							{hours}:{minutes}:{seconds}
						</div>
						<CircleButton
							onCLick={clickAddTime}
							className={"timer-interface__button-add-time"}
						>
							+
						</CircleButton>
					</div>
					<div className={"timer-interface__title-wrapper"}>
						<div className={"timer-interface__task-count"}>
							Task count 1&nbsp;-&nbsp;
						</div>
						<div className={"timer-interface__task-name"}>Task name</div>
					</div>
					<div className={"timer-interface__buttons-wrapper"}>
						<BaseButton onClick={start} className={"timer-interface__btn-play"}>Старт</BaseButton>
						<BaseButton onClick={pause} bgColor={"transparent"} className={"timer-interface__btn-cancel"}>Стоп</BaseButton>
					</div>
				</div>
			</div>
		</div>
	)
}