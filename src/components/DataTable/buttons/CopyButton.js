import {getCommonTooltipProps, parseFromValuesOrFunc} from "@/utils/utils";
import {Button, Tooltip} from "@mui/material";
import {useState} from "react";

const DataTable_CopyButton = ({cell, table, ...rest}) => {
    const {
        options: {localization, muiCopyButtonProps},
    } = table;
    const {column, row} = cell;
    const {columnDef} = column;

    const [copied, setCopied] = useState(false);

    const handleCopy = (event, text) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
    };

    const buttonProps = {
        ...parseFromValuesOrFunc(muiCopyButtonProps, {
            cell,
            column,
            row,
            table,
        }),
        ...parseFromValuesOrFunc(columnDef.muiCopyButtonProps, {
            cell,
            column,
            row,
            table,
        }),
        ...rest,
    };

    return (
        <Tooltip
            {...getCommonTooltipProps("top")}
            title={buttonProps?.title ?? (copied ? localization.copiedToClipboard : localization.clickToCopy)}
        >
            <Button
                onClick={(e) => handleCopy(e, cell.getValue())}
                size="small"
                type="button"
                variant="text"
                {...buttonProps}
                sx={(theme) => ({
                    backgroundColor: "transparent",
                    border: "none",
                    color: "inherit",
                    cursor: "copy",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    letterSpacing: "inherit",
                    m: "-0.25rem",
                    minWidth: "unset",
                    py: 0,
                    textAlign: "inherit",
                    textTransform: "inherit",
                    ...parseFromValuesOrFunc(buttonProps?.sx, theme),
                })}
                title={undefined}
            />
        </Tooltip>
    );
};
export default DataTable_CopyButton;
