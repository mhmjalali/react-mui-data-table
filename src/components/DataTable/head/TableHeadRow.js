import {parseFromValuesOrFunc} from "@/utils/utils";
import {TableRow} from "@mui/material";
import DataTable_TableHeadCell from "./TableHeadCell";

const DataTable_TableHeadRow = ({
                                    columnVirtualizer,
                                    headerGroup,
                                    table,
                                    index, // Add index prop
                                    ...rest
                                }) => {
    const {
        options: {enableStickyHeader, layoutMode, muiTableHeadRowProps},
    } = table;
    const {virtualColumns, virtualPaddingLeft, virtualPaddingRight} = columnVirtualizer ?? {};

    const backgroundColor = index % 2 === 0 ? "#015688" : "#ff5c0f";

    const tableRowProps = {
        ...parseFromValuesOrFunc(muiTableHeadRowProps, {
            headerGroup,
            table,
        }),
        ...rest,
        sx: (theme) => ({
            // Access theme from the sx function
            ...(parseFromValuesOrFunc(muiTableHeadRowProps?.sx, theme) || {}),
            display: layoutMode?.startsWith("grid") ? "flex" : undefined,
            position: enableStickyHeader && layoutMode === "semantic" ? "sticky" : "relative",
            top: 0,
        }),
    };

    return (
        <TableRow {...tableRowProps}>
            {virtualPaddingLeft && <th style={{display: "flex", width: virtualPaddingLeft}}/>}
            {(virtualColumns ?? headerGroup.headers).map((headerOrVirtualHeader, staticColumnIndex) => {
                const header = columnVirtualizer
                    ? headerGroup.headers[headerOrVirtualHeader.index]
                    : headerOrVirtualHeader;

                return header ? (
                    <DataTable_TableHeadCell
                        columnVirtualizer={columnVirtualizer}
                        header={header}
                        backgroundColor={backgroundColor}
                        key={header.id}
                        staticColumnIndex={staticColumnIndex}
                        table={table}
                    />
                ) : null;
            })}
            {virtualPaddingRight && <th style={{display: "flex", width: virtualPaddingRight}}/>}
        </TableRow>
    );
};

export default DataTable_TableHeadRow;
