import { Box } from "@mui/material";

const allowedTypes = ["string", "number"];

const DataTable_TableBodyCellValue = ({ cell, rowRef, staticColumnIndex, staticRowIndex, table }) => {
    const {
        getState,
        options: {
            enableFilterMatchHighlighting,
            mrtTheme: { matchHighlightColor },
        },
    } = table;
    const { column, row } = cell;
    const { columnDef } = column;
    const { globalFilter, globalFilterFn } = getState();
    const filterValue = column.getFilterValue();

    let renderedCellValue =
        cell.getIsAggregated() && columnDef.AggregatedCell
            ? columnDef.AggregatedCell({
                  cell,
                  column,
                  row,
                  table,
              })
            : row.getIsGrouped() && !cell.getIsGrouped()
              ? null
              : cell.getIsGrouped() && columnDef.GroupedCell
                ? columnDef.GroupedCell({
                      cell,
                      column,
                      row,
                      table,
                  })
                : undefined;

    const isGroupedValue = renderedCellValue !== undefined;

    if (!isGroupedValue) {
        renderedCellValue = cell.renderValue();
    }

    if (
        enableFilterMatchHighlighting &&
        columnDef.enableFilterMatchHighlighting !== false &&
        String(renderedCellValue) &&
        allowedTypes.includes(typeof renderedCellValue) &&
        ((filterValue &&
            allowedTypes.includes(typeof filterValue) &&
            ["autocomplete", "text"].includes(columnDef.filterVariant)) ||
            (globalFilter && allowedTypes.includes(typeof globalFilter) && column.getCanGlobalFilter()))
    ) {
        const chunks = highlightWords?.({
            matchExactly: (filterValue ? columnDef._filterFn : globalFilterFn) !== "fuzzy",
            query: (filterValue ?? globalFilter ?? "").toString(),
            text: renderedCellValue?.toString(),
        });
        if (chunks?.length > 1 || chunks?.[0]?.match) {
            renderedCellValue = (
                <span aria-label={renderedCellValue} role="note">
                    {chunks?.map(({ key, match, text }) => (
                        <Box
                            aria-hidden="true"
                            component="span"
                            key={key}
                            sx={
                                match
                                    ? {
                                          backgroundColor: matchHighlightColor,
                                          borderRadius: "2px",
                                          color: (theme) =>
                                              theme.palette.mode === "dark"
                                                  ? theme.palette.common.white
                                                  : theme.palette.common.black,
                                          padding: "2px 1px",
                                      }
                                    : undefined
                            }
                        >
                            {text}
                        </Box>
                    )) ?? renderedCellValue}
                </span>
            );
        }
    }

    if (columnDef.Cell && !isGroupedValue) {
        renderedCellValue = columnDef.Cell({
            cell,
            column,
            renderedCellValue,
            row,
            rowRef,
            staticColumnIndex,
            staticRowIndex,
            table,
        });
    }

    return renderedCellValue;
};
export default DataTable_TableBodyCellValue;
