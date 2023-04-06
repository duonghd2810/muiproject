import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
import ScrollToTop from "./components/scroll-to-top";
//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

// ----------------------------------------------------------------------

export default function App() {
	return (
		<HelmetProvider>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<ThemeProvider>
							<ScrollToTop />
							<Router />
						</ThemeProvider>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</HelmetProvider>
	);
}
