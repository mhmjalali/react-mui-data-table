"use client";
import {toast} from "react-toastify";
import {successToast} from "@/components/Toasts/success";

export const successRequest = (notification, toastContainer) => {
    if (notification) {
        toast.dismiss({container: toastContainer});
        successToast(toastContainer);
    }
};
