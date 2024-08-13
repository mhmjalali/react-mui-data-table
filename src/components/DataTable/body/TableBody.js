import {parseFromValuesOrFunc} from "@/utils/utils";
import {TableBody, Typography} from "@mui/material";
import {useMRT_Rows, useMRT_RowVirtualizer} from "material-react-table";
import {memo, useMemo} from "react";
import DataTable_TableBodyRow, {Memo_DataTable_TableBodyRow} from "./TableBodyRow";

const DataTable_TableBody = ({columnVirtualizer, table, ...rest}) => {
    const {
        getBottomRows,
        getIsSomeRowsPinned,
        getRowModel,
        getState,
        getTopRows,
        options: {
            enableStickyFooter,
            enableStickyHeader,
            layoutMode,
            localization,
            memoMode,
            muiTableBodyProps,
            renderDetailPanel,
            renderEmptyRowsFallback,
            rowPinningDisplayMode,
        },
        refs: {tableFooterRef, tableHeadRef, tablePaperRef},
    } = table;
    const {columnFilters, globalFilter, isFullScreen, rowPinning} = getState();

    const tableBodyProps = {
        ...parseFromValuesOrFunc(muiTableBodyProps, {table}),
        ...rest,
    };

    const tableHeadHeight = ((enableStickyHeader || isFullScreen) && tableHeadRef.current?.clientHeight) || 0;
    const tableFooterHeight = (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

    const pinnedRowIds = useMemo(() => {
        if (!rowPinning.bottom?.length && !rowPinning.top?.length) return [];
        return getRowModel()
            .rows.filter((row) => row.getIsPinned())
            .map((r) => r.id);
    }, [rowPinning, getRowModel().rows]);

    const rows = useMRT_Rows(table);

    const rowVirtualizer = useMRT_RowVirtualizer(table, rows);

    const {virtualRows} = rowVirtualizer ?? {};

    const commonRowProps = {
        columnVirtualizer,
        numRows: rows.length,
        table,
    };

    return (
        <>
            {!rowPinningDisplayMode?.includes("sticky") && getIsSomeRowsPinned("top") && (
                <TableBody
                    {...tableBodyProps}
                    sx={(theme) => ({
                        display: layoutMode?.startsWith("grid") ? "grid" : undefined,
                        position: "sticky",
                        top: tableHeadHeight - 1,
                        zIndex: 1,
                        ...parseFromValuesOrFunc(tableBodyProps?.sx, theme),
                    })}
                >
                    {getTopRows().map((row, staticRowIndex) => {
                        const props = {
                            ...commonRowProps,
                            row,
                            staticRowIndex,
                        };
                        return memoMode === "rows" ? (
                            <Memo_DataTable_TableBodyRow key={row.id} {...props} />
                        ) : (
                            <DataTable_TableBodyRow key={row.id} {...props} />
                        );
                    })}
                </TableBody>
            )}
            <TableBody
                {...tableBodyProps}
                sx={(theme) => ({
                    display: layoutMode?.startsWith("grid") ? "grid" : undefined,
                    height: rowVirtualizer ? `${rowVirtualizer.getTotalSize()}px` : undefined,
                    minHeight: !rows.length ? "100px" : undefined,
                    position: "relative",
                    ...parseFromValuesOrFunc(tableBodyProps?.sx, theme),
                })}
            >
                {tableBodyProps?.children ??
                    (!rows.length ? (
                        <tr
                            style={{
                                display: layoutMode?.startsWith("grid") ? "grid" : undefined,
                            }}
                        >
                            <td
                                colSpan={table.getVisibleLeafColumns().length}
                                style={{
                                    display: layoutMode?.startsWith("grid") ? "grid" : undefined,
                                }}
                            >
                                {renderEmptyRowsFallback?.({table}) ?? (
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontStyle: "italic",
                                            maxWidth: `min(100vw, ${tablePaperRef.current?.clientWidth ?? 360}px)`,
                                            py: "2rem",
                                            textAlign: "center",
                                            width: "100%",
                                        }}
                                    >
                                        {globalFilter || columnFilters.length
                                            ? localization.noResultsFound
                                            : localization.noRecordsToDisplay}
                                    </Typography>
                                )}
                            </td>
                        </tr>
                    ) : (
                        <>
                            {(virtualRows ?? rows).map((rowOrVirtualRow, staticRowIndex) => {
                                let row = rowOrVirtualRow;
                                if (rowVirtualizer) {
                                    if (renderDetailPanel) {
                                        if (rowOrVirtualRow.index % 2 === 1) {
                                            return null;
                                        } else {
                                            staticRowIndex = rowOrVirtualRow.index / 2;
                                        }
                                    } else {
                                        staticRowIndex = rowOrVirtualRow.index;
                                    }
                                    row = rows[staticRowIndex];
                                }
                                const props = {
                                    ...commonRowProps,
                                    pinnedRowIds,
                                    row,
                                    rowVirtualizer,
                                    staticRowIndex,
                                    virtualRow: rowVirtualizer ? rowOrVirtualRow : undefined,
                                };
                                const key = `${row.id}-${row.index}`;
                                return memoMode === "rows" ? (
                                    <Memo_DataTable_TableBodyRow key={key} {...props} />
                                ) : (
                                    <DataTable_TableBodyRow key={key} {...props} />
                                );
                            })}
                        </>
                    ))}
            </TableBody>
            {!rowPinningDisplayMode?.includes("sticky") && getIsSomeRowsPinned("bottom") && (
                <TableBody
                    {...tableBodyProps}
                    sx={(theme) => ({
                        bottom: tableFooterHeight - 1,
                        display: layoutMode?.startsWith("grid") ? "grid" : undefined,
                        position: "sticky",
                        zIndex: 1,
                        ...parseFromValuesOrFunc(tableBodyProps?.sx, theme),
                    })}
                >
                    {getBottomRows().map((row, staticRowIndex) => {
                        const props = {
                            ...commonRowProps,
                            row,
                            staticRowIndex,
                        };
                        return memoMode === "rows" ? (
                            <Memo_DataTable_TableBodyRow key={row.id} {...props} />
                        ) : (
                            <DataTable_TableBodyRow key={row.id} {...props} />
                        );
                    })}
                </TableBody>
            )}
        </>
    );
};
export default DataTable_TableBody;

export const Memo_DataTable_TableBody = memo(
    DataTable_TableBody,
    (prev, next) => prev.table.options.data === next.table.options.data
);
