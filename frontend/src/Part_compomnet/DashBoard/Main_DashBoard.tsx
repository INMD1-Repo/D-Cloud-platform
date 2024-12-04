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
import {useNavigate} from "react-router-dom";
import {useAtom} from 'jotai'
import {Access_jwt, login_Count, User_info} from "@/store/strore_data";

const data = {
    navMain: [
        {
            title: "정보 수정",
            url: "#",
            Admin: 0,
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "제작중",
                    url: "#",
                }
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
            ],
        },
    ],
}

function Main_DashBoard() {

    const navigate = useNavigate();

    //@ts-ignore
    const [logCount,setlogCount] = useAtom(login_Count);
    const [Accessjwt, setAccessjwt] = useAtom(Access_jwt);
    const [userinfo, setUserInfo] = useAtom(User_info);

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
                //@ts-ignore
                setlogCount(0);
                setAccessjwt({});
                navigate("/site/")
            }
        });
    }


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
                            {data.navMain.map((item) => (
                                item.Admin == 1 ? <Collapsible
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
                    <p className="title"> DCP에 오신걸 환영합니다.</p>
                    <p className="sub_title">옆 사이드에 있는 메뉴를 눌려서 서비스 이용해주세요.</p>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Main_DashBoard