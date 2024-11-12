# 이 프로젝트가 뭐지?
<img src="https://github.com/user-attachments/assets/e8a88537-7efc-42e2-9856-b7f6a3b3b6ef" style="width: 200px; height: 200px">

이번에 웹서버 괴목에서 기말과제를 프로젝트 형식으로 하는데 우리 웹서버에는 PHP를 이용서 공부를 한다.<br/>
하지만 나는 PHP를 쓰기 싫어서 php위에 프론트단에서는 Vue를 쓰기로 했다.<br/>
백엔드는 그래도 PHP는 써야되기 때문에 php + mysql을 쓰기로 했다 아마도?

## 쓰게될 프레임워크 및 CSS, DB


## 파일폴더 구조
```
Project
  └─ app -> php단에서 작동하는 파일 모음
  └─ assets -> Vue 필드하면 나오는 파일
  └─ frontend -> vue파일이 집합하여 있는곳
  └─ public -> 사이트에 보여주기 위해 있는 곳
  └─ system -> 직접 건드는건 없습
  └─ test -> 테스트 관련 파일 
  └─ writable
... 등등
```

## 우리가 주로 만질 파일 구조 (App내부)

```
├── Common.php
├── Config -> 설정해주는곳
│   ├── App.php
│   ├── Autoload.php
│   ├── Boot
│   ├── CURLRequest.php
│   ├── Cache.php
│   ├── Constants.php
│   ├── ContentSecurityPolicy.php
│   ├── Cookie.php
│   ├── Cors.php
│   ├── Database.php -> 기초적인 데이터베이스 설정 하는곳
│   ├── DocTypes.php
│   ├── Email.php
│   ├── Encryption.php
│   ├── Events.php
│   ├── Exceptions.php
│   ├── Feature.php
│   ├── Filters.php
│   ├── ForeignCharacters.php
│   ├── Format.php
│   ├── Generators.php
│   ├── Honeypot.php
│   ├── Images.php
│   ├── Kint.php
│   ├── Logger.php
│   ├── Migrations.php
│   ├── Mimes.php
│   ├── Modules.php
│   ├── Optimize.php
│   ├── Pager.php
│   ├── Paths.php
│   ├── Publisher.php
│   ├── Routes.php -> 해당 파라미터가 어디 클래스로 이어지는지 결정해준다.
│   ├── Routing.php
│   ├── Security.php
│   ├── Services.php
│   ├── Session.php
│   ├── Toolbar.php
│   ├── UserAgents.php
│   ├── Validation.php
│   └── View.php
├── Controllers -> 각 파일명과 클래스명과 일치하여 Routes.php에서 클래스 이름을 참조한다.
│   ├── BaseController.php 
│   ├── Home.php -> Vue 페이지 보여주는 PHP
│   └── TestDatabase.php -> 데이터베이스 연결되었는지 확인하는 PHP
├── Database
│   ├── Migrations
│   └── Seeds
├── Filters
├── Helpers
├── Language -> 국제적인 사이를 만들경우 Key value형식으로 번역본을 작성 할수 있습
│   └── en
│       └── Validation.php
├── Libraries
├── Models
├── ThirdParty
├── Views 
└── index.html
```
# 실행하는 방법

아래 링크를 이용해서 초기 준비를 해준다
> https://4sii.tistory.com/635