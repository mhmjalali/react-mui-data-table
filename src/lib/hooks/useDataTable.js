import {useContext} from "react";
import {DataTableContext} from "@/lib/contexts/DataTable";

const useDataTable = () => {
    const {filterData, setFilterData, sortData, setSortData, hideData, setHideData} = useContext(DataTableContext);
    return {filterData, setFilterData, sortData, setSortData, hideData, setHideData};
};

export default useDataTable;
