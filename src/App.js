import React, { useEffect } from 'react';

import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import SigninPage from './pages/Signin/Signin'; // 정확한 경로
import HomePopular from './views/Home/HomePopular/HomePopular';
import Home from './views/Home/Home';
import HomeWishlist from './views/Home/HomeWishlist/HomeWishlist';
import HomeSearch from './views/Search/HomeSearch';



const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
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
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>

        {/* Home.js로 중첩 라우팅 */}
        <Route path="/home" element={<Home />}>
          <Route path="popular" element={<HomePopular />} />
          <Route path="search" element={<HomeSearch />} />
          <Route path="wishlist" element={<HomeWishlist />} />
        </Route>

        <Route path="/signin" element={<SigninPage />} /> {/* 로그인/회원가입 */}
      </Routes>
    </div>
  );
}

export default App;
