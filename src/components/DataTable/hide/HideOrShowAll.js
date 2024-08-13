"use client";

import { Box, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const setAllValues = (obj, value) => {
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            result[key] = setAllValues(obj[key], value);
        } else {
            result[key] = value;
        }
    }
    return result;
};

const allValuesAre = (obj, value) => {
    for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            if (!allValuesAre(obj[key], value)) {
                return false;
            }
        } else if (obj[key] !== value) {
            return false;
        }
    }
    return true;
};

function HideOrShowAll({ hideData, setHideData }) {
    const handleShowAll = () => {
        const newHideData = setAllValues(hideData, true);
        setHideData(newHideData);
    };

    const handleHideAll = () => {
        const newHideData = setAllValues(hideData, false);
        setHideData(newHideData);
    };

    const allHidden = allValuesAre(hideData, false);
    const allVisible = allValuesAre(hideData, true);

    return (
        <Box sx={{ mx: 2, my: 1, display: "flex", justifyContent: "space-between" }}>
            <Button
                color="info"
                disabled={allVisible}
                variant="contained"
                startIcon={<VisibilityIcon />}
                onClick={handleShowAll}
            >
                نمایش همه
            </Button>
            <Button
                color="error"
                disabled={allHidden}
                variant="contained"
                startIcon={<VisibilityOffIcon />}
                onClick={handleHideAll}
            >
                مخفی کردن همه
            </Button>
        </Box>
    );
}

export default HideOrShowAll;