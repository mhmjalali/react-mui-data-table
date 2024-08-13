"use client";
import DialogTransition from "@/components/DialogTransition";
import {AddCircle, Close} from "@mui/icons-material";
import {Box, Button, Dialog, DialogActions, DialogTitle, IconButton, useMediaQuery} from "@mui/material";
import {useState} from "react";
import {useTheme} from "@mui/material/styles";

const TableExampleCreate = ({mutate}) => {
    /* mutate that you are getting as a prop in this component is for reloading DataTable after any request like (adding/updating etc...) */
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {isMobile ? (
                <IconButton aria-label="افزودن" color="primary" onClick={handleOpen}>
                    <AddCircle sx={{fontSize: "25px"}}/>
                </IconButton>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircle/>}
                    onClick={handleOpen}
                >
                    افزودن
                </Button>
            )}
            <Dialog open={open} fullScreen TransitionComponent={DialogTransition}>
                <DialogTitle sx={{m: 0, p: 2, borderBottom: 1, borderColor: "divider"}} id="create-dialog">
                    یه مُدال برای تست
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close/>
                </IconButton>
                <Box sx={{display: "flex", alignItems: "center", height: "100%", justifyContent: "center"}}>
                    در این قسمت هر گهی که دلتان میخواهد بخورید
                </Box>
                <DialogActions sx={{p: 2, borderTop: 1, borderColor: 'divider'}}>
                    <Button variant="contained" size="large" onClick={() => {
                        mutate();
                        handleClose()
                    }}
                            form={'InquiryPrivacyFencingCreateForm'}>فقط برای آپدیت دیتا های جدول</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default TableExampleCreate;
