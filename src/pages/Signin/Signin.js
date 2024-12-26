// src/pages/Signin/Signin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';

function SignIn() {
  const { handleLogin, handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  // ✅ 상태 관리
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [message, setMessage] = useState("");

  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = 'http://localhost:3001/signin';
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakao_api = process.env.REACT_APP_KAKAO_API_KEY;

  const initializeKakao = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakao_api); // 카카오에서 제공받은 JavaScript Key를 입력
    }
  };

  const handleKakaoLogin = () => {
    initializeKakao();

    window.Kakao.Auth.login({
      scope: "profile_nickname",
      success: (authObj) => {
        console.log("Kakao 로그인 성공!!", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            console.log("Kakao API response", res);
            const nickname = res.kakao_account.profile.nickname;
            console.log("Welcome, ", nickname);
            setMessage(`Welcome, ${nickname}!`);
            //onLogin(nickname);
            navigate("/", { replace: true });
          },
          fail: (err) => {
            console.error("Kakao API request failed", err);
            alert("Kakao API 호출에 실패했습니다.");
            setMessage("Failed to retrieve user information.");
          },
        });
      },
      fail: (err) => {
        console.error("Kakao 로그인 실패!!", err);
        alert("Kakao 로그인 실패!! 네트워크 상태를 확인해주세요.");
        setMessage("Kakao 로그인 실패!! 네트워크 상태를 확인해주세요.");
      },
    });
  };

  // ✅ 카카오 로그인 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      axios
        .post(
          'https://kauth.kakao.com/oauth/token',
          new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code,
          }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          }
        )
        .then((response) => {
          const { access_token } = response.data;
          localStorage.setItem('kakaoToken', access_token);
          getUserInfo(access_token);
        })
        .catch((error) => {
          console.error('Kakao Token Error:', error);
          toast.error('Kakao 로그인 실패');
        });
    }
  }, []);

  const getUserInfo = (token) => {
    axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Kakao User Info:', response.data);
        toast.success(`환영합니다, ${response.data.properties.nickname}!`);
        navigate('/');
      })
      .catch((error) => {
        console.error('Kakao User Info Error:', error);
        toast.error('사용자 정보를 불러오는데 실패했습니다.');
      });
  };

  // ✅ 로그인 폼 제출
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      toast.success('로그인에 성공했습니다!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || '로그인에 실패했습니다.');
    }
  };

  // ✅ 회원가입 폼 제출
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerPassword !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await handleRegister(registerEmail, registerPassword);
      toast.success('회원가입에 성공했습니다! 로그인 해주세요.');
      toggleCard();
    } catch (err) {
      toast.error(err.message || '회원가입에 실패했습니다.');
    }
  };

  // ✅ 화면 전환
  const toggleCard = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  return (
    <div className="bg-image">
      <div className="container">
        <div className="card-container">
          {/* ✅ 로그인 화면 */}
          <div className={`card login-card ${isLoginVisible ? 'active' : 'hidden'}`}>
            <h1>Sign In</h1>
            <form onSubmit={handleLoginSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="button-group">
                <button type="submit" className="login-btn">
                  Login
                </button>
                <button
                  type="button"
                  className="kakao-login-btn"
                  onClick={handleKakaoLogin}
                >
                  Login with Kakao
                </button>
              </div>
            </form>
            <div className="toggle-section">
              Don't have an account?{' '}
              <span onClick={toggleCard}>Sign Up</span>
            </div>
          </div>

          {/* ✅ 회원가입 화면 */}
          <div className={`card signup-card ${isLoginVisible ? 'hidden' : 'active'}`}>
            <h1>Sign Up</h1>
            <form onSubmit={handleRegisterSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button type="submit" className="signup-btn">
                Register
              </button>
            </form>
            <div className="toggle-section">
              Already have an account?{' '}
              <span onClick={toggleCard}>Sign In</span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
