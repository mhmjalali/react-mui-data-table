import {parseFromValuesOrFunc} from "@/utils/utils";
import {TableHead} from "@mui/material";
import DataTable_TableHeadRow from "./TableHeadRow";

const DataTable_TableHead = ({columnVirtualizer, table, ...rest}) => {
    const {
        getState,
        options: {enableStickyHeader, layoutMode, muiTableHeadProps, positionToolbarAlertBanner},
        refs: {tableHeadRef},
    } = table;
    const {isFullScreen, showAlertBanner} = getState();

    const tableHeadProps = {
        ...parseFromValuesOrFunc(muiTableHeadProps, {table}),
        ...rest,
    };

    const stickyHeader = enableStickyHeader || isFullScreen;

    return (
        <TableHead
            {...tableHeadProps}
            ref={(ref) => {
                tableHeadRef.current = ref;
                if (tableHeadProps?.ref) {
                    // @ts-ignore
                    tableHeadProps.ref.current = ref;
                }
            }}
            sx={(theme) => ({
                display: layoutMode?.startsWith("grid") ? "grid" : undefined,
                opacity: 0.97,
                position: stickyHeader ? "sticky" : "relative",
                top: stickyHeader && layoutMode?.startsWith("grid") ? 0 : undefined,
                zIndex: stickyHeader ? 2 : undefined,
                ...parseFromValuesOrFunc(tableHeadProps?.sx, theme),
            })}
        >
            {table.getHeaderGroups().map((headerGroup, index) => (
                <DataTable_TableHeadRow
                    columnVirtualizer={columnVirtualizer}
                    headerGroup={headerGroup}
                    key={headerGroup.id}
                    table={table}
                    index={index}
                />
            ))}
        </TableHead>
    );
};
export default DataTable_TableHead;
