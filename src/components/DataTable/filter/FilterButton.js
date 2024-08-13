"use client";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton, Tooltip } from "@mui/material";

function FilterButton({ drawerState, setDrawerState }) {
    return (
        <Tooltip title="فیلتر">
            <IconButton
                onClick={() => {
                    setDrawerState(!drawerState);
                }}
                aria-label="filter table"
            >
                <FilterAltIcon />
            </IconButton>
        </Tooltip>
    );
}

export default FilterButton;
