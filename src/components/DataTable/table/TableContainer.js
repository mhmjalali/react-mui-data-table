import {parseFromValuesOrFunc} from "@/utils/utils";
import {TableContainer} from "@mui/material";
import {useEffect, useLayoutEffect, useState} from "react";
import DataTable_CellActionMenu from "../menus/CellActionMenu";
import DataTable_Table from "./Table";
import DataTable_TableLoadingOverlay from "./TableLoadingOverlay";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DataTable_TableContainer = ({table, ...rest}) => {
    const {
        getState,
        options: {enableCellActions, enableStickyHeader, muiTableContainerProps},
        refs: {bottomToolbarRef, tableContainerRef, topToolbarRef},
    } = table;
    const {actionCell, isFullScreen, isLoading, showLoadingOverlay} = getState();

    const loading = showLoadingOverlay !== false && (isLoading || showLoadingOverlay);

    const [totalToolbarHeight, setTotalToolbarHeight] = useState(0);

    const tableContainerProps = {
        ...parseFromValuesOrFunc(muiTableContainerProps, {
            table,
        }),
        ...rest,
    };

    useIsomorphicLayoutEffect(() => {
        const topToolbarHeight = typeof document !== "undefined" ? topToolbarRef.current?.offsetHeight ?? 0 : 0;

        const bottomToolbarHeight = typeof document !== "undefined" ? bottomToolbarRef?.current?.offsetHeight ?? 0 : 0;

        setTotalToolbarHeight(topToolbarHeight + bottomToolbarHeight);
    });

    return (
        <TableContainer
            aria-busy={loading}
            aria-describedby={loading ? "mrt-progress" : undefined}
            {...tableContainerProps}
            ref={(node) => {
                if (node) {
                    tableContainerRef.current = node;
                    if (tableContainerProps?.ref) {
                        //@ts-ignore
                        tableContainerProps.ref.current = node;
                    }
                }
            }}
            style={{
                maxHeight: isFullScreen ? `calc(100vh - ${totalToolbarHeight}px)` : undefined,
                ...tableContainerProps?.style,
            }}
            sx={(theme) => ({
                maxHeight: enableStickyHeader
                    ? `clamp(350px, calc(100vh - ${totalToolbarHeight}px), 9999px)`
                    : undefined,
                maxWidth: "100%",
                overflow: "auto",
                position: "relative",
                ...parseFromValuesOrFunc(tableContainerProps?.sx, theme),
            })}
        >
            {loading ? <DataTable_TableLoadingOverlay table={table}/> : null}
            <DataTable_Table table={table}/>
            {enableCellActions && actionCell && <DataTable_CellActionMenu table={table}/>}
        </TableContainer>
    );
};
export default DataTable_TableContainer;
