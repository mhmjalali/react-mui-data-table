import {getCommonToolbarStyles, parseFromValuesOrFunc} from "@/utils/utils";
import {alpha, Box, useMediaQuery} from "@mui/material";
import DataTable_LinearProgressBar from "./LinearProgressBar";
import DataTable_TablePagination from "./TablePagination";

const DataTable_BottomToolbar = ({table, ...rest}) => {
    const {
        getState,
        options: {enablePagination, muiBottomToolbarProps, positionPagination, renderBottomToolbarCustomActions},
        refs: {bottomToolbarRef},
    } = table;
    const {isFullScreen} = getState();

    const isMobile = useMediaQuery("(max-width:720px)");
    const toolbarProps = {
        ...parseFromValuesOrFunc(muiBottomToolbarProps, {table}),
        ...rest,
    };

    const stackAlertBanner = isMobile || !!renderBottomToolbarCustomActions;
    return (
        <Box
            {...toolbarProps}
            ref={(node) => {
                if (node) {
                    bottomToolbarRef.current = node;
                    if (toolbarProps?.ref) {
                        // @ts-ignore
                        toolbarProps.ref.current = node;
                    }
                }
            }}
            sx={(theme) => ({
                ...getCommonToolbarStyles({table, theme}),
                bottom: isFullScreen ? "0" : undefined,
                boxShadow: `0 1px 2px -1px ${alpha(theme.palette.grey[700], 0.5)} inset`,
                left: 0,
                position: isFullScreen ? "fixed" : "relative",
                right: 0,
                ...parseFromValuesOrFunc(toolbarProps?.sx, theme),
            })}
        >
            <DataTable_LinearProgressBar isTopToolbar={false} table={table}/>
            <Box
                sx={{
                    alignItems: "center",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "space-between",
                    p: "0.5rem",
                    width: "100%",
                }}
            >
                {renderBottomToolbarCustomActions ? renderBottomToolbarCustomActions({table}) : <span/>}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: stackAlertBanner ? "relative" : "absolute",
                        right: 0,
                        top: 0,
                    }}
                >
                    {enablePagination && ["both", "bottom"].includes(positionPagination ?? "") && (
                        <DataTable_TablePagination position="bottom" table={table}/>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
export default DataTable_BottomToolbar;
