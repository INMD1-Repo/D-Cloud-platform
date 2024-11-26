import { Button } from '@/components/ui/button'
import { login_Count, User_info, Access_jwt } from '@/store/strore_data';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserInfo {
    name: string;
}

function Topnav() {

    const navigate = useNavigate();
    const [logCount, setlogCount] = useAtom(login_Count);
    const [Accessjwt, setAccessjwt] = useAtom(Access_jwt);
    const [userinfo, setUserInfo] = useAtom(User_info);

    //@ts-ignore
    const userinfod: UserInfo = userinfo
    async function logout() {
        await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                //@ts-ignore
                token: Accessjwt.Access
            })
        }).then((response) => {
            if (response.status == 200) {
                setUserInfo({});
                setlogCount(0);
                setAccessjwt({});
                window.location.reload()
            }
        })
    }

    useEffect(() => {
        if (logCount == 1) {
            async function api() {
                await fetch("/api/department?type=infoUser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        //@ts-ignore
                        token: Accessjwt.Access
                    })
                }).then((response) => {
                    setUserInfo(response.json());
                })
            }
            api();
        }
        console.log(userinfo);

    }, [])

    return (
        <>
            <header>
                <div className='flex justify-between m-4 lg:m-0' >
                    {/* 로고 입력부분 */}
                    <div style={{ display: "flex", alignItems: "center" }}  onClick={() => {navigate("/site/")}}>
                        <img className="rounded-md lg:w-20 lg:h-20  w-10 h-10" src="./image/161593018.png" alt="" />
                        <div className='w-3'></div>
                        <p className='title'>D Cloud Platform</p>
                    </div>
                    {/* 로고 입력부분 */}
                    <div>
                        {
                            logCount === 1
                                ? <div>
                                    <div className='mobile_none'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <div className='mr-10' style={{ display: "flex", alignItems: "center" }}>
                                                    <Avatar className='w-[auto] h-[4vh]'>
                                                        <AvatarImage src="./image/Windows-10-user-icon-big.png" />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                    ㅤ
                                                    <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>{userinfod.name}님</p>
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>정보 수정</DropdownMenuItem>
                                                <DropdownMenuItem>서버신청 현황</DropdownMenuItem>
                                                <DropdownMenuItem>서버 현황</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => { logout(); }}>로그아웃</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className='pc_none' >
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Avatar className='pc_none'>
                                                    <AvatarImage src="./image/Windows-10-user-icon-big.png" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='mr-8'>
                                                {/* //@ts-ignore */}
                                                <DropdownMenuLabel>환영합니다. <br /> {userinfod.name}</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>정보 수정</DropdownMenuItem>
                                                <DropdownMenuItem>서버신청 현황</DropdownMenuItem>
                                                <DropdownMenuItem>서버 현황</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => { logout(); }}>로그아웃</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                : <Button className='mobile_none h-16 w-40' onClick={() => { navigate("/site/auth_prcess") }}>
                                    <p style={{ fontSize: "1.3em", fontWeight: "bold" }}>회원가입/로그인</p>
                                </Button>
                        }
                    </div>
                </div>
            </header>
        </>
    )
}

export default Topnav
