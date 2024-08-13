import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

function CustomTextFieldRange({
    column,
    filterParameters,
    defaultFilterTranslation,
    handleOpenFilterBox,
    handleChange,
    handleBlur,
    errors,
    touched,
}) {
    return (
        <Box sx={{ display: "flex" }}>
            <TextField
                id={`${column.id}.value[0]`}
                name={`${column.id}.value[0]`}
                onChange={handleChange}
                onBlur={handleBlur}
                label={<Typography>از {column.header}</Typography>}
                value={filterParameters.value[0]}
                fullWidth
                error={touched?.[`${column.id}`]?.value && Boolean(errors?.[`${column.id}`]?.value)}
                helperText={
                    <Typography variant="button" sx={{ color: "#155175" }}>
                        نوع فیلتر: {defaultFilterTranslation}
                    </Typography>
                }
                variant="outlined"
                size="normal"
                sx={{ marginY: 1, marginRight: 1 }}
            />
            <TextField
                id={`${column.id}.value[1]`}
                name={`${column.id}.value[1]`}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.[`${column.id}`]?.value && Boolean(errors?.[`${column.id}`]?.value)}
                helperText={touched?.[`${column.id}`]?.value ? errors?.[`${column.id}`]?.value : null}
                label={<Typography>تا {column.header}</Typography>}
                value={filterParameters.value[1]}
                fullWidth
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
        </Box>
    );
}

export default CustomTextFieldRange;
