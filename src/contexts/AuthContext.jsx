import { createContext, useContext, useState, useEffect } from "react";
import axiosHandler from "../config/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([])
  const [authLoading, setAuthLoading] = useState(true);

  const isAdmin = () => user?.role === 'admin';


  const UserRegister = async (formData) => {
    try {
      const res = await axiosHandler.post("/auth/register", formData);
      toast.success(res?.data?.message || "Registration successful");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const UserLogin = async (formData) => {
    try {
      const res = await axiosHandler.post("/auth/login", formData);
      const authToken = res?.data?.token;
      const loggedInUser = res?.data?.user;

      if (!authToken || !loggedInUser) {
        toast.error("Invalid login response.");
        return;
      }

      // Admin login page - block non-admin users
      if (window.location.pathname === '/admin/login') {
        if (loggedInUser.role !== 'admin') {
          toast.error("Access denied: Only admins can log in here.");
          navigate('/login');
          return;
        }
      }

      // User login page - block admin users
      if (window.location.pathname === '/login') {
        if (loggedInUser.role !== 'user') {
          toast.error("Access denied: Only regular users can log in here.");
          navigate('/admin/login');
          return;
        }
      }

      // Valid login, set auth and redirect
      setToken(authToken);
      setUser(loggedInUser);
      localStorage.setItem("authToken", authToken);

      toast.success(res?.data?.message || "Login successful");

      // Redirect based on role
      if (loggedInUser.role === 'admin') {
        navigate('/admin');
      } else if (loggedInUser.role === 'user') {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  


  const UserProfileGet = async () => {
    try {
      const res = await axiosHandler.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res?.data.user);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setAuthLoading(false); // mark loading as complete
    }
  };


  const UserLogout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    navigate("/login");

  };
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && !token) {
      setToken(storedToken); // will trigger another useEffect to call UserProfileGet
    } else {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      UserProfileGet();
    }
  }, [token]);
  



  return (
    <AuthContext.Provider value={{ token, user, UserRegister, UserLogin, UserLogout, authLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
