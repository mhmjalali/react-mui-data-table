"use client";

import React from "react";
import {Box, Typography} from "@mui/material";
import MuiDatePicker from "./MuiDatePicker";

function CustomDatePickerRange({column, filterParameters, defaultFilterTranslation, setFieldValue, errors, touched}) {
    return (
        <Box sx={{display: "flex", gap: 1}}>
            <MuiDatePicker
                name={`${column.id}.value[0]`}
                value={filterParameters.value[0]}
                setFieldValue={setFieldValue}
                maxDate={filterParameters.value[1]}
                placeholder={`از تاریخ`}
                helperText={
                    <Typography variant="button" sx={{color: "#155175"}}>
                        نوع فیلتر: {defaultFilterTranslation} (تاریخ)
                    </Typography>
                }
            />
            <MuiDatePicker
                name={`${column.id}.value[1]`}
                value={filterParameters.value[1]}
                setFieldValue={setFieldValue}
                minDate={filterParameters.value[0]}
                placeholder={`تا تاریخ`}
                helperText={errors?.[`${column.id}`]?.value ? errors?.[`${column.id}`]?.value : null}
                error={Boolean(errors?.[`${column.id}`]?.value)}
            />
        </Box>
    );
}

export default CustomDatePickerRange;
