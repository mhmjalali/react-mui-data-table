import {getCommonToolbarStyles, parseFromValuesOrFunc} from "@/utils/utils";
import {Box, Typography, useMediaQuery} from "@mui/material";
import DataTable_LinearProgressBar from "./LinearProgressBar";
import DataTable_TablePagination from "./TablePagination";
import FilterColumn from "@/components/DataTable/filter";
import UpdateTable from "@/components/DataTable/update/UpdateTable";
import ResetStorage from "@/components/DataTable/reset/ResetStorage";
import HideColumn from "@/components/DataTable/hide";

const DataTable_TopToolbar = ({
                                  mutate,
                                  need_filter,
                                  table,
                                  columns,
                                  table_url,
                                  user_id,
                                  page_name,
                                  table_name,
                                  table_title,
                              }) => {
    const {
        getState,
        options: {
            enablePagination,
            enableToolbarInternalActions,
            muiTopToolbarProps,
            positionPagination,
            renderTopToolbarCustomActions,
        },
        refs: {topToolbarRef},
    } = table;
    const {isFullScreen, showGlobalFilter} = getState();

    const isMobile = useMediaQuery("(max-width:720px)");
    const isTablet = useMediaQuery("(max-width:1024px)");

    const toolbarProps = parseFromValuesOrFunc(muiTopToolbarProps, {table});

    const stackAlertBanner = isMobile || !!renderTopToolbarCustomActions || (showGlobalFilter && isTablet);

    return (
        <Box
            {...toolbarProps}
            ref={(ref) => {
                topToolbarRef.current = ref;
                if (toolbarProps?.ref) {
                    // @ts-ignore
                    toolbarProps.ref.current = ref;
                }
            }}
            sx={(theme) => ({
                ...getCommonToolbarStyles({table, theme}),
                position: isFullScreen ? "sticky" : "relative",
                top: isFullScreen ? "0" : undefined,
                ...parseFromValuesOrFunc(toolbarProps?.sx, theme),
            })}
        >
            <Box
                sx={{
                    flexWrap: {xs: "wrap", sm: "no-wrap"},
                    boxSizing: "border-box",
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: "0.5rem",
                    position: stackAlertBanner ? "relative" : "absolute",
                    right: 0,
                    top: 0,
                    width: "100%",
                }}
            >
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    order: {xs: 2, sm: 1},
                }}>{renderTopToolbarCustomActions?.({table})}</Box>
                <Typography sx={{textAlign: "center", order: {xs: 1, sm: 2}, width: {xs: "100%", sm: "unset"}}}
                            fontWeight={600}>{table_title || ""}</Typography>
                {enableToolbarInternalActions && (
                    <Box
                        sx={{
                            gap: "0.5rem",
                            flexWrap: "wrap-reverse",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            order: 3,
                        }}
                    >
                        <ResetStorage user_id={user_id}
                                      page_name={page_name}
                                      table_name={table_name}/>
                        <UpdateTable mutate={mutate}/>
                        <HideColumn
                            columns={table.options.columns}
                            user_id={user_id}
                            page_name={page_name}
                            table_name={table_name}/>
                        {need_filter && (
                            <FilterColumn
                                columns={columns}
                                table_url={table_url}
                                user_id={user_id}
                                page_name={page_name}
                                table_name={table_name}
                            />
                        )}
                    </Box>
                )}
            </Box>
            {enablePagination && ["both", "top"].includes(positionPagination ?? "") && (
                <DataTable_TablePagination position="top" table={table}/>
            )}
            <DataTable_LinearProgressBar isTopToolbar table={table}/>
        </Box>
    );
};

export default DataTable_TopToolbar;
