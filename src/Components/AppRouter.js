import { Route, Routes } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import GradePage from "../Pages/GradePage";
import ActiviPage from "../Pages/ActiviPage";
import GraduationPage from "../Pages/GraduationPage";
import BlogPage from "../Pages/BlogPage";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<MainPage userObj={userObj} />} />
            <Route path="grade" element={<GradePage />} />
            <Route path="activity" element={<ActiviPage />} />
            <Route path="graduation" element={<GraduationPage />} />
            <Route path="blog" element={<BlogPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage userObj={userObj} />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
