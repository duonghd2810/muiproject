import PropTypes from "prop-types";
import { useMemo } from "react";
// @mui
import { Backdrop, CircularProgress, CssBaseline } from "@mui/material";
import {
	ThemeProvider as MUIThemeProvider,
	createTheme,
	StyledEngineProvider,
} from "@mui/material/styles";
//
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import customShadows from "./customShadows";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
	children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
	const { isLoading } = useSelector((state) => state.loadingReducer);
	const themeOptions = useMemo(
		() => ({
			palette,
			shape: { borderRadius: 6 },
			typography,
			shadows: shadows(),
			customShadows: customShadows(),
		}),
		[]
	);

	const theme = createTheme(themeOptions);

	return (
		<StyledEngineProvider injectFirst>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles />
				<Backdrop
					sx={{
						color: "#fff",
						zIndex: 10000,
					}}
					open={isLoading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				{children}
			</MUIThemeProvider>
		</StyledEngineProvider>
	);
}
