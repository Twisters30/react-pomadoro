import styles from "./manualDescription.module.scss";
import { FC } from "react";
type TProp = {
	className: string;
}

export const ManualDescription: FC<TProp> = ({ className= ""}) => {
	return (
		<div className={className}>
			<h2>Ура! Теперь можно начать работать:</h2>
			<ul className={styles["manual-description__list"]}>
				<li className={styles["manual-description__item"]}>Выберите категорию и напишите название текущей задачи
				</li>
				<li className={styles["manual-description__item"]}>Запустите таймер («помидор»)</li>
				<li className={styles["manual-description__item"]}>Работайте пока «помидор» не прозвонит</li>
				<li className={styles["manual-description__item"]}>Сделайте короткий перерыв (3-5 минут)</li>
				<li className={styles["manual-description__item"]}>
					Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
				</li>
			</ul>
		</div>
	)
}