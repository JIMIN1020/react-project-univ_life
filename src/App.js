import { useState, useEffect } from "react";
import "./App.css";
import AppRouter from "./Components/AppRouter";
import { authService } from "./fbase";
import LoadingPage from "./Pages/LoadingPage";

function App() {
  const [userObj, setUserObj] = useState(null);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* ------------ 유저 유무 판별 ------------ */
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default App;
