import {parseFromValuesOrFunc} from "@/utils/utils";
import {Collapse, TableCell, TableRow} from "@mui/material";

const DataTable_TableDetailPanel = ({
                                        parentRowRef,
                                        row,
                                        rowVirtualizer,
                                        staticRowIndex,
                                        table,
                                        virtualRow,
                                        ...rest
                                    }) => {
    const {
        getState,
        getVisibleLeafColumns,
        options: {
            layoutMode,
            mrtTheme: {baseBackgroundColor},
            muiDetailPanelProps,
            muiTableBodyRowProps,
            renderDetailPanel,
        },
    } = table;
    const {isLoading} = getState();

    const tableRowProps = parseFromValuesOrFunc(muiTableBodyRowProps, {
        isDetailPanel: true,
        row,
        staticRowIndex,
        table,
    });

    const tableCellProps = {
        ...parseFromValuesOrFunc(muiDetailPanelProps, {
            row,
            table,
        }),
        ...rest,
    };

    const DetailPanel = !isLoading && renderDetailPanel?.({row, table});

    return (
        <TableRow
            className="Mui-TableBodyCell-DetailPanel"
            data-index={renderDetailPanel ? staticRowIndex * 2 + 1 : staticRowIndex}
            ref={(node) => {
                if (node) {
                    rowVirtualizer?.measureElement?.(node);
                }
            }}
            {...tableRowProps}
            sx={(theme) => ({
                display: layoutMode?.startsWith("grid") ? "flex" : undefined,
                position: virtualRow ? "absolute" : undefined,
                top: virtualRow ? `${parentRowRef.current?.getBoundingClientRect()?.height}px` : undefined,
                transform: virtualRow ? `translateY(${virtualRow?.start}px)` : undefined,
                width: "100%",
                ...parseFromValuesOrFunc(tableRowProps?.sx, theme),
            })}
        >
            <TableCell
                className="Mui-TableBodyCell-DetailPanel"
                colSpan={getVisibleLeafColumns().length}
                {...tableCellProps}
                sx={(theme) => ({
                    backgroundColor: virtualRow ? baseBackgroundColor : undefined,
                    borderBottom: !row.getIsExpanded() ? "none" : undefined,
                    display: layoutMode?.startsWith("grid") ? "flex" : undefined,
                    py: !!DetailPanel && row.getIsExpanded() ? "1rem" : 0,
                    transition: !virtualRow ? "all 150ms ease-in-out" : undefined,
                    width: `100%`,
                    ...parseFromValuesOrFunc(tableCellProps?.sx, theme),
                })}
            >
                {virtualRow ? (
                    row.getIsExpanded() && DetailPanel
                ) : (
                    <Collapse in={row.getIsExpanded()} mountOnEnter unmountOnExit>
                        {DetailPanel}
                    </Collapse>
                )}
            </TableCell>
        </TableRow>
    );
};
export default DataTable_TableDetailPanel;
