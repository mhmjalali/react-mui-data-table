import {alpha, darken} from "@mui/material";

export const parseCSSVarId = (id) => id.replace(/[^a-zA-Z0-9]/g, "_");

export const parseFromValuesOrFunc = (fn, arg) => (fn instanceof Function ? fn(arg) : fn);

export const getCommonToolbarStyles = ({table}) => ({
    alignItems: "flex-start",
    backgroundColor: table.options.mrtTheme.baseBackgroundColor,
    display: "grid",
    flexWrap: "wrap-reverse",
    minHeight: "3.5rem",
    overflow: "hidden",
    position: "relative",
    transition: "all 150ms ease-in-out",
    zIndex: 1,
});

export const getCommonTooltipProps = (placement) => ({
    disableInteractive: true,
    enterDelay: 500,
    enterNextDelay: 500,
    placement,
});

export const flipIconStyles = (theme) =>
    theme.direction === "rtl" ? {style: {transform: "scaleX(-1)"}} : undefined;

export const getCommonPinnedCellStyles = ({column, table, theme}) => {
    const {baseBackgroundColor} = table.options.mrtTheme;
    const isPinned = column?.getIsPinned();

    return {
        '&[data-pinned="true"]': {
            "&:before": {
                backgroundColor: alpha(darken(baseBackgroundColor, theme.palette.mode === "dark" ? 0.05 : 0.01), 0.97),
                boxShadow: column
                    ? isPinned === "left" && column.getIsLastColumn(isPinned)
                        ? `-4px 0 4px -4px ${alpha(theme.palette.grey[700], 0.5)} inset`
                        : isPinned === "right" && column.getIsFirstColumn(isPinned)
                            ? `4px 0 4px -4px ${alpha(theme.palette.grey[700], 0.5)} inset`
                            : undefined
                    : undefined,
                ...commonCellBeforeAfterStyles,
            },
        },
    };
};

export const getCommonMRTCellStyles = ({column, header, table, tableCellProps, theme}) => {
    const {
        getState,
        options: {enableColumnVirtualization, layoutMode},
    } = table;
    const {draggingColumn} = getState();
    const {columnDef} = column;
    const {columnDefType} = columnDef;

    const isColumnPinned = columnDef.columnDefType !== "group" && column.getIsPinned();

    const widthStyles = {
        minWidth: `max(calc(var(--${header ? "header" : "col"}-${parseCSSVarId(
            header?.id ?? column.id
        )}-size) * 1px), ${columnDef.minSize ?? 30}px)`,
        width: `calc(var(--${header ? "header" : "col"}-${parseCSSVarId(header?.id ?? column.id)}-size) * 1px)`,
    };

    if (layoutMode === "grid") {
        widthStyles.flex = `${
            [0, false].includes(columnDef.grow)
                ? 0
                : `var(--${header ? "header" : "col"}-${parseCSSVarId(header?.id ?? column.id)}-size)`
        } 0 auto`;
    } else if (layoutMode === "grid-no-grow") {
        widthStyles.flex = `${+(columnDef.grow || 0)} 0 auto`;
    }

    const pinnedStyles = isColumnPinned
        ? {
            ...getCommonPinnedCellStyles({column, table, theme}),
            left: isColumnPinned === "left" ? `${column.getStart("left")}px` : undefined,
            opacity: 0.97,
            position: "sticky",
            right: isColumnPinned === "right" ? `${column.getAfter("right")}px` : undefined,
        }
        : {};

    return {
        backgroundColor: "inherit",
        backgroundImage: "inherit",
        display: layoutMode?.startsWith("grid") ? "flex" : undefined,
        justifyContent:
            columnDefType === "group" ? "center" : layoutMode?.startsWith("grid") ? tableCellProps.align : undefined,
        opacity:
            table.getState().draggingColumn?.id === column.id || table.getState().hoveredColumn?.id === column.id
                ? 0.5
                : 1,
        position: "relative",
        transition: enableColumnVirtualization ? "none" : `padding 150ms ease-in-out`,
        zIndex:
            column.getIsResizing() || draggingColumn?.id === column.id
                ? 2
                : columnDefType !== "group" && isColumnPinned
                    ? 1
                    : 0,
        ...pinnedStyles,
        ...widthStyles,
        ...parseFromValuesOrFunc(tableCellProps?.sx, theme),
    };
};

export const commonCellBeforeAfterStyles = {
    content: '""',
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: -1,
};
