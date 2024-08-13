import {getCommonMRTCellStyles, parseFromValuesOrFunc} from "@/utils/utils";
import {useTheme} from "@emotion/react";
import {Box, TableCell} from "@mui/material";
import {MRT_TableHeadCellSortLabel} from "material-react-table";
import {useMemo} from "react";

const DataTable_TableHeadCell = ({columnVirtualizer, header, staticColumnIndex, backgroundColor, table, ...rest}) => {
    const theme = useTheme();
    const {
        getState,
        options: {
            columnResizeDirection,
            columnResizeMode,
            enableColumnActions,
            enableColumnDragging,
            enableColumnOrdering,
            enableColumnPinning,
            enableGrouping,
            enableMultiSort,
            layoutMode,
            mrtTheme: {draggingBorderColor},
            muiTableHeadCellProps,
        },
        refs: {tableHeadCellRefs},
        setHoveredColumn,
    } = table;
    const {columnSizingInfo, density, draggingColumn, grouping, hoveredColumn, showColumnFilters} = getState();
    const {column} = header;
    const {columnDef} = column;
    const {columnDefType} = columnDef;

    const tableCellProps = {
        ...parseFromValuesOrFunc(muiTableHeadCellProps, {column, table}),
        ...parseFromValuesOrFunc(columnDef.muiTableHeadCellProps, {
            column,
            table,
        }),
        ...rest,
    };

    const isColumnPinned = enableColumnPinning && columnDef.columnDefType !== "group" && column.getIsPinned();

    const showColumnActions =
        (enableColumnActions || columnDef.enableColumnActions) && columnDef.enableColumnActions !== false;

    const showDragHandle =
        enableColumnDragging !== false &&
        columnDef.enableColumnDragging !== false &&
        (enableColumnDragging ||
            (enableColumnOrdering && columnDef.enableColumnOrdering !== false) ||
            (enableGrouping && columnDef.enableGrouping !== false && !grouping.includes(column.id)));

    const headerPL = useMemo(() => {
        let pl = 0;
        if (column.getCanSort()) pl += 1;
        if (showColumnActions) pl += 1.75;
        if (showDragHandle) pl += 1.5;
        return pl;
    }, [showColumnActions, showDragHandle]);

    const draggingBorders = useMemo(() => {
        const showResizeBorder =
            columnSizingInfo.isResizingColumn === column.id &&
            columnResizeMode === "onChange" &&
            !header.subHeaders.length;

        const borderStyle = showResizeBorder
            ? `2px solid ${draggingBorderColor} !important`
            : draggingColumn?.id === column.id
                ? `1px dashed ${theme.palette.grey[500]}`
                : hoveredColumn?.id === column.id
                    ? `2px dashed ${draggingBorderColor}`
                    : undefined;

        if (showResizeBorder) {
            return columnResizeDirection === "ltr" ? {borderRight: borderStyle} : {borderLeft: borderStyle};
        }
        const draggingBorders = borderStyle
            ? {
                borderLeft: borderStyle,
                borderRight: borderStyle,
                borderTop: borderStyle,
            }
            : undefined;

        return draggingBorders;
    }, [draggingColumn, hoveredColumn, columnSizingInfo.isResizingColumn]);

    const handleDragEnter = (_e) => {
        if (enableGrouping && hoveredColumn?.id === "drop-zone") {
            setHoveredColumn(null);
        }
        if (enableColumnOrdering && draggingColumn && columnDefType !== "group") {
            setHoveredColumn(columnDef.enableColumnOrdering !== false ? column : null);
        }
    };

    const handleDragOver = (e) => {
        if (columnDef.enableColumnOrdering !== false) {
            e.preventDefault();
        }
    };

    const HeaderElement =
        parseFromValuesOrFunc(columnDef.Header, {
            column,
            header,
            table,
        }) ?? columnDef.header;

    const columnRelativeDepth = header.depth - column.depth;

    if (columnRelativeDepth > 1) {
        return null;
    }

    let rowSpan = 1;
    if (header.isPlaceholder) {
        const leafs = header.getLeafHeaders();
        rowSpan = leafs[leafs.length - 1].depth - header.depth;
    }

    return (
        <TableCell
            align={columnDefType === "group" ? "center" : theme.direction === "rtl" ? "right" : "left"}
            colSpan={header.colSpan}
            rowSpan={rowSpan}
            data-index={staticColumnIndex}
            data-pinned={!!isColumnPinned || undefined}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            ref={(node) => {
                if (node) {
                    tableHeadCellRefs.current[column.id] = node;
                    if (columnDefType !== "group") {
                        columnVirtualizer?.measureElement?.(node);
                    }
                }
            }}
            {...tableCellProps}
            sx={(theme) => ({
                "& :hover": {
                    ".MuiButtonBase-root": {
                        opacity: 1,
                    },
                },
                flexDirection: layoutMode?.startsWith("grid") ? "column" : undefined,
                fontWeight: "bold",
                overflow: "visible",
                p:
                    density === "compact"
                        ? "0.5rem"
                        : density === "comfortable"
                            ? columnDefType === "display"
                                ? "0.75rem"
                                : "1rem"
                            : columnDefType === "display"
                                ? "1rem 1.25rem"
                                : "1.5rem",
                pb: columnDefType === "display" ? 0 : showColumnFilters || density === "compact" ? "0.4rem" : "0.6rem",
                pt:
                    columnDefType === "group" || density === "compact"
                        ? "0.25rem"
                        : density === "comfortable"
                            ? ".75rem"
                            : "1.25rem",
                userSelect: enableMultiSort && column.getCanSort() ? "none" : undefined,
                verticalAlign: "middle",
                ...getCommonMRTCellStyles({
                    column,
                    header,
                    table,
                    tableCellProps,
                    theme,
                }),
                ...draggingBorders,
                backgroundColor: backgroundColor,
            })}
        >
            {tableCellProps.children ?? (
                <Box
                    className="Mui-TableHeadCell-Content"
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: tableCellProps?.align === "right" ? "row-reverse" : "row",
                        justifyContent:
                            columnDefType === "group" || tableCellProps?.align === "center"
                                ? "center"
                                : column.getCanResize()
                                    ? "space-between"
                                    : "flex-start",
                        position: "relative",
                        width: "100%",
                    }}
                >
                    <Box
                        className="Mui-TableHeadCell-Content-Labels"
                        onClick={column.getToggleSortingHandler()}
                        sx={{
                            alignItems: "center",
                            cursor: column.getCanSort() && columnDefType !== "group" ? "pointer" : undefined,
                            display: "flex",
                            flexDirection: tableCellProps?.align === "right" ? "row-reverse" : "row",
                            overflow: columnDefType === "data" ? "hidden" : undefined,
                            pl: tableCellProps?.align === "center" ? `${headerPL}rem` : undefined,
                        }}
                    >
                        <Box
                            className="Mui-TableHeadCell-Content-Wrapper"
                            sx={{
                                "&:hover": {
                                    textOverflow: "clip",
                                },
                                minWidth: `${Math.min(columnDef.header?.length ?? 0, 4)}ch`,
                                overflow: columnDefType === "data" ? "hidden" : undefined,
                                textOverflow: "ellipsis",
                                textAlign: "start",
                                color: "#fff",
                                fontWeight: "400",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {HeaderElement}
                        </Box>
                        {column.getCanSort() && columnDefType !== "group" && (
                            <MRT_TableHeadCellSortLabel
                                sx={{
                                    width: 20, '& .MuiTableSortLabel-icon': {
                                        color: `#fff !important`,
                                    }
                                }}
                                header={header}
                                table={table}
                            />
                        )}
                    </Box>
                </Box>
            )}
        </TableCell>
    );
};
export default DataTable_TableHeadCell;
