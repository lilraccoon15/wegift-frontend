import fs from "fs";
import dotenv from "dotenv";
import path from "path";

// Charge manuellement les variables depuis le fichier .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const vars = [
    "VITE_BACKEND_URL_AUTH",
    "VITE_API_URL",
    "VITE_BACKEND_URL_WISHLIST",
    "VITE_BACKEND_URL_USER",
    "VITE_BACKEND_URL_EXCHANGE",
];

const env = vars.reduce((acc, key) => {
    acc[key] = process.env[key] ?? "";
    return acc;
}, {});

const fileContent = `// AUTO-GENERATED AT BUILD TIME
export const CLIENT_ENV = ${JSON.stringify(env, null, 2)};
`;

fs.writeFileSync("./src/config/clientEnv.ts", fileContent);
console.log("✅ clientEnv.ts generated");
