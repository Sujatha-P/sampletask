import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Login from "./Components/Login";
import { ContextApp } from "./Contextprovider/Contextapi";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Switch, Link } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Task from "./Components/Task";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const login = () => {
    setIsLoggedIn(true);
  };


  const logout = () => {
    setIsLoggedIn(false);
    history.push("/");
  };

  const toggleAuth = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login();
    }
  };

  const user = useContext(ContextApp);

  return (
    <>
      <div>
        {isLoggedIn ? (
          <div>
            <p>Welcome, User!</p>
            <button onClick={toggleAuth}>Logout</button>
          </div>
        ) : (
          <div>
            <p>Please log in</p>
            <button onClick={toggleAuth}>
              <Link to="/login">Login</Link>
            </button>
          </div>
        )}
      </div>
      <div>
        <div className="App">
          {user.username && (
            <div className="sidebar">
              <Switch>
                <Route path="/task">
                  <Task />
                </Route>
              </Switch>
            </div>
          )}
        </div>
        <div className={user.username ? "main-body" : "main-body w-100"}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}
