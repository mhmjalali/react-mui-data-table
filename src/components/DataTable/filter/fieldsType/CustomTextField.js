import { InputAdornment, TextField, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

function CustomTextField({
    column,
    filterParameters,
    defaultFilterTranslation,
    handleOpenFilterBox,
    handleChange,
    handleBlur,
}) {
    return (
        <TextField
            id={column.id}
            name={column.id}
            label={column.header}
            value={filterParameters.value}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            helperText={
                <Typography variant="button" sx={{ color: "#155175" }}>
                    نوع فیلتر: {defaultFilterTranslation}
                </Typography>
            }
            variant="outlined"
            size="normal"
            sx={{ marginY: 1 }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: "pointer" }} onClick={handleOpenFilterBox}>
                        <FilterListIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default CustomTextField;
