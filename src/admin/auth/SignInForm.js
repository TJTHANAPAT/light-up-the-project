import React, { useState } from 'react';
import { useAuth } from './authentication';

const SignInForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const handleChangeInput = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const auth = useAuth();
  const signIn = event => {
    event.preventDefault();
    const { email, password } = formState;
    auth
      .signIn(email, password)
      .then(user => {
        console.log(`Signed In as ${user.displayName}`);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={signIn}>
      <label htmlFor="signin_email">Email: </label>
      <input
        type="email"
        id="signin_email"
        name="email"
        placeholder="example@mail.com"
        value={formState.email}
        onChange={handleChangeInput}
        required
      />
      <br />
      <label htmlFor="signin_password">Password: </label>
      <input
        type="password"
        id="signin_password"
        name="password"
        placeholder="password"
        value={formState.password}
        onChange={handleChangeInput}
        required
      />
      <br />
      <button type="submit">Sign in</button>
    </form>
  );
};

export default SignInForm;
