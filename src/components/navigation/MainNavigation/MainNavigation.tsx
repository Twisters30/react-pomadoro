import { Link } from "react-router-dom";
import "./navigation.module.scss";
import { useLocation } from "react-router-dom";
import equalizerIcon from "@/assets/icons/equalizer.svg";

type TLink = {
	pathname: string;
	value: string;
	icon?: string;
}
const links: Array<TLink> = [
	{pathname: "/", value: "Трекер"},
	{pathname: "/statistics", value: "Статистака", icon: equalizerIcon},
]

export const MainNavigation = () => {
	const activeLink = useLocation().pathname;
	return (
		<nav className="d-flex">
			{
				links.map((link) => (
					<div className="icon" style={{backgroundImage: `url(${link.icon || ""})`}} key={link.pathname}>
						<Link
							className={`${'nav__link'} ${activeLink === link.pathname ? "active" : ""}`}
							to={link.pathname}>{link.value}
						</Link>
					</div>
				))
			}
		</nav>

	)
}