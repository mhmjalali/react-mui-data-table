import {errorResponse} from "@/utils/errorResponse";
import {successRequest} from "@/utils/successRequest";
import axios from "axios"

const defaultOptions = {
    data: {},
    requestOptions: {
        headers: {},
    },
    notification: {
        show: true,
        success: false,
        failed: true,
    },
};

const useRequest = (initOptions) => {

    const _options = Object.assign({}, defaultOptions, initOptions);

    return async (url = "", method = "get", options) => {
        const mergedOptions = Object.assign({}, _options, options);

        try {
            const response = await axios({
                url,
                method,
                data: method === "get" ? null : mergedOptions.data,
                withCredentials: true,
                ...mergedOptions.requestOptions,
            });
            successRequest(mergedOptions.notification.show && mergedOptions.notification.success, "request_data");
            return response;
        } catch (error) {
            if (error.response) {
                errorResponse(
                    error.response,
                    mergedOptions.notification.show && mergedOptions.notification.failed,
                    "request_data"
                );
            }
            throw error;
        }
    };
};

export default useRequest;
