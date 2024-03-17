import "./timerInterface.scss";
import { CircleButton } from "@/components/uiux/buttons/circleButton/CircleButton";
import { BaseButton } from "@/components/uiux/buttons/baseButton/BaseButton";
import { useTimer } from 'react-timer-hook';
import { FC } from "react";
import { Task, TConfigPomodoro } from "@/store/taskReducer";

type TProps = {
	task: Task
	setTaskStart: (id: Task["id"]) => void;
	setTaskComplete: (id: Task["id"]) => void;
	timerConfig: TConfigPomodoro;
}

export const TimerInterface: FC<TProps> = (
	{
		task,
		setTaskStart,
		setTaskComplete,
		timerConfig
	}) => {
	const { seconds, minutes, hours, start, resume, isRunning, pause, restart } = useTimer(
		{
			expiryTimestamp: timerConfig.getTimeWork(),
			autoStart: false,
			onExpire: () => console.warn('onExpire called')
		});
	const clickAddTime = () => {
		console.log("click add time")
	}
	const startTaskTimer = () => {
		if ("id" in task) {
			start();
			setTaskStart(task.id);
		}
	}
	const pauseTimer = () => {
		if ("id" in task) {
			pause();
		}
	}
	const clickTaskComplete = () => {
		if ("id" in task) {
			timerConfig.getTimeWork();
			setTaskComplete(task.id);
			restart(timerConfig.getTimeWork());
		}
		const clickEditTimer = () => {

		}
	}
	return (
		<div className={`timer-interface__wrapper col-7 ${!task?.id ? "pe-none" : ""}`}>
			<div
				className={
					`timer-interface__header 
						${isRunning && task?.isStart ? "start-theme" : ""} 
						${!isRunning && task?.isStart ? "pause-theme" : ""}`
				}
			>
				<div className={"timer-interface__header-task-name"}>{task?.title || "задач нет"}</div>
				<div>Помидор {task?.pomodoroCount || '0'}</div>
			</div>
			<div className={"timer-interface__menu-wrapper"}>
				<div className={"timer-interface__content"}>
					<div className={"timer-interface__time-wrapper"}>
						<div
							className={
								`timer-interface__time
									${isRunning ? "play" : ""}
									${!isRunning && task?.isStart ? "pause" : ""}`
							}
						>
							{hours !== 0 ? hours : ""}{minutes}:{seconds === 0 ? "00" : seconds}
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
							{task?.id ? `Задача ${task?.pomodoroCount} -` : "задач нет"}
						</div>
						<div className={"timer-interface__task-name"}>&nbsp;{task?.title}</div>
					</div>
					<div>
						{
							task?.isStart ?
								<div className={"timer-interface__buttons-wrapper"}>
									<BaseButton
										onClick={isRunning ? pauseTimer : resume}
										className={"timer-interface__btn-play prime-play-btn"}
									>
										{isRunning ? "Пауза" : "Продолжить"}
									</BaseButton>
									<BaseButton
										onClick={clickTaskComplete}
										className={"timer-interface__btn-cancel prime-pause-btn play"}
									>
										{isRunning ? "Стоп" : "Сделано"}
									</BaseButton>
								</div>
								:
								<div className={"timer-interface__buttons-wrapper"}>
									<BaseButton
										isDisable={task?.id === undefined}
										onClick={startTaskTimer}
										className={"timer-interface__btn-play prime-play-btn"}
									>
										Старт
									</BaseButton>
									<BaseButton
										isDisable={!isRunning && !task?.isStart}
										onClick={pause}
										className={`timer-interface__btn-cancel prime-pause-btn`}
									>
										Стоп
									</BaseButton>
								</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
}