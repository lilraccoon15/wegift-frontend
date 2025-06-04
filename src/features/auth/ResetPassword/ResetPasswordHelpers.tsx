export async function requestResetPassword(email: string) {
  const res = await fetch("http://localhost:4000/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res;
}

export async function resetPassword(token: string, newPassword: string) {
  const res = await fetch("http://localhost:4000/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });
  return res;
}
