# DataTable Component Documentation (RMS Project)

This document outlines the usage and structure for the `<DataTable />` component in the RMS project. Follow these
guidelines to integrate and configure DataTables on your pages.

## Table of Contents

1. [Introduction](#introduction)
2. [Attributes](#attributes)
3. [Columns Configuration](#columns-configuration)
4. [Example Columns](#example-columns)
5. [Usage](#usage)

---

## Introduction

The `<DataTable />` component is designed to simplify the integration of tables with filtering, sorting, and other
features. To use it effectively, certain attributes and configurations are required.

## Attributes

### `need_filter`

- **Type:** `boolean`
- **Description:** Determines if the filtering system should be enabled.

### `columns`

- **Type:** `Array<Object>`
- **Description:** Defines the structure of the columns in your DataTable. This will be discussed in more detail in
  the [Columns Configuration](#columns-configuration) section.

### `table_url`

- **Type:** `string`
- **Description:** The URL to fetch data from the backend.

### `user_id`

- **Type:** `string`
- **Description:** A unique identifier for the user. Used to manage local storage separately for different users.

### `page_name`

- **Type:** `string`
- **Description:** Name of the page, used to distinguish between different pages in local storage.

### `table_name`

- **Type:** `string`
- **Description:** Name of the table, used to distinguish between different tables on the same page in local storage.

### `tableToolbar`

- **Type:** `React Component`
- **Description:** A custom component that contains actions, buttons, or any content to be displayed above the
  DataTable.

---

## Columns Configuration

The `columns` attribute is an array of objects, where each object defines a column's behavior and appearance. Below are
the properties that can be configured for each column:

### Properties

- **`accessorKey`**: Usually the same as the ID and represents the key to the data field.
- **`header`**: The header name of your column.
- **`id`**: A unique identifier for the column, used for actions like filtering and hiding.
- **`enableColumnFilter`**: `boolean` - Specifies if a filter should be enabled for this column.
- **`datatype`**: `string` - The type of data, e.g., "text", "numeric", "date", or "array".
- **`filterFn`**: `string` - The default filter type for the column. Options include "contains", "equals", "
  notEquals", "lessThan", "greaterThan", and "fuzzy".
- **`columnFilterModeOptions`**: `Array<string>` - Additional filter options available in a dropdown for the user.
- **`columns`**: `Array<Object>` - If the column has sub-columns, this property contains an array of objects
  representing those sub-columns.

---

## Example Columns

Below is an example of how to configure the `columns` attribute:

```javascript
const columns = useMemo(
    () => [
        {
            accessorKey: "fullname",
            header: "نام کامل",
            id: "fullname",
            columns: [
                {
                    accessorKey: "name.firstName",
                    header: "نام",
                    id: "firstName",
                    enableColumnFilter: true,
                    datatype: "text",
                    filterFn: "contains",
                    columnFilterModeOptions: ["equals", "notEquals", "contains"],
                },
                {
                    accessorKey: "name.lastName",
                    header: "نام خانوادگی",
                    id: "lastName",
                    enableColumnFilter: true,
                    datatype: "text",
                    filterFn: "equals",
                    columnFilterModeOptions: ["equals", "notEquals", "contains"],
                },
            ],
        },
        {
            accessorKey: "address",
            header: "کد پرونده",
            id: "address",
            enableColumnFilter: true,
            datatype: "text",
            filterFn: "notEquals",
            columnFilterModeOptions: ["equals", "notEquals", "contains"],
        },
        {
            accessorKey: "city",
            header: "کد رهگیری",
            id: "city",
            enableColumnFilter: true,
            datatype: "text",
            filterFn: "equals",
            columnFilterModeOptions: ["equals", "notEquals", "contains", "lessThan", "greaterThan", "fuzzy"],
        },
        {
            accessorKey: "state",
            header: "نوع پاسخ به اسعلام",
            id: "state",
            enableColumnFilter: true,
            datatype: "text",
            filterFn: "contains",
            columnFilterModeOptions: ["equals", "notEquals", "contains"],
        },
        {
            accessorKey: "price",
            header: "وضعیت پاسخ به استعلام",
            id: "price",
            enableColumnFilter: true,
            datatype: "numeric",
            filterFn: "equals",
            columnFilterModeOptions: ["equals", "notEquals"],
        },
        {
            accessorKey: "created_at",
            header: "نام متقاضی",
            id: "created_at",
            enableColumnFilter: true,
            datatype: "date",
            filterFn: "between",
        },
        {
            accessorKey: "updated_at",
            header: "شماره ملی/شناسنامه",
            id: "updated_at",
            enableColumnFilter: true,
            datatype: "date",
            filterFn: "equals",
        },
        {
            accessorKey: "company",
            header: "تاریخ صدور",
            id: "company",
            enableColumnFilter: true,
            datatype: "numeric",
            filterFn: "equals",
            columnSelectOption: [
                { value: 1, label: "something" },
                { value: 2, label: "something" },
                { value: 3, label: "something" },
            ],
        },
        {
            accessorKey: "area",
            header: "ایجاد کننده",
            id: "area",
            enableColumnFilter: true,
            datatype: "array",
            filterFn: "equals",
            columnSelectOption: [
                { value: 1, label: "something" },
                { value: 2, label: "something" },
                { value: 3, label: "something" },
            ],
        },
        {
            accessorKey: "area",
            header: "از کیلومتر",
            id: "area",
            enableColumnFilter: true,
            datatype: "numeric",
            filterFn: "between",
        },
        {
            accessorKey: "area",
            header: "تا کیلومتر",
            id: "area",
            enableColumnFilter: true,
            datatype: "numeric",
            filterFn: "between",
        },
    ],
    []
);