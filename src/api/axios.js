// axios.js
import axios from "axios";

// API 키가 환경 변수에서 올바르게 주입되었는지 확인
console.log('🔑 API Key:', process.env.REACT_APP_TMDB_API_KEY);

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY, // config-overrides.js에서 주입된 값 사용
    language: "ko-KR",
  },
});

export default instance;


/*
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
    language: "ko-KR",
  },
});

export default instance;
*/