import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Header } from "@/components/header/Header";
import { AppRouter } from "@/router/AppRouter";
import { Provider } from "react-redux";
import { store } from "@/store";

function App() {
  return (
	  <Provider store={store}>
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
	  </Provider>
  )
}

export default App
