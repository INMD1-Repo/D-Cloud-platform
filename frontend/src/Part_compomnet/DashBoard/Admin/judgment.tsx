import {
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  SquareTerminal,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/sidebar";
import { useAtom } from "jotai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToastContainer, toast } from "react-toastify";

import { Access_jwt, login_Count, User_info } from "@/store/strore_data";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import { Card } from "@/components/ui/card.tsx";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useNavigate } from "react-router-dom";

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
};

//추후에 디자인 수정을 해야됨
//@ts-ignore
function Row({ row }) {
  const navigate = useNavigate();
  const data = JSON.parse(row.content);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [serverName, setServerName] = useState(
    data.Servername === undefined ? "" : data.Servername
  );
  const [vmId, setVmId] = useState(data.vmId === undefined ? "" : data.vmId);
  const [isApproved, setIsApproved] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [open, setOpen] = React.useState(false);
  //@ts-ignore
  const [userinfo] = useAtom(User_info);

  const handleSubmit = async () => {
    const result_content = JSON.parse(row.content);
    let result = {
      content: {},
      isApproved: 0,
    };

    if (isApproved) {
      try {
        delete result_content.rejectionReason;
        result_content.Servername = serverName;
      } finally {
        result_content.region = selectedRegion;
        result_content.vmId = vmId;
        result = {
          content: result_content,
          isApproved: 381,
        };
      }
    } else {
      try {
        delete result_content.region;
        delete result_content.vmId;
        delete result_content.Servername;
      } finally {
        result_content.rejectionReason = isApproved ? "" : rejectionReason;
        result = {
          content: result_content,
          isApproved: 4394,
        };
      }
    }

    // 여기서 결과를 저장하는 로직을 구현합니다.
    // 예: API 호출 또는 로컬 스토리지에 저장

    const response = await fetch(
      //@ts-ignore
      `/api/server_application?type=admin&email=${userinfo.email}&id=${row.id}&Appcet=${result.isApproved}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.content),
      }
    );
    if (response.status === 200) {
      toast.success("저장되었습니다.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/site/server/Admin/judgment");
      }, 2000);
      console.log("success");
    }
  };

  // @ts-ignore
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            style={{ color: "gray" }}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: "gray" }}>{row.id}</TableCell>
        <TableCell sx={{ color: "gray" }}>{row.Username}</TableCell>
        <TableCell sx={{ color: "gray" }}>{row.Servername}</TableCell>
        <TableCell sx={{ color: "gray" }}>{row.created_at}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <ScrollArea className="">
                      <div className="grid gap-4 grid-cols-2">
                        <div>
                          <Card>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>필드</TableCell>
                                  <TableCell>값</TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {Object.entries(data).map(([key, value]) => (
                                  <TableRow key={key}>
                                    <TableCell className="font-medium">
                                      {key}
                                    </TableCell>
                                    <TableCell>
                                      {key === "date"
                                        ? null
                                        : key === "iamcheck"
                                        ? value
                                          ? "예"
                                          : "아니오"
                                        : String(value)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Card>
                        </div>
                        <div className="grid">
                          <div className="space-y-4 p-4">
                            <p>결과를 눌려주세요.</p>
                            <div className="flex space-x-2">
                              {/* @ts-ignore */}.
                              <Button onClick={() => setIsApproved(true)}>
                                승인
                              </Button>
                              {/* @ts-ignore */}.
                              <Button onClick={() => setIsApproved(false)}>
                                거절
                              </Button>
                            </div>
                            {isApproved === false && (
                              <>
                                <p>거절 사유를 필히 적어주십시오.</p>
                                <Textarea
                                  value={rejectionReason}
                                  //@ts-ignore
                                  onChange={(e) =>
                                    setRejectionReason(e.target.value)
                                  }
                                  placeholder="거절 이유"
                                />
                              </>
                            )}
                            <hr />
                            {isApproved === true && (
                              <>
                                <p>먼저 리전을 선택해주세요.</p>
                                <Select onValueChange={setSelectedRegion}>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="서버 구역을 선택해주세요." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="compute1">
                                      1번 서버
                                    </SelectItem>
                                    <SelectItem value="compute2">
                                      2번 서버
                                    </SelectItem>
                                    <SelectItem value="compute3">
                                      3번 서버
                                    </SelectItem>
                                    <SelectItem value="compute4">
                                      4번 서버
                                    </SelectItem>
                                    <SelectItem value="compute5">
                                      5번 서버
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <p>실제로 생성할 서버 이름을 적습니다.</p>
                                <Input
                                  value={serverName}
                                  onChange={(e) =>
                                    setServerName(e.target.value)
                                  }
                                  placeholder={serverName}
                                />
                                <p>실제로 생성된 ID을 입력해주세요.</p>
                                <Input
                                  value={vmId}
                                  onChange={(e) => setVmId(e.target.value)}
                                  placeholder={vmId}
                                />
                              </>
                            )}

                            <Button onClick={handleSubmit}>제출</Button>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
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
  const [logCount, setlogCount] = useAtom(login_Count);
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
        setlogCount(0);
        setAccessjwt({});
       navigate("/site/")
      }
    });
  }

  const [Jsondata, setJsondata] = React.useState([]);

  async function GetApi() {
    try {
      const response = await fetch(
        //@ts-ignore
        `/api/server_application/?email=${userinfo.email}&type=admin`
      );
      const Restapi = await response.json();
      for (let i = 0; i < Restapi.length; i++) {
        const data = JSON.parse(Restapi[i].content);
        Restapi[i].Servername = data.Servername;
      }
      setJsondata(Restapi);
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  }

  useEffect(() => {
    //@ts-ignore
    if (userinfo.name && userinfo.email) {
      GetApi();
    } //@ts-ignore
  }, [userinfo.name, userinfo.email]);

  useEffect(() => {
    if (logCount == 0) {
      navigate("/site/")
    }
  }, []);

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
          <SidebarMenu
            onClick={() => {
              navigate("/site/dashboard");
            }}
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img src="./image/161593018.png" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">D Cloud Platform</span>
                <span className="truncate text-xs">Deu Univ region</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarHeader>
        {/*아래는 그냥 메뉴표시*/}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) =>
                item.Admin == 0 ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
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
                ) : (
                  <></>
                )
              )}
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
                    <ChevronsUpDown className="ml-auto size-4" />
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                    }}
                  >
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
          <p className="title"> 서버 신청 허가 </p>
          <p>
            서버 신청 현황을 볼수 있습니다. 만약에 신청 거부가 뜨면 다시 신청
            해주시기 바랍니다.
          </p>
          <br />
          <div>
            <Card>
              <TableContainer>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell sx={{ color: "gray" }}>ID</TableCell>
                      <TableCell sx={{ color: "gray" }}>신청자</TableCell>
                      <TableCell sx={{ color: "gray" }}>서버이름</TableCell>
                      <TableCell sx={{ color: "gray" }}>신청시간</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Jsondata.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    ).map((item) => (
                      //@ts-ignore
                      <Row key={item.id} row={item} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={Jsondata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ color: "black" }}
              />
            </Card>
          </div>
        </div>
        <ToastContainer />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Judgment;
