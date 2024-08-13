"use client";

import {
    Box,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from "@mui/material";

function CustomSelectMultiple({ column, filterParameters, defaultFilterTranslation, setFieldValue }) {
    const columnSelectOption = column.columnSelectOption;

    const getLabelForValue = (value) => {
        const option = columnSelectOption.find((opt) => opt.value === value);
        return option ? option.label : value;
    };

    return (
        <FormControl fullWidth sx={{ marginY: 1 }}>
            <InputLabel htmlFor="uncontrolled-native" id={`label${column.id}`}>
                {column.header}
            </InputLabel>
            <Select
                labelId={`label${column.id}`}
                id={column.id}
                value={filterParameters.value}
                multiple
                onChange={(e) => {
                    setFieldValue(`${column.id}.value`, e.target.value);
                }}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={getLabelForValue(value)} />
                        ))}
                    </Box>
                )}
                input={<OutlinedInput label={column.header} />}
            >
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

export default CustomSelectMultiple;
