"use client";

import { IconButton, Tooltip } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import useTableSetting from "@/lib/hooks/useTableSetting";

function ResetStorage({ user_id, page_name, table_name }) {
    const { resetAction } = useTableSetting();
    const reset = () => {
        resetAction(user_id, page_name, table_name);
    };

    return (
        <Tooltip title="بازنشانی اطلاعات">
            <IconButton onClick={reset} aria-label="reset table data">
                <AutorenewIcon />
            </IconButton>
        </Tooltip>
    );
}

export default ResetStorage;