import { Route, Routes } from "react-router-dom";
import { MainPage } from "@/pages/MainPage/MainPage";
import { StatisticsPage } from "@/pages/StatisticsPage/StatisticsPage";


export const AppRouter = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/statistics" element={<StatisticsPage />} />
			</Routes>
		</div>
	)
}