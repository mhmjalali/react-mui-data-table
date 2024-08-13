import { Box, IconButton, ListItemIcon, MenuItem } from "@mui/material";

const DataTable_ActionMenuItem = ({ icon, label, onOpenSubMenu, table, ...rest }) => {
    const {
        options: {
            icons: { ArrowRightIcon },
        },
    } = table;

    return (
        <MenuItem
            sx={{
                alignItems: "center",
                justifyContent: "space-between",
                minWidth: "120px",
                my: 0,
                py: "6px",
            }}
            {...rest}
        >
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                {label}
            </Box>
            {onOpenSubMenu && (
                <IconButton onClick={onOpenSubMenu} onMouseEnter={onOpenSubMenu} size="small" sx={{ p: 0 }}>
                    <ArrowRightIcon />
                </IconButton>
            )}
        </MenuItem>
    );
};
export default DataTable_ActionMenuItem;
