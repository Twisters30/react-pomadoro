import "./timerInterface.scss";
import { CircleButton } from "@/components/uiux/buttons/circleButton/CircleButton";
import { useTimer } from 'react-timer-hook';
import { FC, useEffect, useState } from "react";
import { Task, DefaultState } from "@/store/taskReducer";
import { TimerEdit } from "@/components/timerInterface/timerEdit/TimerEdit";
import { formatSeconds } from "@/utils/formatSeconds.ts";
import { StartTimerButtons } from "@/components/uiux/buttons/startTimerButtons/StartTimerButtons";
import { IsRunTimerButtons } from "@/components/uiux/buttons/isRunTimerButtons/IsRunTimerButtons";
import { confirmModal } from "@/components/modals/confirmModal/ConfirmModal";


type TProps = {
	task: Task
	timerState: DefaultState["timerState"];
	setTaskStart: (payload: boolean) => void;
	setBreakStart: (payload: boolean) => void;
	setLongBreakStart: (payload: boolean) => void;
	setTaskComplete: (id: Task["id"]) => void;
	setMainTimer: (time: {minutes: string, seconds: string}) => void;
	setBreakTimer: (time: {minutes: string, seconds: string}) => void;
	setLongBreakTimer: (time: {minutes: string, seconds: string}) => void;
	decrementPomodoro: (id: Task["id"]) => void;
	resetMainTimer: () => void;
}

