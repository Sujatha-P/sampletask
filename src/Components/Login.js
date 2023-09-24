import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ContextApp } from "../Contextprovider/Contextapi";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const useObj = useContext(ContextApp);
 const history = useHistory()

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    alert(username + "/" + password);
    useObj.login(username);
    history.push("/task")
   
  }

  return (
    <div className="border shadow p-3 m-3 m-auto w-50">
      <h3 className="text-center">Login page</h3>
      <div className="p-1">
        Username:
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={handleUsername}
        />
      </div>
      <div className="p-1">
        Password:
        <input
          type="text" 
          className="form-control"
          value={password}
          onChange={handlePassword}
        />
      </div>
      <div className="mt-3 p-1">
        <button className="btn btn-primary" onClick={onSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}
