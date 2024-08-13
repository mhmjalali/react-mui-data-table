import DataTable_Main from "./Main";
import DataTableProvider from "@/lib/contexts/DataTable";

const DataTable = (props) => {
    return (
        <DataTableProvider
            user_id={props.user_id}
            page_name={props.page_name}
            table_name={props.table_name}
            columns={props.columns}
        >
            <DataTable_Main {...props} />
        </DataTableProvider>
    );
};

export default DataTable;
