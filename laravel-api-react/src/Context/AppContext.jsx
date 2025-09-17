import { Children, createContext, useEffect, useState } from "react";

// allows us to expose any data we want to the children aka app
export const AppContext = createContext();

export default function AppProvider({ children }) {
  //  default value of token useState(localStorage.getItem('token'))
  const [token, setToken] = useState(localStorage.getItem("token"));
  // const [user, setUser] = useState({});
  const [user, setUser] = useState(null);

  async function getUser() {
    const res = await fetch("/api/user", {
      headers: {
        // Authorization: "",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data);
    }

    // setUser(data);
    // console.log(data);
  }

  // call getUser() when starting app and when the token is updated
  // wee dont want to run the use effect and waste a api call if the token doesnt exists
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    // you can hard code it to see how it works.
    // <AppContext.Provider value={{'name': "Jon"}}>
    // currently everything is happening from here.
    // expose all of these values to the application
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
