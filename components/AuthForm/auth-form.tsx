"use client";

import {useState} from "react";
import {useActionState} from 'react';
import {auth} from "@/actions/auth";

export default function AuthForm() {
  const [authMode, setAuthMode] = useState('login');
  const [formState, formAction, pending] = useActionState(auth.bind(null, authMode), {});

  const switchAuthMode = () => {
    setAuthMode(prevMode => (prevMode === 'login' ? 'signup' : 'login'));
  };
  return (
    <form
      action={formAction}
      id="auth-form">
      <p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"/>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"/>
      </p>
      <p>
        <button type="submit"
                disabled={pending}>
          {authMode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </p>
      {formState.error && <p style={{color: 'red'}}>{formState.error}</p>}
      <p>
        {authMode === 'login' && <span onClick={switchAuthMode}>Create an account</span>}
        {authMode === 'signup' && <span onClick={switchAuthMode}>Login with existing account.</span>}
      </p>
    </form>
  );
}