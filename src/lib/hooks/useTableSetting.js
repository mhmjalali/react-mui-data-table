import { useContext } from "react";
import { TableSettingContext } from "../contexts/tableSetting";

const useTableSetting = () => {
    const { settingStore, hideAction, sortAction, filterAction, resetAction } = useContext(TableSettingContext);
    return { settingStore, hideAction, sortAction, filterAction, resetAction };
};

export default useTableSetting;
