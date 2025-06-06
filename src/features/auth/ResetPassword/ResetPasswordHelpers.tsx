import API_URL from '../../../config';

export async function requestResetPassword(email: string) {
  const res = await await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res;
}

export async function resetPassword(token: string, newPassword: string) {
  const res = await await fetch(`${API_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });
  return res;
}
