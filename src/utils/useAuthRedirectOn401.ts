import { useEffect } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { isAuthError } from "./isAuthError";

export const useAuthRedirectOn401 = (error: unknown) => {
    const navigate = useNavigate();
    const { reset } = useQueryErrorResetBoundary();

    useEffect(() => {
        if (isAuthError(error)) {
            reset?.();
            navigate("/", { replace: true });
        }
    }, [error, navigate, reset]);
};
