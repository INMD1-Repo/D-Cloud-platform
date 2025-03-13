![image](https://github.com/user-attachments/assets/c40e1fcd-e1dd-4883-b4d0-42e75bf6933c)
# 이 프로젝트가 뭐지?(발단)
<img src="https://github.com/user-attachments/assets/e8a88537-7efc-42e2-9856-b7f6a3b3b6ef" style="width: 200px; height: 200px">

이번에 웹서버 괴목에서 기말과제를 프로젝트 형식으로 하는데 우리 웹서버에는 PHP를 이용서 공부를 한다.<br/>
하지만 나는 PHP를 쓰기 싫어서 php위에 프론트단에서는 React를 쓰기로 했다.<br/>
백엔드는 그래도 PHP는 써야되기 때문에 php + mysql을 쓰기로 했다 아마도?

# 프로젝트 설명
제가 운영하고 클라우드 동아리에서 쉽게 운영하기 위한 시스템솔류션을 개발하고 있습니다.<br/>
해당 솔류션은 Proxmox API를 바탕으로 제작하고 주요 기능은 공지사항,서버신청이 있습니다.

# 작동 흐름도
![image](https://github.com/user-attachments/assets/186ab4e5-d7c4-4429-82cb-e2ce2ec595cb)


# 개발인원
```
이호준
[백엔드,프론트 개발 및 팀장]

강신혁
[간단한 백엔드 작성]

정재록
[문서작성]
```

## 쓰게될 프레임워크 및 CSS, DB
### PHP
근본 있는 웹 프레임워크

### MYSQL
근본 있는 DB

### React
자바스크립트, 타입스크립트를 지원하고 요즘 프론트엔드에서 많이 이는 프레임워크중 하나이다.

### Shadcn
tailwind기반으로 만들어진 UI 템블릿
> 자세한 기술스택이나 과정을 볼려면 `Frontend`, `api`파일에 가서 봐주세요!
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

# 직접 사용하기
### 아파치
아파치 같은 경우 내부에 htdocs라는 아파치 설정파일이 있어서 그냥 사용하시면 됨니다

### nginx
nginx는 아래에 예시 문을참고해서 리버스 프록시 해주시기 바람니다.

```conf
...생락
    root /var/www/ASW-PSMT;
    index index.html index.php;
    # React 정적 파일 경로 처리
    location /assets/ {
        alias /var/www/ASW-PSMT/site/assets/;
    }
    location /images/ {
        alias /var/www/ASW-PSMT/site/images/;
    }
    # PHP 파일 요청 처리
    location / {
        try_files $uri $uri/ /public/index.php$is_args$args;
        # CORS 설정
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, DELETE, PUT';
        add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';
    }
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
        # PHP 요청에도 CORS 적용
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, DELETE, PUT';
        add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';
    }
    location /.well-known/acme-challenge {
        proxy_set_header Host $host;
        proxy_set_header X-Real_IP $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr:$remote_port;
        proxy_pass http://127.0.0.1:9180;
    }
...생락
```
