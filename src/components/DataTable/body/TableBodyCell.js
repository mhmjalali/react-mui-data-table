import {isCellEditable, openEditingCell} from "material-react-table";

const {parseFromValuesOrFunc, getCommonMRTCellStyles} = require("@/utils/utils");
const {useTheme} = require("@emotion/react");
const {TableCell, Skeleton} = require("@mui/material");
const {useState, useEffect, useMemo, memo} = require("react");
const {default: DataTable_CopyButton} = require("../buttons/CopyButton");
const {default: DataTable_TableBodyCellValue} = require("./TableBodyCellValue");

const DataTable_TableBodyCell = ({cell, numRows, rowRef, staticColumnIndex, staticRowIndex, table, ...rest}) => {
    const theme = useTheme();
    const {
        getState,
        options: {
            columnResizeDirection,
            columnResizeMode,
            createDisplayMode,
            editDisplayMode,
            enableCellActions,
            enableClickToCopy,
            enableColumnOrdering,
            enableColumnPinning,
            enableGrouping,
            layoutMode,
            mrtTheme: {draggingBorderColor, baseBackgroundColor},
            muiSkeletonProps,
            muiTableBodyCellProps,
        },
        setHoveredColumn,
    } = table;
    const {
        actionCell,
        columnSizingInfo,
        creatingRow,
        density,
        draggingColumn,
        draggingRow,
        editingCell,
        editingRow,
        hoveredColumn,
        hoveredRow,
        isLoading,
        showSkeletons,
    } = getState();
    const {column, row} = cell;
    const {columnDef} = column;
    const {columnDefType} = columnDef;

    const args = {cell, column, row, table};
    const tableCellProps = {
        ...parseFromValuesOrFunc(muiTableBodyCellProps, args),
        ...parseFromValuesOrFunc(columnDef.muiTableBodyCellProps, args),
        ...rest,
    };

    const skeletonProps = parseFromValuesOrFunc(muiSkeletonProps, {
        cell,
        column,
        row,
        table,
    });

    const [skeletonWidth, setSkeletonWidth] = useState(100);
    useEffect(() => {
        if ((!isLoading && !showSkeletons) || skeletonWidth !== 100) return;
        const size = column.getSize();
        setSkeletonWidth(
            columnDefType === "display" ? size / 2 : Math.round(Math.random() * (size - size / 3) + size / 3)
        );
    }, [isLoading, showSkeletons]);

    const draggingBorders = useMemo(() => {
        const isDraggingColumn = draggingColumn?.id === column.id;
        const isHoveredColumn = hoveredColumn?.id === column.id;
        const isDraggingRow = draggingRow?.id === row.id;
        const isHoveredRow = hoveredRow?.id === row.id;
        const isFirstColumn = column.getIsFirstColumn();
        const isLastColumn = column.getIsLastColumn();
        const isLastRow = numRows && staticRowIndex === numRows - 1;
        const isResizingColumn = columnSizingInfo.isResizingColumn === column.id;
        const showResizeBorder = isResizingColumn && columnResizeMode === "onChange";

        const borderStyle = showResizeBorder
            ? `2px solid ${draggingBorderColor} !important`
            : isDraggingColumn || isDraggingRow
                ? `1px dashed ${theme.palette.grey[500]} !important`
                : isHoveredColumn || isHoveredRow || isResizingColumn
                    ? `2px dashed ${draggingBorderColor} !important`
                    : undefined;

        if (showResizeBorder) {
            return columnResizeDirection === "ltr" ? {borderRight: borderStyle} : {borderLeft: borderStyle};
        }

        return borderStyle
            ? {
                borderBottom:
                    isDraggingRow || isHoveredRow || (isLastRow && !isResizingColumn) ? borderStyle : undefined,
                borderLeft:
                    isDraggingColumn || isHoveredColumn || ((isDraggingRow || isHoveredRow) && isFirstColumn)
                        ? borderStyle
                        : undefined,
                borderRight:
                    isDraggingColumn || isHoveredColumn || ((isDraggingRow || isHoveredRow) && isLastColumn)
                        ? borderStyle
                        : undefined,
                borderTop: isDraggingRow || isHoveredRow ? borderStyle : undefined,
            }
            : undefined;
    }, [columnSizingInfo.isResizingColumn, draggingColumn, draggingRow, hoveredColumn, hoveredRow, staticRowIndex]);

    const isColumnPinned = enableColumnPinning && columnDef.columnDefType !== "group" && column.getIsPinned();

    const isEditable = isCellEditable({cell, table});

    const isEditing =
        isEditable &&
        !["custom", "modal"].includes(editDisplayMode) &&
        (editDisplayMode === "table" || editingRow?.id === row.id || editingCell?.id === cell.id) &&
        !row.getIsGrouped();

    const isCreating = isEditable && createDisplayMode === "row" && creatingRow?.id === row.id;

    const showClickToCopyButton =
        (parseFromValuesOrFunc(enableClickToCopy, cell) === true ||
            parseFromValuesOrFunc(columnDef.enableClickToCopy, cell) === true) &&
        !["context-menu", false].includes(
            // @ts-ignore
            parseFromValuesOrFunc(columnDef.enableClickToCopy, cell)
        );

    const isRightClickable = parseFromValuesOrFunc(enableCellActions, cell);

    const cellValueProps = {
        cell,
        table,
    };

    const handleDoubleClick = (event) => {
        tableCellProps?.onDoubleClick?.(event);
        openEditingCell({cell, table});
    };

    const handleDragEnter = (e) => {
        tableCellProps?.onDragEnter?.(e);
        if (enableGrouping && hoveredColumn?.id === "drop-zone") {
            setHoveredColumn(null);
        }
        if (enableColumnOrdering && draggingColumn) {
            setHoveredColumn(columnDef.enableColumnOrdering !== false ? column : null);
        }
    };

    const handleDragOver = (e) => {
        if (columnDef.enableColumnOrdering !== false) {
            e.preventDefault();
        }
    };

    const handleContextMenu = (e) => {
        tableCellProps?.onContextMenu?.(e);
        if (isRightClickable) {
            e.preventDefault();
            table.setActionCell(cell);
            table.refs.actionCellRef.current = e.currentTarget;
        }
    };

    return (
        <TableCell
            data-index={staticColumnIndex}
            data-pinned={!!isColumnPinned || undefined}
            {...tableCellProps}
            onContextMenu={handleContextMenu}
            onDoubleClick={handleDoubleClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            sx={(theme) => ({
                "&:hover": {
                    outline:
                        actionCell?.id === cell.id ||
                        (editDisplayMode === "cell" && isEditable) ||
                        (editDisplayMode === "table" && (isCreating || isEditing))
                            ? `1px solid ${theme.palette.grey[500]}`
                            : undefined,
                    textOverflow: "clip",
                },
                alignItems: layoutMode?.startsWith("grid") ? "center" : undefined,
                cursor: isRightClickable
                    ? "context-menu"
                    : isEditable && editDisplayMode === "cell"
                        ? "pointer"
                        : "inherit",
                outline: actionCell?.id === cell.id ? `1px solid ${theme.palette.grey[500]}` : undefined,
                outlineOffset: "-1px",
                overflow: "hidden",
                p:
                    density === "compact"
                        ? columnDefType === "display"
                            ? "0 0.5rem"
                            : "0.5rem"
                        : density === "comfortable"
                            ? columnDefType === "display"
                                ? "0.5rem 0.75rem"
                                : "1rem"
                            : columnDefType === "display"
                                ? "1rem 1.25rem"
                                : "1.5rem",

                textOverflow: columnDefType !== "display" ? "ellipsis" : undefined,
                whiteSpace: row.getIsPinned() || density === "compact" ? "nowrap" : "normal",
                ...getCommonMRTCellStyles({
                    column,
                    table,
                    tableCellProps,
                    theme,
                }),
                ...draggingBorders,
                backgroundColor: baseBackgroundColor
            })}
        >
            {tableCellProps.children ?? (
                <>
                    {cell.getIsPlaceholder() ? (
                        columnDef.PlaceholderCell?.({cell, column, row, table}) ?? null
                    ) : showSkeletons !== false && (isLoading || showSkeletons) ? (
                        <Skeleton animation="wave" height={20} width={skeletonWidth} {...skeletonProps} />
                    ) : columnDefType === "display" &&
                    (["mrt-row-expand", "mrt-row-numbers", "mrt-row-select"].includes(column.id) ||
                        !row.getIsGrouped()) ? (
                        columnDef.Cell?.({
                            cell,
                            column,
                            renderedCellValue: cell.renderValue(),
                            row,
                            rowRef,
                            staticColumnIndex,
                            staticRowIndex,
                            table,
                        })
                    ) : showClickToCopyButton && columnDef.enableClickToCopy !== false ? (
                        <DataTable_CopyButton cell={cell} table={table}>
                            <DataTable_TableBodyCellValue {...cellValueProps} />
                        </DataTable_CopyButton>
                    ) : (
                        <DataTable_TableBodyCellValue {...cellValueProps} />
                    )}
                    {cell.getIsGrouped() && !columnDef.GroupedCell && <> ({row.subRows?.length})</>}
                </>
            )}
        </TableCell>
    );
};
export default DataTable_TableBodyCell;

export const Memo_DataTable_TableBodyCell = memo(DataTable_TableBodyCell, (prev, next) => next.cell === prev.cell);
