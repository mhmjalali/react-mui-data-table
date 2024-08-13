"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
    direction: "rtl",
    typography: {
        fontFamily: `IRANSansFaNum, sans-serif`,
        fontSize: 12,
    },
    palette: {
        primary: {
            main: "#2070af",
            contrastText: "#fff",
        },
        primary2: {
            main: "#015688",
            contrastText: "#fff",
        },
    },
});

export default theme;
