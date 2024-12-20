import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import type { UserLogin } from '../interfaces/UserLogin';


//added userlogin and userlogin in <> by use State
const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      setError(''); // Clear any errors
    } catch (err) {
      setError('Invalid username or password');
      console.error('Failed to login', err);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
