import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTicketAlt, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  const [currentUser, setCurrentUser] = useState(null); // 사용자 정보
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴 열림 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 확인
  const navigate = useNavigate();

  // ✅ 로그인 상태 확인
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    setCurrentUser(storedUser || null);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ✅ 스크롤 이벤트
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  // ✅ 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);

    alert('로그아웃이 완료되었습니다.');
    navigate('/signin');
    window.location.reload();
  };

  // ✅ 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ✅ 스타일 설정
  const styles = {
    userHighlight: {
      fontWeight: 'bold',
      color: '#fff',
      padding: '4px 8px',
      display: 'inline-block',
      textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
      backdropFilter: 'blur(4px)',
    },
  };

  return (
    <div id="container">
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* 로고 */}
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

        {/* 사용자 정보 및 로그아웃 버튼 */}
        <div className="header-right">
          {isAuthenticated && currentUser ? (
            <>
              {/* 사용자 이름 표시 */}
              <span style={styles.userHighlight}>
                {currentUser.split('@')[0]}님
              </span>

              {/* 로그아웃 버튼 */}
              <button className="icon-button logout-button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>로그아웃</span>
              </button>
            </>
          ) : (
            <button className="icon-button" onClick={() => navigate('/signin')}>
              <FontAwesomeIcon icon={faUser} />
              <span>로그인</span>
            </button>
          )}

          {/* 모바일 메뉴 버튼 */}
          <button className="icon-button mobile-menu-button" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
