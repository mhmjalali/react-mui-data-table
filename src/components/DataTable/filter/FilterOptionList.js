"use client";

import { ListItem, Menu } from "@mui/material";
import { useState } from "react";

function FilterOptionList({
                              column,
                              filterType,
                              filterOption,
                              anchorEl,
                              columnFilterModeOptionFa,
                              setAnchorEl,
                              setFieldValue,
                          }) {

    const [selectedFilter, setSelectedFilter] = useState(filterType);

    const handleChangeItem = (event, index) => {
        setFieldValue(`${column.id}.value`, filterOption[index] === "between" ? ["", ""] : "");
        setFieldValue(`${column.id}.filterFn`, filterOption[index]);
        setSelectedFilter(filterOption[index]);
        setAnchorEl(null);
    };

    const handleCloseFilterBox = () => {
        setAnchorEl(null);
    };

    return (
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseFilterBox}>
            {filterOption.map((option, index) => (
                <ListItem
                    key={index}
                    onClick={(event) => handleChangeItem(event, index)}
                    selected={option === selectedFilter}
                    sx={{ cursor: "pointer", width: "100px", display: "flex", justifyContent: "center" }}
                >
                    {columnFilterModeOptionFa[option]}
                </ListItem>
            ))}
        </Menu>
    );
}

export default FilterOptionList;
