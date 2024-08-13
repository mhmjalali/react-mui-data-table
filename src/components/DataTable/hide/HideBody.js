"use client";

import {Box, Drawer, styled} from "@mui/material";
import HideBodyField from "@/components/DataTable/hide/HideBodyField";
import HideHeader from "@/components/DataTable/hide/HideHeader";
import useDataTable from "@/lib/hooks/useDataTable";
import HideOrShowAll from "@/components/DataTable/hide/HideOrShowAll";

const ScrollBox = styled(Box)({
    flexGrow: 1,
    overflowY: "scroll",
    maxWidth: "450px",
    "::-webkit-scrollbar": {
        width: "5px",
    },
    "::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 5px #fff",
        borderRadius: "5px",
    },
    "::-webkit-scrollbar-thumb": {
        background: "#155175",
        borderRadius: "0px",
    },
});

function HideBody({columns, drawerState, setDrawerState}) {
    const {hideData, setHideData} = useDataTable();

    return (
        <Drawer
            open={drawerState}
            onClose={() => setDrawerState(false)}
            sx={{overflowY: "hidden", display: "flex", flexDirection: "column", height: "100%"}}
        >
            <HideHeader setDrawerState={setDrawerState}/>
            <HideOrShowAll hideData={hideData} setHideData={setHideData}/>
            <ScrollBox>
                <Box sx={{px: 1, py: 2, display: "flex", flexDirection: "column"}}>
                    {columns.map((column) => (
                        <HideBodyField
                            key={column.id}
                            column={column}
                            hideData={hideData}
                            setHideData={setHideData}
                        />
                    ))}
                </Box>
            </ScrollBox>
        </Drawer>
    );
}

export default HideBody;