import {commonCellBeforeAfterStyles, getCommonPinnedCellStyles, parseFromValuesOrFunc} from "@/utils/utils";
import {useTheme} from "@emotion/react";
import {alpha, darken, lighten, TableRow} from "@mui/material";
import {getIsRowSelected} from "material-react-table";
import {memo, useMemo, useRef} from "react";
import DataTable_TableBodyCell, {Memo_DataTable_TableBodyCell} from "./TableBodyCell";
import DataTable_TableDetailPanel from "./TableDetailPanel";

const DataTable_TableBodyRow = ({
                                    columnVirtualizer,
                                    numRows,
                                    pinnedRowIds,
                                    row,
                                    rowVirtualizer,
                                    staticRowIndex,
                                    table,
                                    virtualRow,
                                    ...rest
                                }) => {
    const theme = useTheme();

    const {
        getState,
        options: {
            enableRowOrdering,
            enableRowPinning,
            enableStickyFooter,
            enableStickyHeader,
            layoutMode,
            memoMode,
            mrtTheme: {baseBackgroundColor, pinnedRowBackgroundColor, selectedRowBackgroundColor},
            muiTableBodyRowProps,
            renderDetailPanel,
            rowPinningDisplayMode,
        },
        refs: {tableFooterRef, tableHeadRef},
        setHoveredRow,
    } = table;
    const {density, draggingColumn, draggingRow, editingCell, editingRow, hoveredRow, isFullScreen, rowPinning} =
        getState();

    const visibleCells = row.getVisibleCells();

    const {virtualColumns, virtualPaddingLeft, virtualPaddingRight} = columnVirtualizer ?? {};

    const isRowSelected = getIsRowSelected({row, table});
    const isRowPinned = enableRowPinning && row.getIsPinned();
    const isDraggingRow = draggingRow?.id === row.id;
    const isHoveredRow = hoveredRow?.id === row.id;

    const tableRowProps = {
        ...parseFromValuesOrFunc(muiTableBodyRowProps, {
            row,
            staticRowIndex,
            table,
        }),
        ...rest,
    };

    const [bottomPinnedIndex, topPinnedIndex] = useMemo(() => {
        if (!enableRowPinning || !rowPinningDisplayMode?.includes("sticky") || !pinnedRowIds || !row.getIsPinned())
            return [];
        return [[...pinnedRowIds].reverse().indexOf(row.id), pinnedRowIds.indexOf(row.id)];
    }, [pinnedRowIds, rowPinning]);

    const tableHeadHeight = ((enableStickyHeader || isFullScreen) && tableHeadRef.current?.clientHeight) || 0;
    const tableFooterHeight = (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

    const sx = parseFromValuesOrFunc(tableRowProps?.sx, theme);

    const defaultRowHeight = density === "compact" ? 37 : density === "comfortable" ? 53 : 69;

    const customRowHeight =
        // @ts-ignore
        parseInt(tableRowProps?.style?.height ?? sx?.height, 10) || undefined;

    const rowHeight = customRowHeight || defaultRowHeight;

    const handleDragEnter = (_e) => {
        if (enableRowOrdering && draggingRow) {
            setHoveredRow(row);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const rowRef = useRef(null);

    const cellHighlightColor = isRowSelected
        ? selectedRowBackgroundColor
        : isRowPinned
            ? pinnedRowBackgroundColor
            : undefined;

    const cellHighlightColorHover =
        tableRowProps?.hover !== false
            ? isRowSelected
                ? cellHighlightColor
                : theme.palette.mode === "dark"
                    ? `${lighten(baseBackgroundColor, 0.2)}`
                    : `${darken(baseBackgroundColor, 0.2)}`
            : undefined;

    return (
        <>
            <TableRow
                data-index={renderDetailPanel ? staticRowIndex * 2 : staticRowIndex}
                data-pinned={!!isRowPinned || undefined}
                data-selected={isRowSelected || undefined}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                ref={(node) => {
                    if (node) {
                        rowRef.current = node;
                        rowVirtualizer?.measureElement(node);
                    }
                }}
                selected={isRowSelected}
                {...tableRowProps}
                style={{
                    transform: virtualRow ? `translateY(${virtualRow.start}px)` : undefined,
                    ...tableRowProps?.style,
                }}
                sx={(theme) => ({
                    "&:hover td:after": cellHighlightColorHover
                        ? {
                            backgroundColor: alpha(cellHighlightColorHover, 0.3),
                            ...commonCellBeforeAfterStyles,
                        }
                        : undefined,
                    bottom:
                        !virtualRow && bottomPinnedIndex !== undefined && isRowPinned
                            ? `${bottomPinnedIndex * rowHeight + (enableStickyFooter ? tableFooterHeight - 1 : 0)}px`
                            : undefined,
                    boxSizing: "border-box",
                    display: layoutMode?.startsWith("grid") ? "flex" : undefined,
                    opacity: isRowPinned ? 0.97 : isDraggingRow || isHoveredRow ? 0.5 : 1,
                    position: virtualRow
                        ? "absolute"
                        : rowPinningDisplayMode?.includes("sticky") && isRowPinned
                            ? "sticky"
                            : "relative",
                    td: {
                        ...getCommonPinnedCellStyles({table, theme}),
                    },
                    "td:after": cellHighlightColor
                        ? {
                            backgroundColor: cellHighlightColor,
                            ...commonCellBeforeAfterStyles,
                        }
                        : undefined,
                    top: virtualRow
                        ? 0
                        : topPinnedIndex !== undefined && isRowPinned
                            ? `${topPinnedIndex * rowHeight +
                            (enableStickyHeader || isFullScreen ? tableHeadHeight - 1 : 0)
                            }px`
                            : undefined,
                    transition: virtualRow ? "none" : "all 150ms ease-in-out",
                    width: "100%",
                    zIndex: rowPinningDisplayMode?.includes("sticky") && isRowPinned ? 2 : 0,
                    ...sx,
                })}
            >
                {virtualPaddingLeft ? <td style={{display: "flex", width: virtualPaddingLeft}}/> : null}
                {(virtualColumns ?? visibleCells).map((cellOrVirtualCell, staticColumnIndex) => {
                    let cell = cellOrVirtualCell;
                    if (columnVirtualizer) {
                        staticColumnIndex = cellOrVirtualCell.index;
                        cell = visibleCells[staticColumnIndex];
                    }
                    const props = {
                        cell,
                        numRows,
                        rowRef,
                        staticColumnIndex,
                        staticRowIndex,
                        table,
                    };
                    return cell ? (
                        memoMode === "cells" &&
                        cell.column.columnDef.columnDefType === "data" &&
                        !draggingColumn &&
                        !draggingRow &&
                        editingCell?.id !== cell.id &&
                        editingRow?.id !== row.id ? (
                            <Memo_DataTable_TableBodyCell key={cell.id} {...props} />
                        ) : (
                            <DataTable_TableBodyCell key={cell.id} {...props} />
                        )
                    ) : null;
                })}
                {virtualPaddingRight ? <td style={{display: "flex", width: virtualPaddingRight}}/> : null}
            </TableRow>
            {renderDetailPanel && !row.getIsGrouped() && (
                <DataTable_TableDetailPanel
                    parentRowRef={rowRef}
                    row={row}
                    rowVirtualizer={rowVirtualizer}
                    staticRowIndex={staticRowIndex}
                    table={table}
                    virtualRow={virtualRow}
                />
            )}
        </>
    );
};
export default DataTable_TableBodyRow;

export const Memo_DataTable_TableBodyRow = memo(
    DataTable_TableBodyRow,
    (prev, next) => prev.row === next.row && prev.staticRowIndex === next.staticRowIndex
);
