import { useState, useEffect } from "react";
import "./App.css";
import AppRouter from "./Components/AppRouter";
import { authService } from "./fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* ------------ 유저 유무 판별 ------------ */
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initailizing..."}</>
  );
}

export default App;
