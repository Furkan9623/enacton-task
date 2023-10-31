import { createContext, useState, useEffect } from "react";

const loginContext = createContext(null);

const ContextProvider = ({ children }) => {
  const presistUser =
    localStorage.getItem("loginAuth") === "true" ? true : false;
  const [loginAuth, setLoginAuth] = useState(presistUser);

  useEffect(() => {
    localStorage.setItem("loginAuth", loginAuth);
  }, [loginAuth]);
  return (
    <loginContext.Provider value={{ loginAuth, setLoginAuth }}>
      {children}
    </loginContext.Provider>
  );
};

export { ContextProvider, loginContext };
