"use server";

import {redirect} from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const response = await fetch("http://localhost:3002/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Login failed." };
    }

  } catch (e) {
    return { error: "Something went wrong. Please try again later." };
  }

  return redirect("/events");
}

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const lastName = formData.get('lastName') as string;
  const password = formData.get('password') as string;

  if (!email || !password || !name || !lastName) {
    return {error: "All fields are required."};
  }

  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password, name, lastName}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {error: errorData.error || "Register failed."};
    }

    const data = await response.json();
    return {success: true, token: data.token, userId: data.userId};
  } catch (e) {
    return {error: "Something went wrong. Please try again later."};
  }
}

export async function auth(mode: string, prevState: any, formData: FormData) {
  if (mode === 'login') {
    return login(prevState, formData);
  }

  return signup(prevState, formData);
}

// export async function logout() {
//   await destroySession();
//   redirect('/');
// }