import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { Dangerous } from "@mui/icons-material";

export const errorServerToast = (toastContainer) =>
    toast.error(
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
                    <Dangerous color="error" sx={{ mr: 1.6 }} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption">{"The request failed due to an internal error."}</Typography>
                    </Box>
                </Box>
            </Box>
        ),
        {
            icon: false,
            containerId: toastContainer,
            autoClose: 5000,
            hideProgressBar: true,
            pauseOnHover: true,
            closeOnClick: false,
            draggable: true,
        }
    );

export const errorUnauthorizedToast = (toastContainer) =>
    toast.error(
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
                    <Dangerous color="error" sx={{ mr: 1.6 }} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption">{"The user is not authorized to make the request."}</Typography>
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

export const errorLogicToast = (message, toastContainer) =>
    toast.error(
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
                    <Dangerous color="error" sx={{ mr: 1.6 }} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption">
                            {message ||
                                "The request was well-formed but was unable to be followed due to semantic errors."}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        ),
        {
            icon: false,
            containerId: toastContainer,
            autoClose: false,
            closeOnClick: false,
            draggable: false,
        }
    );

export const errorValidationToast = (message, toastContainer) =>
    toast.error(
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
                    <Dangerous color="error" sx={{ mr: 1.6 }} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption">
                            {message ||
                                "The request was well-formed but was unable to be followed due to semantic errors."}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        ),
        {
            icon: false,
            containerId: toastContainer,
            autoClose: false,
            closeOnClick: false,
            draggable: false,
        }
    );

export const errorTooManyToast = (toastContainer) =>
    toast.error(
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
                    <Dangerous color="error" sx={{ mr: 1.6 }} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption">
                            {"Too many requests have been sent within a given time span."}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        ),
        {
            icon: false,
            containerId: toastContainer,
            autoClose: false,
            closeOnClick: false,
            draggable: false,
        }
    );

export const errorClientToast = (toastContainer) =>
    toast.error(
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
                    <Dangerous color="error" sx={{ mr: 1.6 }} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption">
                            {
                                "The API request is invalid or improperly formed. Consequently, the API server could not understand the request."
                            }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        ),
        {
            icon: false,
            containerId: toastContainer,
            autoClose: false,
            closeOnClick: false,
            draggable: false,
        }
    );
