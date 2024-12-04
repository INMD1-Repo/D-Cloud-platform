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

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import {Card} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";

const data = {
    navMain: [
        {
            title: "정보 수정",
            Admin: 0,
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

//@ts-ignore
function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6, 24, 4),
    createData('Ice cream sandwich', 237, 9, 37, 4.3),
    createData('Eclair', 262, 16, 24, 6),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16, 49, 3.9),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16, 49, 3.9),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16, 49, 3.9),
];

//@ts-ignore
function Row({row}) {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Details about {row.name}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function Judgment() {
    const navigate = useNavigate();
    const setlogCount = useAtom(login_Count);
    const [Accessjwt, setAccessjwt] = useAtom(Access_jwt);
    const [userinfo, setUserInfo] = useAtom(User_info);
    console.log(rows);

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


    const [Jsondata, setJsondata] = React.useState([]);
    const [isLoading, setIsLoading] = useState(false);
    async function GetApi() {
        setIsLoading(true);
        try {
            //@ts-ignore
            const response = await fetch(`/api/server_application/?username=${userinfo.name}&email=${userinfo.email}&type=user`);
            const Restapi = await response.json();
            for (let i = 0; i < Restapi.length; i++) {
                const data = JSON.parse(Restapi[i].content);
                Restapi[i].Servername = data.Servername
            }
            setJsondata(Restapi);
            //Example Data
            // [
            //     {
            //         "id": 2586594,
            //         "Username": "TestNAME",
            //         "content": "JSON DATA",
            //         "User_email": "Test@gmail.com",
            //         "created_at": "2024-12-03 13:36:13",
            //         "updated_at": null,
            //         "Appcet": 0,
            //         "Servername": "AMD-Server"
            //     }
            // ]
        } catch (error) {
            console.error("API 호출 오류:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        //@ts-ignore
        if (userinfo.name && userinfo.email) {
            GetApi();

        }//@ts-ignore
    }, [userinfo.name, userinfo.email]);

    //--------------------------------------------------------------------------------
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
//@ts-ignore
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
//@ts-ignore
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                {/*상단 플랫폼 이름 표기*/}
                <SidebarHeader>
                    <SidebarMenu onClick={() => {
                        navigate("/site/dashboard")
                    }}>
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
                    <p className="title"> 서버 신청 허가 </p>
                    <p>서버 신청 현황을 볼수 있습니다. 만약에 신청 거부가 뜨면 다시 신청 해주시기 바람니다.</p>
                    <br/>
                    <div>
                        <Card>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell/>
                                            <TableCell sx={{color: 'white'}}>Dessert (100g serving)</TableCell>
                                            <TableCell sx={{color: 'white'}} align="right">Calories</TableCell>
                                            <TableCell sx={{color: 'white'}} align="right">Fat&nbsp;(g)</TableCell>
                                            <TableCell sx={{color: 'white'}} align="right">Carbs&nbsp;(g)</TableCell>
                                            <TableCell sx={{color: 'white'}} align="right">Protein&nbsp;(g)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => (
                                                <Row key={row.name} row={row}/>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{color: 'black'}}
                            />
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Judgment;