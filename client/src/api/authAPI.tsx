import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    // You can handle the token or user data here
    localStorage.setItem('token', data.token); // Store the token in localStorage
    return data; // Return the user data or token as needed
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Rethrow the error if needed
  }
};

export { login };