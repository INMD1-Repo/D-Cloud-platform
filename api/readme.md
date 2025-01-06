## 파일구조
```
.
├── Server
│   └── index.php -> 
├── auth
│   ├── department.php -> 유저조회 및 Auth관련 API함수 php
│   ├── login.php -> 로그인 php
│   ├── logout.php -> 로그아웃하는 php
│   └── signup.php -> 가입하는 php
├── board
│   ├── createPost.php -> 게시판 내용을 생성하는 php
│   └── readPost.php -> 게시판을 보기위한 php
├── index.php -> 라우팅 역할
└── proxmox
    └── index.php -> Proxmox에서 API를 불려오는 php파일

```

## 사용기술

### JWT
저희는 회원정보를 안전하게 보관하기 위해 JWT토큰을 발급을 해서 클라이언트에셔 키를 보내서 서버에서 유저 정보를 제공하는 형식으로 운영하고 있습니다.<br/>
그리고 JWT를 다른 방식으로 생각해서 데이터가 유출되지 않도록 하고 있습니다
> 후드에서 살아남기 제5장 ```적보다 한 발작 앞서 나갈 것``` [예아](https://www.youtube.com/watch?v=sHW26ysdVT4)

### Proxmox Rest API 
기존 서버에서 시용하고 있는 플랫폼에서 API을 이용해서 사용했습니다.

## 설치시 주위사항
관리자한데 서버 신청에 관한 기능을 개발했습니다. 이 기능 같우 경우 백그라운드에서 계속 작동해야 되기 때문에 아래에 코드를 실행 해야합니다

```
php -f auto_email_sender.php &
```