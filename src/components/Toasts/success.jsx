import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { Beenhere } from "@mui/icons-material";

export const successToast = (toastContainer) =>
    toast.success(
        () => (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Beenhere color="success" sx={{ mr: 1.6 }} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption">{"Your operation was successful"}</Typography>
                    </Box>
                </Box>
            </Box>
        ),
        {
            icon: false,
            containerId: toastContainer,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            closeOnClick: false,
            draggable: true,
        }
    );
