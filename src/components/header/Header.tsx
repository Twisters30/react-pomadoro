import logo from "@/assets/images/tomato-logo.svg";
import styles from "./header.module.scss";
import { MainNavigation } from "@/components/navigation/MainNavigation/MainNavigation";

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className="container-xl">
				<div className="row align-items-center justify-content-between">
					<div className="col-2 d-flex align-items-center">
						<img className="p-2" src={logo} alt="логотип"/>
						<div className="logo-name">pomodoro_box</div>
					</div>
					<div className="col-2">
						<MainNavigation />
					</div>
				</div>
			</div>
		</header>
	)
}