import React from "react";
import MuiDatePicker from "@/components/DataTable/filter/fieldsType/CustomDate/MuiDatePicker";
import {Typography} from "@mui/material";

function CustomDatePicker({column, filterParameters, defaultFilterTranslation, setFieldValue}) {
    return (
        <MuiDatePicker
            name={`${column.id}.value`}
            value={filterParameters.value}
            setFieldValue={setFieldValue}
            placeholder={column.header}
            helperText={
                <Typography variant="button" sx={{color: "#155175"}}>
                    نوع فیلتر: {defaultFilterTranslation} (تاریخ)
                </Typography>
            }
        />
    );
}

export default CustomDatePicker;
