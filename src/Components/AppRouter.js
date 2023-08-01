import { Route, Routes } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import GradePage from "../Pages/GradePage";
import ActiviPage from "../Pages/ActiviPage";
import GraduationPage from "../Pages/GraduationPage";
import BlogPage from "../Pages/BlogPage";
import LoginPage from "../Pages/LoginPage";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="grade" element={<GradePage />} />
        <Route path="activity" element={<ActiviPage />} />
        <Route path="graduation" element={<GraduationPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
