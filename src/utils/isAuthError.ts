import { AxiosError } from "axios";

export const isAuthError = (error: unknown): boolean => {
    return error instanceof AxiosError && error.response?.status === 401;
};
