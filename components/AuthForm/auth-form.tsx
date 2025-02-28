"use client";

import {useState} from "react";

export default function AuthForm() {
  const [authMode, setAuthMode] = useState('login');

  const switchAuthMode = () => {
    setAuthMode(prevMode => (prevMode === 'login' ? 'signup' : 'login'));
  };
  return (
    <form
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
        <button type="submit">
          {authMode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </p>
      {/*{formState.errors && (<ul id="form-errors">*/}
      {/*  {Object.keys(formState.errors).map(error => (*/}
      {/*    <li key={error}>{formState.errors[error]}</li>*/}
      {/*  ))}*/}
      {/*</ul>)}*/}
      <p>
        {authMode === 'login' && <span onClick={switchAuthMode}>Create an account</span>}
        {authMode === 'signup' && <span onClick={switchAuthMode}>Login with existing account.</span>}
      </p>
    </form>
  );
}