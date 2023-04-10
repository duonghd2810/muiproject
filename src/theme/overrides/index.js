//
import Paper from "./Paper";
import Input from "./Input";
import Table from "./Table";
import Button from "./Button";
import Backdrop from "./Backdrop";
import Typography from "./Typography";
import Autocomplete from "./Autocomplete";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
	return Object.assign(
		Table(theme),
		Input(theme),
		Paper(theme),
		Button(theme),
		Backdrop(theme),
		Typography(theme),
		Autocomplete(theme)
	);
}
