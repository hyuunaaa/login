import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTicketAlt, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(storedUser); 
      //const userKey = getUserKey(storedUser); 
      //const storedSearches = JSON.parse(localStorage.getItem(userKey)) || [];
      //setRecentSearches(storedSearches);
    } else {
      setCurrentUser("Error#1");
    }    

    console.log("===>>>>>>>", storedUser)
    console.log("===>>>>>>>", currentUser)

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const styles = {
    userHighlight: {
      fontWeight: "bold",     // 글자 굵기
      backgroundColor: "yellow", // 노란 배경
      color: "black",         // 검정 글자
      padding: "4px 8px",     // 내부 여백
      borderRadius: "4px",    // 모서리 둥글게
      display: "inline-block", // 인라인 블록 요소
      marginRight: "4px",     // 오른쪽 간격 추가
    },
    inlineText: {
      fontWeight: "bold",     // 글자 굵기
      backgroundColor: "yellow", // 노란 배경
      color: "black",         // 검정 글자
      padding: "4px 8px",     // 내부 여백
      borderRadius: "4px",    // 모서리 둥글게
      display: "inline-block", // 인라인 블록 요소
      marginLeft: "4px",      // 왼쪽 간격 추가
    }
  };

  const handleLogout = () => {
    /*
    const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${
      process.env.REACT_APP_KAKAO_API_KEY
    }&logout_redirect_uri=${encodeURIComponent(
      process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URI
    )}`;
    console.log("KAKAO_LOGOUT_REDIRECT_URI:", process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URI);
*/
    localStorage.removeItem("isAuthenticated"); 
    localStorage.removeItem("currentUser"); 
    localStorage.removeItem("userPassword");

    setCurrentUser(null); 

    //window.location.href = kakaoLogoutUrl;

    alert("로그아웃이 완료되었습니다."); 
    navigate("/signin"); 
    window.location.reload(); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  return (
    <div id="container">
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-left">
          <div className="logo">
            <Link to="/">
              <FontAwesomeIcon icon={faTicketAlt} style={{ height: '100%', color: '#E50914' }} />
            </Link>
          </div>
          <nav className="nav-links desktop-nav">
            <ul>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/popular">대세 콘텐츠</Link></li>
              <li><Link to="/wishlist">내가 찜한 리스트</Link></li>
              <li><Link to="/search">찾아보기</Link></li>
            </ul>
          </nav>
        </div>
        
        {/* 우측 상단 아이콘 및 로그아웃 버튼 */}
        <div className="header-right">
          {currentUser && (
            <>
              <span style={styles.userHighlight}>
                {currentUser.split("@")[0]} 
              </span>
              <p style={styles.inlineText}> 님</p>
            </>
          )}          
          {/* 로그아웃 버튼 */}
          <button className="icon-button logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>로그아웃</span>
          </button>

          {/* 사용자 아이콘 
          <button className="icon-button">
            <FontAwesomeIcon icon={faUser} />
          </button>
          */}

          {/* 모바일 메뉴 버튼 */}
          <button className="icon-button mobile-menu-button" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>

      {/* 모바일 네비게이션 */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu}>홈</Link></li>
            <li><Link to="/popular" onClick={toggleMobileMenu}>대세 콘텐츠</Link></li>
            <li><Link to="/wishlist" onClick={toggleMobileMenu}>내가 찜한 리스트</Link></li>
            <li><Link to="/search" onClick={toggleMobileMenu}>찾아보기</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
