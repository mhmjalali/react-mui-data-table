import {parseCSSVarId, parseFromValuesOrFunc} from "@/utils/utils";
import {Table} from "@mui/material";
import {useMRT_ColumnVirtualizer} from "material-react-table";
import {useMemo} from "react";
import DataTable_TableBody, {Memo_DataTable_TableBody} from "../body/TableBody";
import DataTable_TableHead from "../head/TableHead";

const DataTable_Table = ({table, ...rest}) => {
    const {
        getFlatHeaders,
        getState,
        options: {
            columns,
            enableStickyHeader,
            enableTableFooter,
            enableTableHead,
            layoutMode,
            memoMode,
            muiTableProps,
            renderCaption,
        },
    } = table;
    const {columnSizing, columnSizingInfo, columnVisibility, isFullScreen} = getState();

    const tableProps = {
        ...parseFromValuesOrFunc(muiTableProps, {table}),
        ...rest,
    };

    const Caption = parseFromValuesOrFunc(renderCaption, {table});

    const columnSizeVars = useMemo(() => {
        const headers = getFlatHeaders();
        const colSizes = {};
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const colSize = header.getSize();
            colSizes[`--header-${parseCSSVarId(header.id)}-size`] = colSize;
            colSizes[`--col-${parseCSSVarId(header.column.id)}-size`] = colSize;
        }
        return colSizes;
    }, [columns, columnSizing, columnSizingInfo, columnVisibility]);

    const columnVirtualizer = useMRT_ColumnVirtualizer(table);

    const commonTableGroupProps = {
        columnVirtualizer,
        table,
    };

    return (
        <Table
            stickyHeader={enableStickyHeader || isFullScreen}
            {...tableProps}
            style={{...columnSizeVars, ...tableProps?.style}}
            sx={(theme) => ({
                display: layoutMode?.startsWith("grid") ? "grid" : undefined,
                position: "relative",
                ...parseFromValuesOrFunc(tableProps?.sx, theme),
            })}
        >
            {!!Caption && <caption>{Caption}</caption>}
            {enableTableHead && <DataTable_TableHead {...commonTableGroupProps} />}
            {memoMode === "table-body" || columnSizingInfo.isResizingColumn ? (
                <Memo_DataTable_TableBody {...commonTableGroupProps} />
            ) : (
                <DataTable_TableBody {...commonTableGroupProps} />
            )}
            {/* {enableTableFooter && <MRT_TableFooter {...commonTableGroupProps} />} */}
        </Table>
    );
};
export default DataTable_Table;
