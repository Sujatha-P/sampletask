import { createContext, useState } from "react";

export const ContextApp = createContext({
  username: "",
  login: (username) => {}
});

const ContextappProvider = (props) => {
  const [username, setUsername] = useState("");

  function login(username) {
    setUsername(username);
  }
  return (
    <ContextApp.Provider value={{ username, login }}>
      {props.children}
    </ContextApp.Provider>
  );
};
export default ContextappProvider;
