# hairshop-frontend
springboot + react.js 미용실 예약 프로젝트

# 개발 인원
1명(개인 프로젝트)

# 개발 기간
2021.08.06 ~ 2021.09.13 (진행중)

# 핵심 기능
+ 로그인, 회원가입 기능(Spring Security + JWT)
+ 소식, 커뮤니티(페이징 처리)
+ 매장 검색(Hateoas 적용)

+ 매니저(ROLE_MANAGER)
  + 매장 등록, 시술 등록
  + 시술 기록 등록
  + 예약 내역 확인

+ 유저(ROLE_USER)
  + 시술 예약, 취소, 리뷰 등록
  + 시술 기록 조회
  + 다음 예약, 마감시간 고려하여 시술 가능한 예약만 활성화

+ 관리자(ROLE_ADMIN)
  + 소식 게시판 메뉴

# 개발 환경
+ 개발환경 : Windows 10
+ 개발도구 : sts4, vscode
+ 구성환경 : Springboot, Spring Security, jwt, JPA, Oracle, React.js

# 실행 스크린 샷
![메인화면](https://user-images.githubusercontent.com/72675366/133052441-794aad23-b0a9-48ba-b781-01286d120f6b.png)
메인 페이지-유저


![메인화면-매니저](https://user-images.githubusercontent.com/72675366/133053363-6dfcc9b4-8727-4d18-b97d-97bc2d20e9e6.png)
메인 페이지-매니저


![매장 상세페이지](https://user-images.githubusercontent.com/72675366/133053444-84d1d12d-e230-42fa-ab1e-9766246c9e9c.png)
매장 상세 페이지


![예약화면](https://user-images.githubusercontent.com/72675366/133053482-4a03f45f-ba06-47fb-ba91-a1d993fd6210.png)
예약화면


![예약 상세내역](https://user-images.githubusercontent.com/72675366/133053526-f0b1c617-7d6f-4e2f-b054-63a95d9edfec.png)
예약 상세내역


![내정보화면](https://user-images.githubusercontent.com/72675366/133053556-5f2febc0-1914-4910-8f29-1ca02375a639.png)
유저 페이지

