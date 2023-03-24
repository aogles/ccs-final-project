import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [isStaff, setIsStaff] = useState(null);
  const navigate = useNavigate();
  const handleError = (err) => {
    console.warn(err);
  };

  const login = async (user) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not ok!");
    }
    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    setIsAuth(true);
    setIsStaff(data.is_staff);
    navigate("/convoys");
  };

  const registration = async (user) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not ok!");
    }
    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    setIsAuth(true);
    setIsStaff(data.is_staff);
    navigate("/");
  };

  const logout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    Cookies.remove("Authorization", `Token ${data.key}`);

    setIsAuth(false);
    navigate("/login");
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/dj-rest-auth/user/");

      if (!response.ok) {
        setIsAuth(false);
        setIsStaff(false);
        return;
      }
      const data = await response.json();

      setIsAuth(true);
      setIsStaff(data.is_staff);
    };

    getUser();
  }, []);

  if (isAuth === null) {
    return <div>Is loading ...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuth, login, registration, logout, isStaff }}
    >
      {children}
    </AuthContext.Provider>
  );
};
