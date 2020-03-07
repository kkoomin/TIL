# Heroku Deploy

## Heroku?

> Heroku is a hosting platform, which depends on Git (Distributed Version Control System) for deployment.

- 30분 이전에 접속 기록이 없으면 서버를 sleep 상태로 전환시켜 놓음.
- 무료 계정의 경우 접속 횟수 등의 제한이 있을 수 있으나, 토이 프로젝트용으로는 나쁘지 않음 👍

## How to start?

1. Heroku 홈페이지에서 회원가입 후 로그인

2. 대시보드 혹은 command line에서 로그인 확인

3. CLI 사용 설정

   - https://devcenter.heroku.com/articles/heroku-cli

   1. 운영체제에 맞는 설치를 한다.
   2. `heroku --version`으로 버전확인
   3. `heroku login` -> 웹페이지로 리다이렉트 되어서 로그인 과정을 거침
   4. 이제 프로젝트 올리자! Heroku에 맞는 Git 명령어를 써야한다!

4. `heroku create <프로젝트이름> --buildpack <패키지>`

   - 이 과정에서 `Git remote heroku added`라는 메세지를 확인할 수 있음.
   - `git remote -v`로도 heroku 확인 가능
   - buildpack: specific config for the build that we want
   - React를 static website로 올리고 싶다: `heroku create <프로젝트이름> --buildpack https://github.com/mars/create-react-app-buildpack.git`
   - https://github.com/mars/create-react-app-buildpack

5. `git push heroku master`

   - `heroku`는 우리의 프로젝트와 연결되어 있는 repo
   - `master`: master branch를 push 할 것!
   - remote repo인 `heroku`에 내 code나 app file을 push하는 커맨드

6) 입력하면 Push가 열심히 됩니다. 일해라 heroku!

   - Config, Optimize, Running Build 등이 되는 것을 확인할 수 있음

7) Released 이후에 `https://<프로젝트이름>.herokuapp.com/` 형식의 link 주소를 확인할 수 있음.

8) 이후 브라우저에서 링크로 접속해서 웹사이트 작동 확인

9) Github과 연동해서 master branch를 업데이트할 때마다 app이 다시 배포되게 하려면 ?
   - https://devcenter.heroku.com/articles/github-integration

### cf. Firebase Auth setting for new domain

1. Firebase 대시보드로 가서 Authentication - Sign-in Method 탭
2. 하단에서 Authorized domain 섹션에서 Add Domain에 heroku 주소 추가

## Optimizing Production Build

1. `redux-logger`같은 dev용 middleware 배포 이후엔 콘솔에 안나와야합니다. 그져?
2. `process.env.NODE_ENV === "development"` 일 때만 middleware 목록에 logger를 넣고 실행하도록 설정. (if문으로)
   - `NODE_ENV`: 직접 설정하거나 heroku가 설정하는 노드 환경 변수
   - `create-react-app`같은 경우 "development", "production", "test"로 설정되어있음.
3. 배포를 할 때, 즉 `npm build`나 `yarn build`를 하게 되면 이 환경 변수가 "production"으로 변함.
   - `npm start`나 `yarn start`일 때는 이 환경 변수가 "development"로 설정됨.
4. 이러한 설정을 변경하고 나면 `git add .`, `git commit -m "내용"`, `git push heroku master`로 다시 redeploy (이 과정에서 NODE_ENV가 설정되는 메세지를 확인할 수 있음)
