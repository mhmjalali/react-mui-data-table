"use client";
import {toast} from "react-toastify";
import {
    errorClientToast,
    errorLogicToast,
    errorServerToast,
    errorTooManyToast,
    errorValidationToast,
} from "@/components/Toasts/error";

const isServerError = (status) => status >= 500 && status <= 599;
const isClientError = (status) => status >= 400 && status <= 499;

const errorServer = (response, notification, toastContainer) => {
    if (notification) errorServerToast(toastContainer);
};

const errorClient = (response, notification, toastContainer) => {
    switch (response.status) {
        /* pay attention, absolutely you will be in need to handle 401 error case which it's for user authentication */
        case 422:
            if ("type" in response.data) {
                if (Array.isArray(response.data.message)) {
                    response.data.message.map((item) => {
                        if (notification) errorLogicToast(item, toastContainer);
                    });
                } else {
                    if (notification) errorLogicToast(response.data.message, toastContainer);
                }
                break;
            }
            if (notification) {
                const errorsMap = Object.keys(response.data.errors);
                const errorsArray = response.data.errors;

                errorsMap.map((item, index) => {
                    errorValidationToast(errorsArray[item][0], toastContainer);
                });
            }
            break;
        case 429:
            if (notification) errorTooManyToast(toastContainer);
            break;
        default:
            if (notification) errorClientToast(toastContainer);
            break;
    }
};

export const errorResponse = (response, notification, toastContainer) => {
    if (notification) toast.dismiss({container: toastContainer});
    if (isServerError(response.status)) {
        errorServer(response, notification, toastContainer);
    } else if (isClientError(response.status)) {
        errorClient(response, notification, toastContainer);
    }
};
