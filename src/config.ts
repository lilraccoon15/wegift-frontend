// src/config.ts
declare const process: {
  env: {
    REACT_APP_API_URL?: string;
  };
};

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export default API_URL;
