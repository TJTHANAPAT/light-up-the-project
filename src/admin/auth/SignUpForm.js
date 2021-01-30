import React, { useState } from 'react';
import { useAuth } from './authentication';

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name_first: '',
    name_last: '',
  });

  const handleChangeInput = event => {
    console.log(`${event.target.name}: ${event.target.value}`);
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const auth = useAuth();
  const signUp = event => {
    event.preventDefault();
    const { email, password, name_first, name_last } = formState;
    const displayName = `${name_first} ${name_last}`;
    auth
      .signUp(email, password, displayName)
      .then(() => {
        console.log('Created account successfully.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={signUp}>
      <label htmlFor="signup_name_first">First Name: </label>
      <input
        type="text"
        id="signup_name_first"
        name="name_first"
        placeholder="First Name"
        value={formState.name_first}
        onChange={handleChangeInput}
        required
      />
      <label htmlFor="signup_name_last">Last Name: </label>
      <input
        type="text"
        id="signup_name_last"
        name="name_last"
        placeholder="Last Name"
        value={formState.name_last}
        onChange={handleChangeInput}
        required
      />
      <br />
      <label htmlFor="signup_email">Email: </label>
      <input
        type="email"
        id="signup_email"
        name="email"
        placeholder="example@mail.com"
        value={formState.email}
        onChange={handleChangeInput}
        required
      />
      <label htmlFor="signup_password">Password: </label>
      <input
        type="password"
        id="signup_password"
        name="password"
        placeholder="password"
        value={formState.password}
        onChange={handleChangeInput}
        required
      />
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
