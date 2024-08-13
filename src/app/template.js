import cacheProviderRtl from "@/utils/cacheRtl";
import {CssBaseline, GlobalStyles, ThemeProvider} from "@mui/material";
import theme from "@/utils/theme";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import "../../public/global.scss";
import {ToastContainer} from "react-toastify";

const Template = ({children}) => {
    return (
        <AppRouterCacheProvider CacheProvider={cacheProviderRtl} options={{enableCssLayer: true}}>
            <ThemeProvider theme={theme}>
                <GlobalStyles
                    styles={{
                        "*": {
                            scrollbarWidth: "thin",
                            scrollbarColor: `#155175 transparent`,
                        },
                        "*&::-webkit-scrollbar": {
                            width: "4px",
                        },
                        "*&::-webkit-scrollbar-track": {
                            boxShadow: "inset 0 0 5px #fff",
                            borderRadius: "4px",
                        },
                        "*&::-webkit-scrollbar-thumb": {
                            background: "#155175",
                            borderRadius: "4px",
                        },
                    }}
                />
                <CssBaseline/>
                {children}
                <ToastContainer rtl containerId="filtering" closeButton={false}/>
                <ToastContainer rtl containerId="request_data"/>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
};

export default Template;
