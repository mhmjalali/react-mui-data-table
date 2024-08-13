"use client";

import { Box, IconButton, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

function FilterHeader({ setDrawerState }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 1,
                backgroundColor: "#155175",
                boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                maxWidth: "450px",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <ViewColumnIcon sx={{ color: "#fff", mr: 1 }} />
                <Typography variant="h6" sx={{ color: "#fff" }}>
                    نمایش/مخفی کردن ستون ها
                </Typography>
            </Box>
            <IconButton sx={{ color: "#fff" }} onClick={() => setDrawerState(false)}>
                <CancelIcon sx={{ fontSize: "1em" }} />
            </IconButton>
        </Box>
    );
}

export default FilterHeader;
