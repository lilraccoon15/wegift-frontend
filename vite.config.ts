import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react()],
        server: {
            port: 3000,
        },
        define: {
            "import.meta.env.VITE_BACKEND_URL_AUTH": JSON.stringify(
                env.VITE_BACKEND_URL_AUTH
            ),
            "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
            "import.meta.env.VITE_BACKEND_URL_WISHLIST": JSON.stringify(
                env.VITE_BACKEND_URL_WISHLIST
            ),
            "import.meta.env.VITE_BACKEND_URL_USER": JSON.stringify(
                env.VITE_BACKEND_URL_USER
            ),
            "import.meta.env.VITE_BACKEND_URL_EXCHANGE": JSON.stringify(
                env.VITE_BACKEND_URL_EXCHANGE
            ),
        },
    };
});
