import {TableSettingProvider} from "@/lib/contexts/tableSetting";

export const metadata = {
    title: "MUI DataTable",
};

export default function RootLayout({children}) {
    return (
        <html lang="fa" dir={"rtl"}>
        <body style={{height: "100vh", width: '100vw'}}>
        <TableSettingProvider>{children}</TableSettingProvider>
        </body>
        </html>
    );
}
