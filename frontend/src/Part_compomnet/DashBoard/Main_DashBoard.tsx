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
import {Route, Routes, useNavigate} from "react-router-dom";
import Dashboard_main from "@/Part_compomnet/DashBoard/part/main_page.tsx";
import {useAtom} from 'jotai'
import {login_Count, User_info} from "@/store/strore_data";
import {useEffect} from "react";

// This is sample data.
const data = {

    navMain: [
        {
            title: "정보 수정",
            url: "#",
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
            icon: Bot,
            items: [
                {
                    title: "서버 신청 현황",
                    url: "#",
                },
                {
                    title: "서버 신청하기",
                    url: "#",
                },
            ],
        },
        {
            title: "보유 서버",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "활성화된 서버가 없습니다.",
                    url: "#",
                },
            ],
        },
    ],

}


function Main_DashBoard() {

    const navigate = useNavigate();
    const [userinfo] = useAtom(User_info);
    const [logCount] = useAtom(login_Count);
    useEffect(() => {
        if (logCount == 0) {
            navigate("/site/")
        }
    }, [])

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
                                    Deu region
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
                                    <DropdownMenuItem>
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
                    <Routes>
                        <Route path="/" element={<Dashboard_main/>}/>
                    </Routes>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Main_DashBoard