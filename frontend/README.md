# 프론트
이 페이지는 빌드하기전 저희가 코드를 짜고 테스트 해보는 파일 입니다.

## 파일 구조
```
├─public -> 이미지를 저장하는 공간입니다.
└─src
    ├─app
    │  └─dashboard -> 기본으로 생성된 폴더
    ├─assets 
    ├─components -> shadcn 디자인 파일모음 폴더
    │  └─ui 
    ├─hooks -> 내가 원하는 기능을 동작하기 위한 폴더
    ├─lib -> 기본 설정 파일
    ├─Part_compomnet
    │  ├─Auth
    │  ├─board -> 게시판관련 폴더
    │  │  ├─board-part -> 게시판 관련 부속 컴포넌트 보관 
    │  │  ├─board-view -> 게시판을 보는 페이지 파일 보관
    │  │  └─board-write -> 게시판(건의사항)을 작성 할수 있는 페이지 파일 보관
    │  ├─common parts -> 공용 컴포넌트가 저장되어 있습
    │  ├─DashBoard -> 대시보드
    │  │  ├─Admin -> 관리자만 볼수 있는 페이지 전용
    │  │  └─Part -> 대시보드에서 컴포넌트 분리해서 보관
    │  ├─Mainpage -> 메인페이지
    │  │  └─part
    │  └─Server application
    └─store -> jotai 상태라이브러리 기본 파일모음 폴더
```

## 개발해보기
1. npm 라이브러리 설치 -> npm i
2. npm run build 후 localhost:port/site 로 들어가기
