import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

NavSection.propTypes = {
	data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
	const user = useSelector((state) => state.userReducer).data;
	const listNavShow = data.filter(({ role }) => user.roleSet.includes(role));
	return (
		<Box {...other}>
			<List disablePadding sx={{ p: 1 }}>
				{listNavShow.map((item) => (
					<NavItem key={item.title} item={item} />
				))}
			</List>
		</Box>
	);
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
	item: PropTypes.object,
};

function NavItem({ item }) {
	const { title, path, icon, info } = item;

	return (
		<StyledNavItem
			component={RouterLink}
			to={path}
			sx={{
				"&.active": {
					color: "text.primary",
					bgcolor: "action.selected",
					fontWeight: "fontWeightBold",
				},
			}}
		>
			<StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

			<ListItemText disableTypography primary={title} />

			{info && info}
		</StyledNavItem>
	);
}
