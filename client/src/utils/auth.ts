// TODO: return the decoded token
    // TODO: return a value that indicates if the user is logged in
  // TODO: return a value that indicates if the token is expired
  // TODO: return the token
// TODO: set the token to localStorage
    // TODO: redirect to the home page
  
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page

import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  private storageKey = 'id_token';

  getProfile(): JwtPayload | null {
    const token = this.getToken();
    try {
      return token ? jwtDecode<JwtPayload>(token) : null;
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.exp ? decoded.exp * 1000 < Date.now() : true;
    } catch (error) {
      console.error('Error decoding token for expiration check', error);
      return true;
    }
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (error) {
      console.error('Failed to access localStorage', error);
      return null;
    }
  }

  setToken(token: string): void {
    try {
      localStorage.setItem(this.storageKey, token);
    } catch (error) {
      console.error('Failed to save token to localStorage', error);
    }
  }

  login(idToken: string): void {
    this.setToken(idToken);
    this.redirect('/');
  }

  logout(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Failed to remove token from localStorage', error);
    }
    this.redirect('/login');
  }

  private redirect(path: string): void {
    try {
      window.location.assign(path);
    } catch (error) {
      console.error('Failed to redirect', error);
    }
  }
}

export default new AuthService();
