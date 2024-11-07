import { jwtDecode } from "jwt-decode";

class AuthService {
  getUser() {
    const token = this.getToken();
    if (!token) {
      return null; // Return null if there's no token
    }
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    // no token or token is expired, the user is considered logged out
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // determine the expiration time set by server via decode
    const decoded = jwtDecode(token);
    // token IS expired, exp < now in seconds - true
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    // passes the check above so token is not expired
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  //   take the token as a parameter and set it in local storage and redirect user to the decks page
  login(idToken) {
    localStorage.setItem("id_token", idToken);
  }

  //   on logout remove the id from local storage and redirect user to homepage
  logout() {
    localStorage.removeItem("id_token");
  }
}

export default new AuthService();
