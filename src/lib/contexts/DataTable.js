import {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import useTableSetting from "@/lib/hooks/useTableSetting";
import {flattenArrayOfObjects} from "@/utils/flattenArrayOfObjects";
import AskForKeepData from "@/components/NotificationDesign/AskForKeepData";

export const DataTableContext = createContext();

const DataTableProvider = ({children, user_id, page_name, table_name, columns}) => {
    const {settingStore} = useTableSetting();
    const [isInitStates, setInitStates] = useState(false);
    const flatColumns = flattenArrayOfObjects(columns, "columns");
    const [initFilter, setInitFilter] = useState({});
    const [filterData, setFilterData] = useState({});
    const [initSort, setInitSort] = useState([]);
    const [sortData, setSortData] = useState([]);
    const [initHide, setInitHide] = useState({});
    const [hideData, setHideData] = useState({});

    useEffect(() => {
        if (!settingStore) return;
        const filterValues = flatColumns.reduce((acc, column) => {
            if (!column.enableColumnFilter) return acc;
            const storeFilter = settingStore?.[user_id]?.[page_name]?.[table_name]?.["filters"]?.find(
                (filter) => filter.id === column.id,
            );
            if (column.datatype === "array") {
                acc[column.id] = {
                    id: column.id,
                    value: storeFilter?.value || [],
                    filterFn: storeFilter?.filterFn || column._filterFn,
                    datatype: column.datatype,
                };
            } else if (column._filterFn === "between") {
                acc[column.id] = {
                    id: column.id,
                    value: storeFilter?.value || ["", ""],
                    filterFn: storeFilter?.filterFn || column._filterFn,
                    datatype: column.datatype,
                };
            } else {
                acc[column.id] = {
                    id: column.id,
                    value: storeFilter?.value || "",
                    filterFn: storeFilter?.filterFn || column._filterFn,
                    datatype: column.datatype,
                };
            }
            return acc;
        }, {});
        setFilterData(filterValues);
        setInitFilter(filterValues);
        setSortData(settingStore?.[user_id]?.[page_name]?.[table_name]?.["sorts"] || []);
        setInitSort(settingStore?.[user_id]?.[page_name]?.[table_name]?.["sorts"] || []);
        setInitStates(true);
    }, [settingStore, isInitStates]);

    useEffect(() => {
        const getHideValues = (columns) => {
            return columns.reduce((acc, column) => {
                const columnId = column.id;
                const storeHide = settingStore?.[user_id]?.[page_name]?.[table_name]?.["hides"]?.[columnId];
                if (column.columns && column.columns.length > 0) {
                    acc[columnId] = getHideValues(column.columns);
                } else {
                    acc[columnId] = storeHide !== undefined ? storeHide : true;
                }

                return acc;
            }, {});
        };

        const hideValues = getHideValues(columns);
        setHideData(hideValues);
        setInitHide(hideValues);
    }, [settingStore, isInitStates]);

    useEffect(() => {
        if (
            JSON.stringify(initFilter) !== JSON.stringify(filterData) ||
            JSON.stringify(initSort) !== JSON.stringify(sortData) ||
            JSON.stringify(initHide) !== JSON.stringify(hideData)
        ) {
            if (!toast.isActive("keep_data", "filtering")) {
                toast(
                    <AskForKeepData
                        filterData={filterData}
                        sortData={sortData}
                        hideData={hideData}
                        user_id={user_id}
                        page_name={page_name}
                        table_name={table_name}
                        columns={flatColumns}
                    />,
                    {
                        containerId: "filtering",
                        toastId: "keep_data",
                        className: "filter-toast",
                        position: "bottom-left",
                        draggable: true,
                        autoClose: false,
                    },
                );
            } else {
                toast.update("keep_data", {
                    containerId: "filtering",
                    toastId: "keep_data",
                    render: (
                        <AskForKeepData
                            filterData={filterData}
                            sortData={sortData}
                            hideData={hideData}
                            user_id={user_id}
                            page_name={page_name}
                            table_name={table_name}
                            columns={flatColumns}
                        />
                    ),
                });
            }
        } else {
            toast.dismiss({containerId: "datatable"});
        }
    }, [filterData, sortData, hideData]);

    if (!isInitStates) return null;

    return (
        <DataTableContext.Provider value={{filterData, setFilterData, sortData, setSortData, hideData, setHideData}}>
            {children}
        </DataTableContext.Provider>
    );
};

export default DataTableProvider;
