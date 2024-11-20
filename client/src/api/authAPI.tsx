// import { UserLogin } from "../interfaces/UserLogin";

// const login = async (userInfo: UserLogin) => {
//   try {
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userInfo),
//     });

//     if (!response.ok) {
//       throw new Error('Login failed');
//     }

//     const data = await response.json();
//     // You can handle the token or user data here
//     localStorage.setItem('token', data.token); // Store the token in localStorage
//     return data; // Return the user data or token as needed
//   } catch (error) {
//     console.error('Error during login:', error);
//     throw error; // Rethrow the error if needed
//   }
// };

// export { login };







import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', { // Use the full URL if necessary.//changed the api to auth to follow the routes in index.ts
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    // Check if the response status indicates failure
    if (!response.ok) {
      let errorMessage = 'Login failed';
      if (response.status === 401) {
        errorMessage = 'Invalid username or password';
      } else if (response.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Store the token in localStorage (consider switching to cookies for production)
    localStorage.setItem('token', data.token);

    return data; // Return the full response data or token as needed
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Rethrow the error to allow the caller to handle it
  }
};

export { login };
