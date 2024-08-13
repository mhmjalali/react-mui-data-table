"use client";

import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { IconButton, Tooltip } from "@mui/material";

function HideButton({ drawerState, setDrawerState }) {
    return (
        <Tooltip title="نمایش/مخفی کردن ستون ها">
            <IconButton
                onClick={() => {
                    setDrawerState(!drawerState);
                }}
                aria-label="hide table column"
            >
                <ViewColumnIcon />
            </IconButton>
        </Tooltip>
    );
}

export default HideButton;
