# SubscribeForYou

### 작동법

#### 백엔드

- 가상환경 생성 및 실행
- cd backend
- pip install -r requirements.txt
- python manage.py runserver

#### 프론트엔드

- cd frontend
- npm install
- npm start

---

# 구조 개선

- api 호출
  -> utils/api.js에서 관리

- 이벤트 함수, 전역 상태 통합 관리
  -> 실행 후 다른 이벤트가 필요없는 함수(ex. 삭제)는 utils/SubscribeService.js 에서 생성하여 props로 내려줌

- /container 삭제
  -> 불필요한 단계 삭제, routes/HomeRoute.js에서 메인페이지 관리

- redux-thunk 삭제
  -> redux-saga로 대체
- 상수 관리
  -> constants에서 각각에 맞는 파일로 분리하여 관리
