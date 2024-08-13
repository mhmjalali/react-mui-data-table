import {getCommonTooltipProps, parseFromValuesOrFunc} from "@/utils/utils";
import {IconButton, Tooltip} from "@mui/material";

const DataTable_GrabHandleButton = ({location, table, ...rest}) => {
    const {
        options: {
            icons: {DragHandleIcon},
            localization,
        },
    } = table;

    return (
        <Tooltip {...getCommonTooltipProps("top")} title={rest?.title ?? localization.move}>
            <IconButton
                aria-label={rest.title ?? localization.move}
                disableRipple
                draggable="true"
                size="small"
                {...rest}
                onClick={(e) => {
                    e.stopPropagation();
                    rest?.onClick?.(e);
                }}
                sx={(theme) => ({
                    "&:active": {
                        cursor: "grabbing",
                    },
                    "&:hover": {
                        backgroundColor: "transparent",
                        opacity: 1,
                    },
                    cursor: "grab",
                    m: "0 -0.1rem",
                    opacity: location === "row" ? 1 : 0.5,
                    p: "2px",
                    transition: "all 150ms ease-in-out",
                    ...parseFromValuesOrFunc(rest?.sx, theme),
                })}
                title={undefined}
            >
                <DragHandleIcon/>
            </IconButton>
        </Tooltip>
    );
};
export default DataTable_GrabHandleButton;
