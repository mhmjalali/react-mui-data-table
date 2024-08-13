"use client";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";

const cache = createCache({
    key: "mui-rtl",
    stylisPlugins: [prefixer, stylisRTLPlugin],
});

const cacheProviderRtl = (props) => {
    return <CacheProvider value={cache}>{props.children}</CacheProvider>;
};

export default cacheProviderRtl;
