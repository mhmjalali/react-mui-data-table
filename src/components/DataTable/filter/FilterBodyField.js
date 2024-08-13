import {useState} from "react";
import FilterOptionList from "./FilterOptionList";
import CustomSelect from "./fieldsType/CustomSelect";
import CustomTextField from "./fieldsType/CustomTextField";
import CustomTextFieldRange from "./fieldsType/CustomTextFieldRange";
import CustomDatePickerRange from "./fieldsType/CustomDate/CustomDatePickerRange";
import CustomDatePicker from "./fieldsType/CustomDate/CustomDatePicker";
import CustomSelectMultiple from "./fieldsType/CustomSelectMultiple";

const columnFilterModeOptionFa = {
    equals: "برابر",
    notEquals: "نابرابر",
    contains: "شامل",
    lessThan: "کوچکتر",
    greaterThan: "بزرگتر",
    fuzzy: "فازی",
    between: "مابین",
};

function FilterBodyField({
                             column,
                             filterParameters,
                             handleChange,
                             handleBlur,
                             setFieldValue,
                             errors,
                             touched,
                             resetForm,
                         }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const defaultFilterTranslation = columnFilterModeOptionFa[filterParameters.filterFn] || filterParameters.filterFn;

    const handleOpenFilterBox = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            {filterParameters.datatype === "numeric" && filterParameters.filterFn === "between" ? (
                <CustomTextFieldRange
                    column={column}
                    filterParameters={filterParameters}
                    defaultFilterTranslation={defaultFilterTranslation}
                    handleOpenFilterBox={handleOpenFilterBox}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                />
            ) : filterParameters.datatype === "numeric" &&
            filterParameters.filterFn === "equals" &&
            Array.isArray(column.columnSelectOption) ? (
                <CustomSelect
                    column={column}
                    filterParameters={filterParameters}
                    setFieldValue={setFieldValue}
                    defaultFilterTranslation={defaultFilterTranslation}
                    handleOpenFilterBox={handleOpenFilterBox}
                />
            ) : filterParameters.datatype === "date" && filterParameters.filterFn === "equals" ? (
                <CustomDatePicker
                    column={column}
                    filterParameters={filterParameters}
                    setFieldValue={setFieldValue}
                    defaultFilterTranslation={defaultFilterTranslation}
                    handleOpenFilterBox={handleOpenFilterBox}
                />
            ) : filterParameters.datatype === "date" && filterParameters.filterFn === "between" ? (
                <CustomDatePickerRange
                    column={column}
                    filterParameters={filterParameters}
                    setFieldValue={setFieldValue}
                    defaultFilterTranslation={defaultFilterTranslation}
                    handleOpenFilterBox={handleOpenFilterBox}
                    errors={errors}
                    touched={touched}
                />
            ) : filterParameters.datatype === "array" && filterParameters.filterFn === "equals" ? (
                <CustomSelectMultiple
                    column={column}
                    filterParameters={filterParameters}
                    setFieldValue={setFieldValue}
                    defaultFilterTranslation={defaultFilterTranslation}
                    handleOpenFilterBox={handleOpenFilterBox}
                />
            ) : (
                <CustomTextField
                    column={column}
                    filterParameters={filterParameters}
                    defaultFilterTranslation={defaultFilterTranslation}
                    handleOpenFilterBox={handleOpenFilterBox}
                    handleBlur={handleBlur}
                    handleChange={(e) => setFieldValue(`${column.id}.value`, e.target.value)}
                />
            )}
            {Array.isArray(column.columnFilterModeOptions) && (
                <FilterOptionList
                    column={column}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    filterParameters={filterParameters}
                    filterType={filterParameters.filterFn}
                    setFieldValue={setFieldValue}
                    resetForm={resetForm}
                    filterOption={column.columnFilterModeOptions}
                    columnFilterModeOptionFa={columnFilterModeOptionFa}
                />
            )}
        </>
    );
}

export default FilterBodyField;