export const TimerInterface: FC<TProps> = (
	{
		task,
		setTaskStart,
		setTaskComplete,
		setMainTimer,
		setBreakTimer,
		timerState,
		setBreakStart,
		decrementPomodoro,
		resetMainTimer,
		setLongBreakStart,
		setLongBreakTimer
	}) => {
	useEffect(() => {
		if (timerState.timerDate) {
			setEditValueTime(concatForEditValue());
			restart(timerState.timerDate, isRunning);
		}
	}, [timerState.timerDate])
	useEffect(() => {
		if (timerState.breakTimerDate && timerState.isBreak) {
			restart(timerState.breakTimerDate, true);
		}
	}, [timerState.breakTimerDate])
	useEffect(() => {
		if (timerState.longBreakTimerDate && timerState.isLongBreak) {
			restart(timerState.longBreakTimerDate, true);
		}
	}, [timerState.longBreakTimerDate])
	const { seconds, minutes, hours, start, resume, isRunning, pause, restart } = useTimer(
		{
			expiryTimestamp: timerState.timerDate,
			autoStart: false,
			onExpire: () => timerExpire()
		});
	const concatForEditValue = () => {
		return parseInt(timerState.timerConfig.minutes.toString() + timerState.timerConfig.seconds)
	};
	const [isEditTimer, setActiveEditTimer] = useState<boolean>(false);
	const [editValueTime, setEditValueTime] = useState<number>(concatForEditValue());
	const startTaskTimer = () => {
		if (task && "id" in task) {
			start();
			setTaskStart(true);
		}
	}
	const pauseTimer = () => {
		if (task && "id" in task) {
			pause();
		}
	}
	const clickTaskComplete = () => {
		if (task && "id" in task) {
			setTaskComplete(task.id);
			resetTimer();
		}
	}
	const resetTimer = () => {
		hideEditTime();
		resetMainTimer();
	}
	const clickEditTimer = () => {
		pauseTimer();
		setActiveEditTimer(true);
	}
	const handleEditInput = (event) => {
		const value = event.currentTarget.value;
		setEditValueTime(value);
		const [minutes, seconds] = value.split(':');
		const argSeconds = typeof seconds === "number" ? seconds : parseInt(seconds, 10);
		switch (true) {
			case timerState.isBreak:
				setBreakTimer(
					{
						minutes: minutes,
						seconds: formatSeconds(argSeconds)
					});
				break;
			case timerState.isLongBreak:
				setLongBreakTimer({
					minutes: minutes,
					seconds: formatSeconds(argSeconds)
				})
				break;
			default:
				setMainTimer({
					minutes: minutes,
					seconds: formatSeconds(argSeconds)
				});
				break
		}
		hideEditTime();
	}
	const hideEditTime = () => {
		setActiveEditTimer(false);
	}
	const startBreak = () => {
		setBreakTimer(
			{
				minutes: timerState.breakTimerConfig.minutes,
				seconds: timerState.breakTimerConfig.seconds
			});
		setBreakStart(true);
		restart(timerState.breakTimerDate, true);
	}
	const timerExpire = () => {
		if (!task) return;
		console.log("timer expire");
		switch (true) {
			case timerState.isLongBreak:
				doneBreak();
				confirmModal(() => {
					clickTaskComplete();
				}, {
					title: "Помидорки закончились, вы хотите завершить задачу?",
					confirmButtonText: "Да",
					cancelButtonText: "Нет",
					confirmButtonColor: "#A8B64F",
				})
				break;
			case timerState.isBreak:
				doneBreak();
		}
		if (task && task.pomodoroCount !== 1 && !timerState.isBreak) {
			startBreak();
			return;
		}
		if (task && task.pomodoroCount === 1 && !timerState.isLongBreak) {
			console.log('start-long-brake')
			doneBreak();
			startLongBreak();
			return;
		}
		startTaskTimer();
	}
	const startLongBreak = () => {
		setLongBreakStart(true);
		setLongBreakTimer(
			{
				minutes: timerState.longBreakTimerConfig.minutes,
				seconds: timerState.longBreakTimerConfig.seconds
			});
	}
	const doneBreak = () => {
		setMainTimer(timerState.timerConfig);
		if (timerState.isLongBreak) {
			setLongBreakStart(false);
			clickTaskComplete();
			pauseTimer();
			return;
		}
		restart(timerState.timerDate, true);
		setBreakStart(false);
		decrementPomodoro(task.id);
		console.log("skip break");
	}
	return (
		<div className={`timer-interface__wrapper col-7 ${!task?.id ? "pe-none" : ""}`}>
			<div
				className={
					`timer-interface__header 
						${isRunning && timerState?.isStart ? "start-theme" : ""} 
						${!isRunning && timerState?.isStart ? "pause-theme" : ""}`
				}
			>
				<div className={"timer-interface__header-task-name"}>{task?.title || "задач нет"}</div>
				<div>Помидор {task?.pomodoroCount || '0'}</div>
			</div>
			<div className={"timer-interface__menu-wrapper"}>
				<div className={"timer-interface__content"}>
					{ timerState.isBreak && <h3 className={"text-center"}>Перерыв</h3>}
					{ timerState.isLongBreak && <h3 className={"text-center"}>Длительный перерыв</h3>}
					<div className={"timer-interface__time-wrapper"}>
						{ isEditTimer ?
							<div className={"d-flex flex-column gap-2 timer-interface__time"}>
								<TimerEdit time={editValueTime} handleInput={handleEditInput} />
							</div> :
							<div
								className={
									`timer-interface__time
									${isRunning ? "play" : ""}
									${!isRunning && timerState?.isStart ? "pause" : ""}`
								}
							>
								{hours !== 0 ? hours : ""}
								{minutes.toString().length === 1 ? "0" + minutes : minutes}:
								{seconds === 0 ? "00" : seconds.toString().length === 1 ? "0" + seconds : seconds}
							</div>
						}
						<CircleButton
							isDisabled={isRunning}
							onCLick={clickEditTimer}
							className={"timer-interface__button-add-time"}
						>
							+
						</CircleButton>
					</div>
					<div className={"timer-interface__title-wrapper"}>
						<div className={"timer-interface__task-count"}>
							{task?.id ? `Задача ${task.queueNumber} -` : "задач нет"}
						</div>
						<div className={"timer-interface__task-name"}>&nbsp;{task?.title}</div>
					</div>
					<div>
						{
							timerState?.isStart && task ?
								<div className={"timer-interface__buttons-wrapper"}>
									<IsRunTimerButtons
										isRunning={isRunning}
										resume={resume}
										isBreak={timerState.isBreak || timerState.isLongBreak}
										classNameBtnStart={"timer-interface__btn-start"}
										classNameBtnStop={"timer-interface__btn-stop"}
										pauseTimer={pauseTimer}
										clickTaskComplete={clickTaskComplete}
										skipBreak={doneBreak}
									/>
								</div>
								:
								<div className={"timer-interface__buttons-wrapper"}>
									<StartTimerButtons
										startTaskTimer={startTaskTimer}
										isDisableStartBtn={task?.id === undefined}
										isDisableStopBtn={!isRunning && !timerState?.isStart}
										classNameStartBtn={"timer-interface__btn-start"}
										classNameStopBtn={"timer-interface__btn-stop"}
									/>
								</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
}