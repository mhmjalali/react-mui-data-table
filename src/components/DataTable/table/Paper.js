import {parseFromValuesOrFunc} from "@/utils/utils";
import {Paper} from "@mui/material";
import DataTable_BottomToolbar from "../toolbar/BottomToolbar";
import DataTable_TopToolbar from "../toolbar/TopToolbar";
import DataTable_TableContainer from "./TableContainer";

const DataTable_Paper = ({
                             table,
                             table_name,
                             columns,
                             user_id,
                             page_name,
                             mutate,
                             need_filter,
                             table_url,
                             table_title,
                             ...rest
                         }) => {
    const {
        getState,
        options: {
            enableBottomToolbar,
            enableTopToolbar,
            mrtTheme: {baseBackgroundColor},
            muiTablePaperProps,
            renderBottomToolbar,
            renderTopToolbar,
        },
        refs: {tablePaperRef},
    } = table;

    const {isFullScreen} = getState();

    const paperProps = {
        ...parseFromValuesOrFunc(muiTablePaperProps, {table}),
        ...rest,
    };

    return (
        <Paper
            elevation={0}
            {...paperProps}
            ref={(ref) => {
                tablePaperRef.current = ref;
                if (paperProps?.ref) {
                    //@ts-ignore
                    paperProps.ref.current = ref;
                }
            }}
            style={{
                ...(isFullScreen
                    ? {
                        bottom: 0,
                        height: "100dvh",
                        left: 0,
                        margin: 0,
                        maxHeight: "100dvh",
                        maxWidth: "100dvw",
                        padding: 0,
                        position: "fixed",
                        right: 0,
                        top: 0,
                        width: "100dvw",
                        zIndex: 999,
                    }
                    : {}),
                ...paperProps?.style,
            }}
            sx={(theme) => ({
                backgroundColor: baseBackgroundColor,
                backgroundImage: "unset",
                overflow: "hidden",
                transition: "all 100ms ease-in-out",
                ...parseFromValuesOrFunc(paperProps?.sx, theme),
            })}
        >
            {enableTopToolbar &&
                (parseFromValuesOrFunc(renderTopToolbar, {table}) ?? (
                    <DataTable_TopToolbar
                        need_filter={need_filter}
                        table={table}
                        mutate={mutate}
                        columns={columns}
                        table_url={table_url}
                        user_id={user_id}
                        page_name={page_name}
                        table_name={table_name}
                        table_title={table_title}
                    />
                ))}
            <DataTable_TableContainer table={table}/>
            {enableBottomToolbar &&
                (parseFromValuesOrFunc(renderBottomToolbar, {table}) ?? <DataTable_BottomToolbar table={table}/>)}
        </Paper>
    );
};
export default DataTable_Paper;
