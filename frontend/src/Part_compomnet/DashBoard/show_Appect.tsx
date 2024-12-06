import { BookOpen, Bot, ChevronRight, ChevronsUpDown, LogOut, SquareTerminal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { Access_jwt, login_Count, User_info } from "@/store/strore_data";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

function Show_Appect() {
    const [invoices, setInvoices] = useState([]);
    const [navData, setNavData] = useState({
        navMain: [
            {
                title: "사이트 이동",
                Admin: 0,
                url: "#",
                icon: SquareTerminal,
                isActive: true,
                items: [{ title: "메인 페이지", url: "/site/" }],
            },
            {
                title: "서버 신청",
                url: "#",
                Admin: 0,
                icon: Bot,
                items: [
                    { title: "서버 신청 현황", url: "/site/server/show_Accpet" },
                    { title: "서버 신청하기", url: "/site/server/subscription" },
                ],
            },
            {
                title: "보유 서버",
                url: "#",
                Admin: 0,
                icon: BookOpen,
                items: [],
            },
            {
                title: "관리자 패널",
                url: "#",
                Admin: 1,
                icon: BookOpen,
                items: [
                    { title: "서버 승인", url: "/site/server/Admin/judgment" },
                    { title: "공지사항 작성", url: "/site/server/Admin/write_notice" },
                ],
            },
        ],
    });

    const navigate = useNavigate();
    const [, setLogCount] = useAtom(login_Count);
    const [accessJwt, setAccessJwt] = useAtom(Access_jwt);
    const [userInfo, setUserInfo] = useAtom(User_info);

    async function logout() {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //@ts-ignore
                body: JSON.stringify({ token: accessJwt.Access }),
            });
            if (response.status === 200) {
                setUserInfo({});
                setLogCount(0);
                setAccessJwt({});
                navigate("/site/");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    async function getApi() {
        try {
            //@ts-ignore
            const response = await fetch(`/api/server_application/?username=${userInfo.name}&email=${userInfo.email}&type=user`);
            const restApi = await response.json();
            //@ts-ignore
            const updatedInvoices = restApi.map(item => {
                const data = JSON.parse(item.content);
                return {
                    ...item,
                    content: data.Servername,
                    Appcet: item.Appcet === 0 ? "⚪️ 진행중" : item.Appcet === 381 ? "🟢 승인되었습니다." : "🔴 거절 되었습니다.",
                };
            });
            setInvoices(updatedInvoices);
        } catch (error) {
            console.error("API 호출 오류:", error);
        }
    }

    async function getApiNav() {
        try {
            //@ts-ignore
            const response = await fetch(`/api/server_application/?username=${userInfo.name}&email=${userInfo.email}&type=user`);
            const restApi = await response.json();
            setNavData(prevData => {
                const newData = { ...prevData };
                //@ts-ignore
                newData.navMain[2].items = restApi.map(item => ({
                    title: JSON.parse(item.content).Servername,
                    url: "#",
                }));
                return newData;
            });
        } catch (error) {
            console.error("API 호출 오류:", error);
        }
    }

    useEffect(() => {
        //@ts-ignore
        if (userInfo.name && userInfo.email) {
            getApi();
            getApiNav();
        }
        //@ts-ignore
    }, [userInfo.name, userInfo.email]);

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu onClick={() => navigate("/site/dashboard")}>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <img src="./image/161593018.png" alt="Logo" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">D Cloud Platform</span>
                                <span className="truncate text-xs">Deu Univ region</span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Menu</SidebarGroupLabel>
                        <SidebarMenu>
                            {navData.navMain.map((item) =>
                                //@ts-ignore
                                item.Admin === 0 || (userInfo.Admin === 1 && item.Admin === 1) ? (
                                    <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton tooltip={item.title}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
                                ) : null
                            )}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarFallback className="rounded-lg">U</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            {/*//@ts-ignore*/}
                                            <span className="truncate font-semibold">{userInfo.name}</span>
                                            {/*//@ts-ignore*/}
                                            <span className="truncate text-xs">{userInfo.email}</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarFallback className="rounded-lg">U</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                {/*//@ts-ignore*/}
                                                <span className="truncate font-semibold">{userInfo.name}</span>
                                                {/*//@ts-ignore*/}
                                                <span className="truncate text-xs">{userInfo.email}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <p className="title">서버 신청 현황</p>
                    <p>서버 신청 현황을 볼 수 있습니다. 만약에 신청 거부가 뜨면 다시 신청 해주시기 바람니다.</p>
                    <br />
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>신청자</TableHead>
                                    <TableHead>서버이름</TableHead>
                                    <TableHead>신청시간</TableHead>
                                    <TableHead>신청결과</TableHead>
                                    <TableHead>거절사유</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map(({ created_at, denine, id, Appcet, content, Username }) => (
                                    <TableRow key={id}>
                                        <TableCell className="font-medium">{id}</TableCell>
                                        <TableCell>{Username}</TableCell>
                                        <TableCell>{content}</TableCell>
                                        <TableCell>{created_at}</TableCell>
                                        <TableCell>{Appcet}</TableCell>
                                        <TableCell>{denine}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default Show_Appect;