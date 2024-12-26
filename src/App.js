import React, { useEffect } from 'react';
import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

// 공통 컴포넌트
import Footer from './components/Footer';
import Nav from './components/Nav';

// 페이지 컴포넌트
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import SigninPage from './pages/Signin/Signin';

// Home 관련 페이지
import HomePopular from './views/Home/HomePopular/HomePopular';
import Home from './views/Home/Home';
import HomeWishlist from './views/Home/HomeWishlist/HomeWishlist';
import HomeSearch from './views/Search/HomeSearch';

// 레이아웃 컴포넌트
const Layout = () => (
  <div>
    <Header /> {/* 🆕 모든 페이지에 Header 표시 */}
    <Nav />
    <Outlet />
    <Footer />
  </div>
);

// 🔑 보호된 라우팅 (로그인된 사용자만 접근 가능)
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
      console.log('[App.js] Kakao SDK init:', window.Kakao.isInitialized());
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* 🌍 공통 레이아웃 적용 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>

        {/* 🏠 Home 관련 라우팅 (보호된 라우트로 감싸기) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="popular" element={<HomePopular />} />
          <Route path="search" element={<HomeSearch />} />
          <Route path="wishlist" element={<HomeWishlist />} />
        </Route>

        {/* 🔑 로그인/회원가입 */}
        <Route path="/signin" element={<SigninPage />} />

        {/* 🛑 잘못된 경로 처리 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
