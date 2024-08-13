import { alpha, Box, Checkbox, styled, Typography } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.content}`]: {
        padding: theme.spacing(0.5, 0.5),
        margin: theme.spacing(0.2, 0),
        gap: 0,
    },
    [`& .${treeItemClasses.iconContainer}`]: {
        "& .close": {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 16,
        paddingLeft: 16,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

function HideBodyField({ column, hideData, setHideData }) {
    const handleCheckboxChange = () => {
        setHideData(prevData => {
            const updateHideData = (data, id) => {
                if (data.hasOwnProperty(id)) {
                    return { ...data, [id]: !data[id] };
                }
                const updatedData = { ...data };
                for (const key in data) {
                    if (data[key] && typeof data[key] === "object") {
                        updatedData[key] = updateHideData(data[key], id);
                    }
                }
                return updatedData;
            };

            return updateHideData(prevData, column.id);
        });
    };

    const labelContent = (() => {
        if (typeof hideData[column.id] === "boolean") {
            return (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                        checked={hideData[column.id]}
                        onChange={handleCheckboxChange}
                        name={column.id}
                    />
                    <Typography variant="subtitle1">{column.header}</Typography>
                </Box>
            );
        } else {
            return (
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                    <Typography variant="subtitle1">{column.header}</Typography>
                </Box>
            );
        }
    })();

    return (
        <SimpleTreeView disableSelection>
            <CustomTreeItem itemId={column.id} label={labelContent}>
                {column.columns?.map((subColumn) => (
                    <HideBodyField
                        key={subColumn.id}
                        column={subColumn}
                        hideData={hideData[column.id]}
                        setHideData={setHideData}
                    />
                ))}
            </CustomTreeItem>
        </SimpleTreeView>
    );
}

export default HideBodyField;