"use client";

import {useMemo} from "react";
import DataTable from "@/components/DataTable";
import {Box} from "@mui/material";
import Toolbar from "@/app/Home/Toolbar";

export default function Home() {
    const columns = useMemo(
        () => [
            {
                accessorKey: "first_header", /* MRT work with this key better to set it same as id */
                header: "هدر اول",/* column header it can be any language you want */
                id: "first_header", /* id that we work with it */
                enableColumnFilter: true, /* if you  need filter for this column change it to false */
                datatype: "text", /* it can be text - number - date - between and other thing that you check it with your back-end team */
                filterFn: "notEquals", /* default filter type all possible values: (contains,equals,notEquals,lessThan,greaterThan,fuzzy) */
                columnFilterModeOptions: ["equals", "notEquals", "contains"], /* all possible filterFn for this column */
            },
        ],
        [],
    );
    return (
        <>
            <Box sx={{p: 2, border: "1px solid #e1e1e1"}}>
                <DataTable
                    table_title={"مثالی از دیتا تیبل"} /* you can put title for table or not */
                    need_filter={true} /* if you don't need any filter for table columns make it false */
                    columns={columns} /* your table columns */
                    table_url={"/test"} /* put your fucking api here */
                    user_id={0} /* if you don't know what is user id remove this fucking repo */
                    page_name={"dataTable"} /* and your fucking page name here */
                    table_name={"tableExample"} /* your fucking table name too */
                    TableToolbar={Toolbar} /* top toolbar of your table with any action that you want to put there */
                />
            </Box>
        </>
    );
}
