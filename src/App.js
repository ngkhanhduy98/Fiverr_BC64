import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeTemplate from "./template/HomeTemplate";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AuthTemplate from "./template/AuthTemplate";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import Categories from "./pages/Categories/Caregories";
import Works from "./pages/Works/Works";
import WorkDetail from "./pages/WorkDetail/WorkDetail";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./template/AdminTemplate";
import UserManage from "./pages/AdminPage/UserManage";
import JobManage from "./pages/AdminPage/JobManage/JobManage";
import CategoriesManage from "./pages/AdminPage/CategoriesManage/CategoriesManage";
import DetailCategoriesManage from "./pages/AdminPage/DetailCategoriesManage/DetailCategoriesManage";
import JobRetailManage from "./pages/AdminPage/ServicesManage/JobRetailManage/JobRetailManage";
import CommentManage from "./pages/AdminPage/ServicesManage/CommentManage/CommentManage";
import CheckUser from "./pages/HOC/CheckUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="categories/:idLoaiCongViec" element={<Categories />} />
          <Route path="works/:idNhomCongViec" element={<Works />} />
          <Route path="works/detail/:idCongViec" element={<WorkDetail />} />

          <Route
            path="profile"
            element={
              <CheckUser>
                <Profile />
              </CheckUser>
            }
          />
        </Route>
        <Route path="auth" element={<AuthTemplate />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
        </Route>
        <Route path="admin" element={<AdminTemplate />}>
          <Route index element={<UserManage />} />
          <Route path="jobmanage" element={<JobManage />} />
          <Route path="categoriesmanage" element={<CategoriesManage />} />
          <Route
            path="detailcategoriesmanage"
            element={<DetailCategoriesManage />}
          />
          <Route path="jobretailmanage" element={<JobRetailManage />} />
          <Route path="commentmanage" element={<CommentManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
