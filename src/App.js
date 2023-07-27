import "./App.css";
import GradePage from "./Pages/GradePage";
import GraduationPage from "./Pages/GraduationPage";
import ActiviPage from "./Pages/ActiviPage";
import MainPage from "./Pages/MainPage";
import BlogPage from "./Pages/BlogPage";
import LoginPage from "./Pages/LoginPage";
import { Route, Routes } from "react-router-dom";

function App() {
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
}

export default App;
