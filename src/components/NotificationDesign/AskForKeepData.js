"use client";

import SaveIcon from "@mui/icons-material/Save";
import {Box, Button, Typography} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {toast} from "react-toastify";
import useTableSetting from "@/lib/hooks/useTableSetting";
import {flattenObjectOfObjects} from "@/utils/flattenObjectOfObjects";

function AskForKeepData({filterData, sortData, hideData, user_id, page_name, table_name, columns}) {
    const {filterAction, sortAction, hideAction} = useTableSetting();

    const filteredHideData = Object.fromEntries(
        Object.entries(hideData).filter(([key, value]) => value === false),
    );

    const flattenHideData = flattenObjectOfObjects(filteredHideData);

    const onSaveFilter = () => {
        const filteredItems = Object.keys(filterData)
            .map((key) => {
                const value = filterData[key].value;
                if (
                    value !== "" &&
                    !(
                        Array.isArray(value) &&
                        (value.length === 0 || (value.length === 2 && value[0] === "" && value[1] === ""))
                    )
                ) {
                    return filterData[key];
                }
            })
            .filter(Boolean);
        filterAction(user_id, page_name, table_name, filteredItems, columns);
        sortAction(user_id, page_name, table_name, sortData, columns);
        hideAction(user_id, page_name, table_name, flattenHideData, columns);
        toast.dismiss({containerId: "datatable"});
    };

    const handleDismiss = () => {
        toast.dismiss({containerId: "datatable"});
    };

    return (
        <Box sx={{width: "100%"}}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1}}>
                <Typography color="primary.main" variant="subtitle1" sx={{fontWeight: "500"}}>
                    ذخیره سازی تغییرات
                </Typography>
                <SaveIcon sx={{color: "primary.main"}}/>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Typography variant="caption">آیا مایل به ذخیره تغییر های اعمال شده برای دفعات بعد هستید؟</Typography>
            </Box>
            <Box sx={{display: "flex", gap: 1, mt: 2}}>
                <Button
                    variant="contained"
                    size="small"
                    endIcon={<DownloadIcon/>}
                    onClick={onSaveFilter}
                >
                    ذخیره
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleDismiss}
                >
                    رد کردن
                </Button>
            </Box>
        </Box>
    );
}

export default AskForKeepData;