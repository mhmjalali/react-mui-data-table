import { Box, CircularProgress } from "@mui/material";

const DataTable_TableLoadingOverlay = ({ table, ...rest }) => {
    const {
        options: {
            localization,
            mrtTheme: { baseBackgroundColor },
            muiCircularProgressProps,
        },
    } = table;

    const circularProgressProps = {
        ...parseFromValuesOrFunc(muiCircularProgressProps, { table }),
        ...rest,
    };

    return (
        <Box
            sx={{
                alignItems: "center",
                backgroundColor: alpha(baseBackgroundColor, 0.5),
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                left: 0,
                maxHeight: "100vh",
                position: "absolute",
                right: 0,
                top: 0,
                width: "100%",
                zIndex: 3,
            }}
        >
            {circularProgressProps?.Component ?? (
                <CircularProgress
                    aria-label={localization.noRecordsToDisplay}
                    id="mrt-progress"
                    {...circularProgressProps}
                />
            )}
        </Box>
    );
};
export default DataTable_TableLoadingOverlay;
