import "./timerInterface.scss";
import { CircleButton } from "@/components/uiux/buttons/circleButton/CircleButton";
import { BaseButton } from "@/components/uiux/buttons/baseButton/BaseButton";
import { useTimer } from 'react-timer-hook';
import { FC, useEffect, useState } from "react";
import {Task, timerConfigInstance, TimerConfig} from "@/store/taskReducer";
import { TimerEdit } from "@/components/timerInterface/timerEdit/TimerEdit";

type TProps = {
	task: Task
	setTaskStart: (id: Task["id"]) => void;
	setTaskComplete: (id: Task["id"]) => void;
	timerDate: Date;
	updateTimer: ({minutes,seconds}: {minutes: number,seconds: number}) => void;
	timerConfig: TimerConfig
}

export const TimerInterface: FC<TProps> = (
	{
		task,
		setTaskStart,
		setTaskComplete,
		timerDate,
		updateTimer,
		timerConfig
	}) => {
	useEffect(() => {
		if (timerDate) {
			console.log(timerDate, 'useEffect')
			setEditValueTime(concatForEditValue());
			restart(timerDate, false);
		}
	}, [timerDate])
	const { seconds, minutes, hours, start, resume, isRunning, pause, restart } = useTimer(
		{
			expiryTimestamp: timerDate,
			autoStart: false,
			onExpire: () => console.warn('onExpire called')
		});
	const concatForEditValue = () => parseInt(timerConfig.minutes.toString() + timerConfig.seconds);
	const [isEditTimer, setActiveEditTimer] = useState<boolean>(false);
	const [editValueTime, setEditValueTime] = useState<number>(concatForEditValue());
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
			setTaskComplete(task.id);
			restart(timerConfigInstance.getTimeWork());
		}
	}
	const clickEditTimer = () => {
		pauseTimer();
		setActiveEditTimer(true);
	}
	const handleEditInput = (event) => {
		const value = event.currentTarget.value;
		setEditValueTime(value);
		const [minutes, seconds] = value.split(':');
		updateTimer({
			minutes: parseInt(minutes, 10),
			seconds: parseInt(seconds ? seconds : "00", 10)
		});
		setActiveEditTimer(false);
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
						{ isEditTimer ?
							<div className={"d-flex flex-column gap-2 timer-interface__time"}>
								<TimerEdit time={editValueTime} handleInput={handleEditInput} />
							</div> :
							<div
								className={
									`timer-interface__time
									${isRunning ? "play" : ""}
									${!isRunning && task?.isStart ? "pause" : ""}`
								}
							>
								{hours !== 0 ? hours : ""}{minutes}:{seconds === 0 ? "00" : seconds}
							</div>
						}
						<CircleButton
							onCLick={clickEditTimer}
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