const API_URL = "http://localhost:8000";

export async function loginUser(email: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return res.json();
}

export async function verifyUser(token: string) {
  const res = await fetch(`${API_URL}/verify`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function createUserData(data: any) {
  const res = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateUserData(data: any, token: string) {
  const res = await fetch(`${API_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}