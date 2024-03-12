import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Header } from "@/components/header/Header";
import { AppRouter } from "@/router/AppRouter";

function App() {
  return (
	  <BrowserRouter>
		  <Header />
		  <main className="content">
			  <section className="section">
				  <div className="container-xl">
					  <AppRouter />
				  </div>
			  </section>
		  </main>
	  </BrowserRouter>
  )
}

export default App
