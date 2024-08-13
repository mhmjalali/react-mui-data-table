import {parseFromValuesOrFunc} from "@/utils/utils";
import {Menu} from "@mui/material";
import DataTable_ActionMenuItem from "./ActionMenuItem";

const DataTable_CellActionMenu = ({table, ...rest}) => {
    const {
        getState,
        options: {
            editDisplayMode,
            enableClickToCopy,
            enableEditing,
            icons: {ContentCopy, EditIcon},
            localization,
            mrtTheme: {menuBackgroundColor},
            renderCellActionMenuItems,
        },
        refs: {actionCellRef},
    } = table;
    const {actionCell, density} = getState();
    const cell = actionCell || null;
    const {row} = cell;
    const {column} = cell;
    const {columnDef} = column;

    const handleClose = (event) => {
        event?.stopPropagation();
        table.setActionCell(null);
        actionCellRef.current = null;
    };

    const internalMenuItems = [
        (parseFromValuesOrFunc(enableClickToCopy, cell) === "context-menu" ||
            parseFromValuesOrFunc(columnDef.enableClickToCopy, cell) === "context-menu") && (
            <DataTable_ActionMenuItem
                icon={<ContentCopy/>}
                key={"mrt-copy"}
                label={localization.copy}
                onClick={(event) => {
                    event.stopPropagation();
                    navigator.clipboard.writeText(cell.getValue());
                    handleClose();
                }}
                table={table}
            />
        ),
        parseFromValuesOrFunc(enableEditing, row) && editDisplayMode === "cell" && (
            <DataTable_ActionMenuItem
                icon={<EditIcon/>}
                key={"mrt-edit"}
                label={localization.edit}
                onClick={() => {
                    openEditingCell({cell, table});
                    handleClose();
                }}
                table={table}
            />
        ),
    ].filter(Boolean);

    const renderActionProps = {
        cell,
        closeMenu: handleClose,
        column,
        internalMenuItems,
        row,
        table,
    };

    const menuItems =
        columnDef.renderCellActionMenuItems?.(renderActionProps) ?? renderCellActionMenuItems?.(renderActionProps);

    return (
        (!!menuItems?.length || !!internalMenuItems?.length) && (
            <Menu
                MenuListProps={{
                    dense: density === "compact",
                    sx: {
                        backgroundColor: menuBackgroundColor,
                    },
                }}
                anchorEl={actionCellRef.current}
                disableScrollLock
                onClick={(event) => event.stopPropagation()}
                onClose={handleClose}
                open={!!cell}
                transformOrigin={{horizontal: -100, vertical: 8}}
                {...rest}
            >
                {menuItems ?? internalMenuItems}
            </Menu>
        )
    );
};
export default DataTable_CellActionMenu;
