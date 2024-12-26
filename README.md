#Login


#실행
## npm run start(.env-dev 사용)
```c
> WSD-4@0.1.0 start
> react-app-rewired start

🚀 Webpack Override 실행됨!
🌍 현재 환경(env): development
🛠️ 개발 환경 감지됨, .env-dev 파일을 로드합니다.
📑 로드된 환경 변수: {
  REACT_APP_IP_ADDRESS: 'localhost',
  REACT_APP_PORT: '3000',
  REACT_APP_TMDB_API_KEY: 'f72c49626a88a15c7088bd092fcad0bc',
  REACT_APP_KAKAO_API_KEY: '36fec796d0592c3e09983fd2dbc0506d'
}
🔑 Webpack DefinePlugin으로 주입된 환경 변수: {
  'process.env.REACT_APP_IP_ADDRESS': '"localhost"',
  'process.env.REACT_APP_PORT': '"3000"',
  'process.env.REACT_APP_TMDB_API_KEY': '"f72c49626a88a15c7088bd092fcad0bc"',
  'process.env.REACT_APP_KAKAO_API_KEY': '"36fec796d0592c3e09983fd2dbc0506d"'
```

## npm run build(.env-prod 사용)
```c
npm run build

> WSD-4@0.1.0 build
> react-app-rewired build

🚀 Webpack Override 실행됨!
🌍 현재 환경(env): production
📦 프로덕션 환경 감지됨, .env-prod 파일을 로드합니다.
📑 로드된 환경 변수: {
  REACT_APP_IP_ADDRESS: 'production-server-ip',
  REACT_APP_PORT: '80',
  REACT_APP_TMDB_API_KEY: 'f72c49626a88a15c7088bd092fcad0bc',
  REACT_APP_KAKAO_API_KEY: '36fec796d0592c3e09983fd2dbc0506d'
}
🔑 Webpack DefinePlugin으로 주입된 환경 변수: {
  'process.env.REACT_APP_IP_ADDRESS': '"production-server-ip"',
  'process.env.REACT_APP_PORT': '"80"',
  'process.env.REACT_APP_TMDB_API_KEY': '"f72c49626a88a15c7088bd092fcad0bc"',
  'process.env.REACT_APP_KAKAO_API_KEY': '"36fec796d0592c3e09983fd2dbc0506d"'
}
✅ Webpack 설정이 성공적으로 수정되었습니다.
Creating an optimized production build...
Compiled with warnings.

[eslint] 
src/components/MovieGrid/MovieGrid.js

```