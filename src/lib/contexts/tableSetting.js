"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import LZString from "lz-string";

export const TableSettingContext = createContext();

const decompressData = (compressedData) => {
    const decompressed = LZString.decompressFromUTF16(compressedData);
    if (decompressed === null) {
        localStorage.removeItem("_setting-app");
        return null;
    } else {
        return JSON.parse(decompressed);
    }
};

export const TableSettingProvider = ({ children }) => {
    const [settingStore, setSettingStore] = useState({});

    useEffect(() => {
        const compressedData = localStorage.getItem("_setting-app");

        const data = compressedData ? decompressData(compressedData) : null;
        if (data) {
            setSettingStore(data);
        }
    }, []);

    const hideAction = useCallback((user_id, page_name, table_name, settingValue) => {
        clearAction(user_id, page_name, table_name, "hides");
        updateSettingStorage(user_id, page_name, table_name, "hides", settingValue);
    }, []);

    const sortAction = useCallback((user_id, page_name, table_name, settingValue) => {
        updateSettingStorage(user_id, page_name, table_name, "sorts", settingValue);
    }, []);

    const filterAction = (user_id, page_name, table_name, settingValue) => {
        updateSettingStorage(user_id, page_name, table_name, "filters", settingValue);
    };

    const resetAction = (user_id, page_name, table_name) => {
        const compressedData = localStorage.getItem("_setting-app");
        const prevLocalStorage = compressedData ? decompressData(compressedData) : {};

        const userSettings = prevLocalStorage[user_id] || {};
        const pageSettings = userSettings[page_name] || {};
        delete pageSettings[table_name];

        const resetData = {
            ...prevLocalStorage,
            [user_id]: {
                ...userSettings,
                [page_name]: {
                    ...pageSettings,
                },
            },
        };

        localStorage.setItem("_setting-app", LZString.compressToUTF16(JSON.stringify(resetData)));
        setSettingStore(resetData);
    };

    const updateSettingStorage = (user_id, page_name, table_name, settingType, settingValue) => {
        const compressedData = localStorage.getItem("_setting-app");
        const prevLocalStorage = compressedData ? decompressData(compressedData) : {};

        const userSettings = prevLocalStorage[user_id] || {};
        const pageSettings = userSettings[page_name] || {};
        const tableSettings = pageSettings[table_name] || {};

        let newSettings;
        if (settingType === "sorts" || settingType === "filters") {
            newSettings = [...settingValue];
        } else {
            newSettings = { ...(tableSettings[settingType] || {}), ...settingValue };
        }

        const updatedLocalStorage = {
            ...prevLocalStorage,
            [user_id]: {
                ...userSettings,
                [page_name]: {
                    ...pageSettings,
                    [table_name]: {
                        ...tableSettings,
                        [settingType]: Array.isArray(settingValue) ? [...newSettings] : { ...newSettings },
                    },
                },
            },
        };

        localStorage.setItem("_setting-app", LZString.compressToUTF16(JSON.stringify(updatedLocalStorage)));
        setSettingStore(updatedLocalStorage);
    };

    const clearAction = (user_id, page_name, table_name, key) => {
        const compressedData = localStorage.getItem("_setting-app");
        const prevLocalStorage = compressedData ? decompressData(compressedData) : {};

        const userSettings = prevLocalStorage[user_id] || {};
        const pageSettings = userSettings[page_name] || {};
        const tableSettings = pageSettings[table_name] || {};

        const updatedSettings = {
            ...prevLocalStorage,
            [user_id]: {
                ...userSettings,
                [page_name]: {
                    ...pageSettings,
                    [table_name]: {
                        ...tableSettings,
                        [key]: Array.isArray(tableSettings[key]) ? [] : {},
                    },
                },
            },
        };

        localStorage.setItem("_setting-app", LZString.compressToUTF16(JSON.stringify(updatedSettings)));
        setSettingStore(updatedSettings);
    };

    return (
        <TableSettingContext.Provider value={{ settingStore, hideAction, sortAction, filterAction, resetAction }}>
            {children}
        </TableSettingContext.Provider>
    );
};