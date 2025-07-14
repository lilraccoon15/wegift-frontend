export function useCombinedState(
    states: { loading?: boolean; error?: Error | null }[]
) {
    const loading = states.some((s) => s.loading);
    const error = states.find((s) => s.error)?.error ?? null;
    return { loading, error };
}
