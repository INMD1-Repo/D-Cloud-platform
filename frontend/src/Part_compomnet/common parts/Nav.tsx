import { Button } from "@/components/ui/button";
import { login_Count, User_info, Access_jwt } from "@/store/strore_data";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { toast, ToastContainer } from "react-toastify";

interface UserInfo {
  name: string;
}

function Topnav() {
  const navigate = useNavigate();
  const [logCount, setlogCount] = useAtom(login_Count);
  const [Accessjwt, setAccessjwt] = useAtom(Access_jwt);
  const [userinfo, setUserInfo] = useAtom(User_info);

  //@ts-ignore
  const userinfod: UserInfo = userinfo;
  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //@ts-ignore
        token: Accessjwt.Access,
      }),
    }).then((response) => {
      if (response.status == 200) {
        setUserInfo({});
        setlogCount(0);
        setAccessjwt({});
        navigate("/site");
      }
    });
  }

  async function retoken() {
    //토큰 재발급
    await fetch("/api/department?type=token_fresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //@ts-ignore
        token: Accessjwt.Access,
      }),
    }).then((response) => {
      setAccessjwt(response.json());
    });
  }

  useEffect(() => {
    async function api() {
      let status = 0;
      await fetch("/api/department?type=infoUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //@ts-ignore
          token: Accessjwt.Access,
        }),
      }).then((response) => {
        status = response.status;
        setUserInfo(response.json());
        if (response.status != 200) {
          retoken();
        }
      });
      return status;
    }

    async function checklogin() {
      if (logCount == 1) {
        //기본적으로 한번 조회함
        const data_status_code = await api();
        //토큰으로 유저 데이터를 못불려오면 토큰 재발행후 재실행
        //@ts-ignore
        console.log(data_status_code);
        if (data_status_code != 200) {
          // //그래도 안될 경우 로그아웃 처리하고 다시 로그인 해달라고 재요청
          toast.error("토큰이 만료되었습니다. 다시 로그인 해주시기 바람니다.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          setTimeout(() => {
            logout();
          }, 1000);
        }
      }
    }
    checklogin();
  }, []);

  return (
    <>
      <header>
        <div className="flex justify-between m-4 lg:m-0">
          {/* 로고 입력부분 */}
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              navigate("/site/");
            }}
          >
            <img
              className="rounded-md lg:w-20 lg:h-20  w-10 h-10"
              src="./image/161593018.png"
              alt=""
            />
            <div className="w-3"></div>
            <p className="title">D Cloud Platform</p>
          </div>
          {/* 로고 입력부분 */}
          <div className="flex">
            {logCount === 1 ? (
              <div>
                <div className="mobile_none">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div
                        className="mr-10"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Avatar className="w-[auto] h-[4vh]">
                          <AvatarImage src="./image/Windows-10-user-icon-big.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        ㅤ
                        <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                          {userinfod.name}님
                        </p>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          navigate("/site/dashboard");
                        }}
                      >
                        대시보드 이동
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          navigate("/site/server/show_Accpet");
                        }}
                      >
                        서버신청 현황
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          logout();
                        }}
                      >
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="pc_none">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="pc_none">
                        <AvatarImage src="./image/Windows-10-user-icon-big.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-8">
                      {/* //@ts-ignore */}
                      <DropdownMenuLabel>
                        환영합니다. <br /> {userinfod.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          navigate("/site/dashboard");
                        }}
                      >
                        대시보드 이동
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          navigate("/site/server/show_Accpet");
                        }}
                      >
                        서버신청 현황
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          logout();
                        }}
                      >
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              <Button
                className="mobile_none h-16 w-40"
                onClick={() => {
                  navigate("/site/auth_prcess");
                }}
              >
                <p style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                  회원가입/로그인
                </p>
              </Button>
            )}
            <div className="ml-5">
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
      <ToastContainer />
    </>
  );
}

export default Topnav;
