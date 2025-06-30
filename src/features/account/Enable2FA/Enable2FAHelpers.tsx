import API_URL from "../../../config";

export async function fetch2FAStatus() {
    const res = await await fetch(`${API_URL}/api/auth/2fa-status`, {
        credentials: "include",
    });
    return res.json();
}

export async function generate2FA() {
    const res = await await fetch(`${API_URL}/api/auth/generate-2fa`, {
        credentials: "include",
    });
    return res.json();
}

export async function enable2FA(code: string) {
    const res = await await fetch(`${API_URL}/api/auth/enable-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include",
    });
    return res.json();
}

export async function disable2FA() {
    const res = await await fetch(`${API_URL}/api/auth/disable-2fa`, {
        method: "POST",
        credentials: "include",
    });
    return res.json();
}
