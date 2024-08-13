import React from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { faIR } from "@mui/x-date-pickers/locales";
import { Box, FormHelperText, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "jalali-moment";

function MuiDatePicker({ value, setFieldValue, name, minDate, maxDate, helperText, placeholder, error }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", my: 1 }}>
            <LocalizationProvider
                dateAdapter={AdapterDateFnsJalali}
                localeText={faIR.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <MobileDatePicker
                    value={value ? new Date(value) : null}
                    sx={{ width: "100%" }}
                    id={name}
                    name={name}
                    aria-describedby="component-helper-text"
                    onChange={(value) => {
                        const date = new Date(value);
                        const formattedDate = moment(date).locale("en").format("YYYY-MM-DD");
                        setFieldValue(name, formattedDate);
                    }}
                    minDate={minDate ? new Date(minDate) : null}
                    maxDate={maxDate ? new Date(maxDate) : null}
                    slotProps={{
                        textField: {
                            error: error,
                            placeholder: placeholder,
                            InputProps: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setFieldValue(name, "");
                                            }}
                                            sx={{
                                                color: "#bfbfbf",
                                                "&:hover": {
                                                    backgroundColor: "rgba(189, 189, 189, 0.1)",
                                                    color: "#363434",
                                                },
                                            }}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        },
                    }}
                />
                <FormHelperText id="component-helper-text" sx={{ ml: 2, color: error ? "#d32f2f" : "unset" }}>
                    {helperText ? helperText : ""}
                </FormHelperText>
            </LocalizationProvider>
        </Box>
    );
}

export default MuiDatePicker;
