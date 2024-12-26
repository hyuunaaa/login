// config-overrides.js
const webpack = require('webpack');
const fs = require('fs');
const dotenv = require('dotenv');

module.exports = function override(config, env) {
  console.log('🚀 Webpack Override 실행됨!');
  console.log('🌍 현재 환경(env):', env);

  let envVars = {};

  if (env === 'development') {
    console.log('🛠️ 개발 환경 감지됨, .env-dev 파일을 로드합니다.');
    envVars = dotenv.parse(fs.readFileSync('.env-dev'));
  } else if (env === 'production') {
    console.log('📦 프로덕션 환경 감지됨, .env-prod 파일을 로드합니다.');
    envVars = dotenv.parse(fs.readFileSync('.env-prod'));
  } else {
    console.warn('⚠️ 알 수 없는 환경:', env);
  }

  console.log('📑 로드된 환경 변수:', envVars);

  const envKeys = Object.keys(envVars).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
    return prev;
  }, {});

  console.log('🔑 Webpack DefinePlugin으로 주입된 환경 변수:', envKeys);

  config.plugins.push(new webpack.DefinePlugin(envKeys));

  console.log('✅ Webpack 설정이 성공적으로 수정되었습니다.');
  return config;
};
