import {
    BookOpen,
    Bot,
    ChevronRight,
    ChevronsUpDown,
    LogOut,
    SquareTerminal
} from "lucide-react"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {login_Count, User_info, Access_jwt} from "@/store/strore_data";
import {useAtom} from "jotai";
import MDEditor from '@uiw/react-md-editor';
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const data = {
    navMain: [
        {
            title: "사이트 이동",
            Admin: 0,
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "메인 페이지",
                    url: "/site/",
                },
            ],
        },
        {
            title: "서버 신청",
            url: "#",
            Admin: 0,
            icon: Bot,
            items: [
                {
                    title: "서버 신청 현황",
                    url: "/site/server/show_Accpet",
                },
                {
                    title: "서버 신청하기",
                    url: "/site/server/subscription",
                },
            ],
        },
        {
            title: "보유 서버",
            url: "#",
            Admin: 0,
            icon: BookOpen,
            items: [
                {
                    title: "활성화된 서버가 없습니다.",
                    url: "#",
                },
            ],
        },
        {
            title: "관리자 패널",
            url: "#",
            Admin: 1,
            icon: BookOpen,
            items: [
                {
                    title: "서버 승인",
                    url: "/site/server/Admin/judgment",
                },
                {
                    title: "공지사항 작성",
                    url: "/site/server/Admin/write_notice",
                },
            ],
        },
    ],
}

function Write_notice() {

    const navigate = useNavigate();

    //@ts-ignore
    const [logCount, setlogCount] = useAtom(login_Count);
    const [Accessjwt, setAccessjwt] = useAtom(Access_jwt);
    const [userinfo, setUserInfo] = useAtom(User_info);
    const [title, settitle] = useState('');
    const [value, setValue] = useState("**Hello world!!!**");

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
                navigate("/site/")
            }
        });
    }

    const saveTitle = (event: any) => {
        settitle(event.target.value);
    };

    async function Upload() {
        if (title.length != 0) {
            await fetch("/api/createPost?board=notice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    //@ts-ignore
                    Access: Accessjwt.Access,
                    title: title,
                    content: value,
                    //@ts-ignore
                    User_email: userinfo.email,
                    //@ts-ignore
                    username: userinfo.name
                })
            }).then((response) => {
                if (response.status == 201) {
                    toast.success("성공적으로 저장했습니다.", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored"
                    });
                    setTimeout(() => {
                        navigate("/site/server/Admin/write_notice")
                    }, 2000);
                }
            })
        } else {
            toast.error("제목이나 본문에 값이 없습니다.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    }

    useEffect(() => {
        if (logCount == 0) {
            navigate("/site/")
        }
    }, []);

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                {/*상단 플랫폼 이름 표기*/}
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div
                                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <img src="./image/161593018.png"/>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    D Cloud Platform
                                </span>
                                <span className="truncate text-xs">
                                    Deu Univ region
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto"/>
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarHeader>
                {/*아래는 그냥 메뉴표시*/}
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Menu</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                item.Admin == 0 ? <Collapsible
                                        key={item.title}
                                        asChild
                                        defaultOpen={item.isActive}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton tooltip={item.title}>
                                                    {item.icon && <item.icon/>}
                                                    <span>{item.title}</span>
                                                    <ChevronRight
                                                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items?.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton asChild>
                                                                <a href={subItem.url}>
                                                                    <span>{subItem.title}</span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                    : <></>

                            ))}
                        </SidebarMenu>
                        <SidebarMenu>
                            {data.navMain.map((item) =>
                                //@ts-ignore
                                userinfo.Admin == 1 && item.Admin == 1 ? (
                                    <Collapsible
                                        key={item.title}
                                        asChild
                                        defaultOpen={item.isActive}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton tooltip={item.title}>
                                                    {item.icon && <item.icon/>}
                                                    <span>{item.title}</span>
                                                    <ChevronRight
                                                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items?.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton asChild>
                                                                <a href={subItem.url}>
                                                                    <span>{subItem.title}</span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    <></>
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                {/*//로그인부분*/}
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarFallback className="rounded-lg">U</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {/*//@ts-ignore*/}
                                                {userinfo.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {/*//@ts-ignore*/}
                                                {userinfo.email}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4"/>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">

                                                <AvatarFallback className="rounded-lg">
                                                    U
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {/*//@ts-ignore*/}
                                                    {userinfo.name}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {/*//@ts-ignore*/}
                                                    {userinfo.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => {
                                        logout();
                                    }}>
                                        <LogOut/>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail/>
            </Sidebar>
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="p-5 md:p-20">

                        <div className="xl:flex md:grid  justify-center  flex-nowrap">
                            <div className="container">
                                <p className="title">공지사항 게시판 작성</p>
                                <br/>
                                <p className="authtitle" style={{fontWeight: "bold"}}>제목 추가 </p>
                                <Input value={title}
                                       onChange={saveTitle}></Input>
                                <br/>
                                <p className="authtitle mb-2" style={{fontWeight: "bold"}}>본문 내용추가 </p>
                                <MDEditor
                                    value={value}
                                    //@ts-ignore
                                    onChange={setValue}
                                />
                                <br/>
                                <div className="justify-self-end ">
                                    <Button onClick={() => {
                                        Upload()
                                    }} style={{backgroundColor: "#26a641"}}>
                                        작성 완료
                                    </Button>
                                </div>

                            </div>

                        </div>
                    </div>
                    <ToastContainer/>

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Write_notice