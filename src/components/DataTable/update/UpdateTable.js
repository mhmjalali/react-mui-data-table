"use client";
import { IconButton, Tooltip } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function UpdateTable({ mutate }) {
    const update = () => {
        mutate();
    };

    return (
        <Tooltip title="بروزرسانی اطلاعات">
            <IconButton onClick={update} aria-label="refactor table">
                <RestartAltIcon />
            </IconButton>
        </Tooltip>
    );
}

export default UpdateTable;
