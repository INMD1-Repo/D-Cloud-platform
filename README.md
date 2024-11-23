# 이 프로젝트가 뭐지?
<img src="https://github.com/user-attachments/assets/e8a88537-7efc-42e2-9856-b7f6a3b3b6ef" style="width: 200px; height: 200px">

이번에 웹서버 괴목에서 기말과제를 프로젝트 형식으로 하는데 우리 웹서버에는 PHP를 이용서 공부를 한다.<br/>
하지만 나는 PHP를 쓰기 싫어서 php위에 프론트단에서는 Vue를 쓰기로 했다.<br/>
백엔드는 그래도 PHP는 써야되기 때문에 php + mysql을 쓰기로 했다 아마도?

## 쓰게될 프레임워크 및 CSS, DB
### PHP
근본 있는 웹 프레임워크

### MYSQL
근본 있는 DB

### React
자바스크립트, 타입스크립트를 지원하고 요즘 프론트엔드에서 많이 이는 프레임워크중 하나이다.

### Shadcn
tailwind기반으로 만들어진 UI 템블릿

## 파일폴더 구조
```
Project
  └─ api -> php단에서 작동하는 파일 모음
  └─ frontend -> REACT 개발 파일
  └─ public -> 약간 IC역할 하는곳
  └─ site -> REACT 빌드 파일 저장폴더
  └─ vender -> 직접 건드는건 없습
  └─.htaccess -> 아파이 설정
... 등등
```

# 패키지 설치
우리 시스템에서는 JWT를 사용하기 때문에 아래에 패키지를 설치해야합니다.

```
composer require firebase/php-jwt
composer require vlucas/phpdotenv
composer require saleh7/proxmox-ve_php_api
```
