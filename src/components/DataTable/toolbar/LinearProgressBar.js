import {parseFromValuesOrFunc} from "@/utils/utils";
import {Collapse, LinearProgress} from "@mui/material";

const DataTable_LinearProgressBar = ({isTopToolbar, table, ...rest}) => {
    const {
        getState,
        options: {muiLinearProgressProps},
    } = table;
    const {isSaving, showProgressBars} = getState();

    const linearProgressProps = {
        ...parseFromValuesOrFunc(muiLinearProgressProps, {
            isTopToolbar,
            table,
        }),
        ...rest,
    };

    return (
        <Collapse
            in={showProgressBars !== false && (showProgressBars || isSaving)}
            mountOnEnter
            sx={{
                bottom: isTopToolbar ? 0 : undefined,
                position: "absolute",
                top: !isTopToolbar ? 0 : undefined,
                width: "100%",
            }}
            unmountOnExit
        >
            <LinearProgress
                aria-busy="true"
                aria-label="Loading"
                sx={{position: "relative"}}
                {...linearProgressProps}
            />
        </Collapse>
    );
};
export default DataTable_LinearProgressBar;
