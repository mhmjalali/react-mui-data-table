"use client";

import {useState} from "react";
import HideButton from "./HideButton";
import HideBody from "./HideBody";

function HideColumn({columns, user_id, page_name, table_name}) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <HideButton drawerState={open} setDrawerState={setOpen}/>
            <HideBody
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

export default HideColumn;
