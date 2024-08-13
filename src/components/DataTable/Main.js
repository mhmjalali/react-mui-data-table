import DataTable_Paper from "./table/Paper";
import {useMaterialReactTable} from "material-react-table";
import {FA_DATATABLE_LOCALIZATION} from "./localization/fa/datatable";
import {flattenArrayOfObjects} from "@/utils/flattenArrayOfObjects";
import useDataTable from "@/lib/hooks/useDataTable";
import {useMemo, useState} from "react";
import useRequest from "@/lib/hooks/useRequest";
import useSWR from "swr";
import {flattenObjectOfObjects} from "@/utils/flattenObjectOfObjects";

const DataTable_Main = (props) => {
    const request = useRequest();
    const {filterData, sortData, setSortData, hideData} = useDataTable();
    const {
        need_filter,
        table_url,
        user_id,
        page_name,
        table_name,
        columns,
        initialStateProps,
        TableToolbar,
        table_title,
    } = props;
    const flatColumns = flattenArrayOfObjects(columns, "columns");
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10});
    const flattenHideData = flattenObjectOfObjects(hideData);
    const onSortingChange = (event) => {
        setSortData(event);
    };

    const fetchUrl = useMemo(() => {
        const isValueEmpty = (value) => {
            if (Array.isArray(value)) {
                return value.length === 0 || value.every(v => v === "");
            }
            return value === "" || value === null || value === undefined;
        };
        const filteredFilterData = Object.values(filterData).filter(
            (filter) => !isValueEmpty(filter.value),
        );

        const params = new URLSearchParams();
        params.set("start", `${pagination.pageIndex * pagination.pageSize}`);
        params.set("size", pagination.pageSize);
        params.set("filters", JSON.stringify(filteredFilterData.length === 0 ? [] : filteredFilterData));
        params.set("sorting", JSON.stringify(sortData));
        return `${table_url}?${params}`;
    }, [table_url, filterData, pagination, columns, sortData]);

    const fetcher = async (url) => {
        try {
            const response = await request(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const {data, isValidating, mutate} = useSWR(fetchUrl, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        keepPreviousData: true,
    });

    const table = useMaterialReactTable({
        localization: FA_DATATABLE_LOCALIZATION,
        columns,
        data: data?.data ?? [],
        initialState: {
            density: "compact",
            columnVisibility: flattenHideData,
            sorting: sortData,
            ...initialStateProps,
        },
        state: {
            showProgressBars: isValidating,
            columnVisibility: flattenHideData,
            sorting: sortData,
            pagination,
        },
        muiTableHeadProps: {
            sx: {
                borderTop: "1px solid #e1e1e1",
                borderBottom: "2px solid #e1e1e1",
            },
        },
        muiTableHeadCellProps: {
            sx: {
                color: "primary.main",
                borderLeft: "1px solid #e1e1e1",
                "&:first-of-type": {
                    borderLeft: "unset",
                },
            },
        },
        muiTableBodyCellProps: {
            sx: {
                borderLeft: "1px solid #e1e1e1",
                "&:first-of-type": {
                    borderLeft: "unset",
                },
            },
        },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        onPaginationChange: setPagination,
        onSortingChange: onSortingChange,
        renderTopToolbarCustomActions: ({table}) => (
            <>
                <TableToolbar mutate={mutate}/>
            </>
        ),
        ...props,
    });

    return (
        <DataTable_Paper
            table={table}
            table_title={table_title}
            need_filter={need_filter}
            mutate={mutate}
            table_url={table_url}
            columns={flatColumns}
            user_id={user_id}
            page_name={page_name}
            table_name={table_name}
        />
    );
};

export default DataTable_Main;
