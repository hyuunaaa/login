import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTicketAlt, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/signin');
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
          {/* 로그아웃 버튼 */}
          <button className="icon-button logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>로그아웃</span>
          </button>

          {/* 사용자 아이콘 */}
          <button className="icon-button">
            <FontAwesomeIcon icon={faUser} />
          </button>

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
