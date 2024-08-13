"use client";

import {Box, Button, Drawer, styled} from "@mui/material";
import {Form, Formik} from "formik";
import useTableSetting from "@/lib/hooks/useTableSetting";
import {useEffect, useState} from "react";
import FilterHeader from "./FilterHeader";
import * as Yup from "yup";
import FilterBodyField from "./FilterBodyField";
import useDataTable from "@/lib/hooks/useDataTable";

const ScrollBox = styled(Box)({
    flexGrow: 1,
    overflowY: "scroll",
    maxWidth: "450px",
    "::-webkit-scrollbar": {
        width: "5px",
    },
    "::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 5px #fff",
        borderRadius: "5px",
    },
    "::-webkit-scrollbar-thumb": {
        background: "#155175",
        borderRadius: "0px",
    },
});

function FilterBody({columns, drawerState, setDrawerState, user_id, page_name, table_name}) {
    const {settingStore} = useTableSetting();
    const [initialValues, setInitialValues] = useState({});
    const [validationSchema, setValidationSchema] = useState({});
    const {filterData, setFilterData} = useDataTable();

    useEffect(() => {
        setInitialValues(filterData);
    }, [columns, settingStore, user_id, page_name, table_name, filterData]);

    useEffect(() => {
        const generatedSchema = Yup.object().shape(
            Object.keys(initialValues).reduce((acc, key) => {
                const initialValue = initialValues[key];
                if (initialValue.filterFn === "between") {
                    acc[key] = Yup.object().shape({
                        value: Yup.array()
                            .of(Yup.string().nullable())
                            .test({
                                test(value, ctx) {
                                    const [start, end] = value || ["", ""];
                                    if (
                                        initialValue.datatype === "numeric" &&
                                        parseInt(end, 10) <= parseInt(start, 10)
                                    ) {
                                        return ctx.createError({
                                            message: `مقدار وارده باید بیشتر از (${start}) باشد`,
                                        });
                                    } else if ((start && !end) || (!start && end)) {
                                        return ctx.createError({
                                            message: "این بخش را تکمیل نمایید",
                                        });
                                    }
                                    return true;
                                },
                            }),
                    });
                }
                return acc;
            }, {})
        );

        setValidationSchema(generatedSchema);
    }, [initialValues]);

    const handleSubmit = (values, {setSubmitting}) => {
        setDrawerState(false);
        setFilterData(values);
        setSubmitting(false);
    };

    return (
        <Drawer
            open={drawerState}
            onClose={() => setDrawerState(false)}
            sx={{overflowY: "hidden", display: "flex", flexDirection: "column", height: "100%"}}
        >
            <FilterHeader setDrawerState={setDrawerState}/>
            {Object.keys(initialValues).length > 0 && (
                <ScrollBox>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {({
                              values,
                              handleChange,
                              handleBlur,
                              setFieldValue,
                              errors,
                              touched,
                              isSubmitting,
                              isValid,
                              dirty,
                              resetForm,
                          }) => (
                            <Form>
                                <Box sx={{px: 1, py: 2}}>
                                    {columns.map(
                                        (column) =>
                                            column.enableColumnFilter && (
                                                <FilterBodyField
                                                    key={column.id}
                                                    column={column}
                                                    filterParameters={values[column.id]}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    setFieldValue={setFieldValue}
                                                    resetForm={resetForm}
                                                    errors={errors}
                                                    touched={touched}
                                                />
                                            )
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        pb: 2,
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={isSubmitting || !isValid || !dirty}
                                        sx={{
                                            px: 8,
                                            boxShadow:
                                                "rgba(0, 0, 0, 0.23) 0px 6px 6px, rgba(0, 0, 0, 0.19) 10px 0px 20px",
                                            backgroundColor: "primary2",
                                            ":hover": {
                                                backgroundColor: "primary2",
                                            },
                                        }}
                                    >
                                        اعمال فیلتر
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </ScrollBox>
            )}
        </Drawer>
    );
}

export default FilterBody;
