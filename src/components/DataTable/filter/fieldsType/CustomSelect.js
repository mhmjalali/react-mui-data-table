"use client";

import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";

function CustomSelect({ column, filterParameters, defaultFilterTranslation, setFieldValue }) {
    const columnSelectOption = column.columnSelectOption;

    return (
        <FormControl fullWidth sx={{ marginY: 1 }}>
            <InputLabel id={`label${column.id}`}>{column.header}</InputLabel>
            <Select
                labelId={`label${column.id}`}
                id={column.id}
                name={`${column.id}.value`}
                value={filterParameters.value}
                input={<OutlinedInput label={column.header} />}
                onChange={(e) => {
                    setFieldValue(`${column.id}.value`, e.target.value);
                }}
            >
                <MenuItem value="">{column.header}</MenuItem>
                {columnSelectOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>
                <Typography variant="button" sx={{ color: "#155175" }}>
                    نوع فیلتر: {defaultFilterTranslation}
                </Typography>
            </FormHelperText>
        </FormControl>
    );
}

export default CustomSelect;
