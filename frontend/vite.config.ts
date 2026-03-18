import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
    ],
    server: {
        proxy: {
            "/api": {
                target: "https://capi-js.onrender.com",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    base: mode === "production" ? "/Capi_JS/" : "/",
}));