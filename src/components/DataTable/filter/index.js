"use client";

import {useState} from "react";
import FilterButton from "@/components/DataTable/filter/FilterButton";
import FilterBody from "@/components/DataTable/filter/FilterBody";

function FilterColumn({columns, user_id, page_name, table_name}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <FilterButton drawerState={open} setDrawerState={setOpen}/>
            <FilterBody
                columns={columns}
                drawerState={open}
                setDrawerState={setOpen}
                user_id={user_id}
                page_name={page_name}
                table_name={table_name}
            />
        </>
    );
}

export default FilterColumn;
