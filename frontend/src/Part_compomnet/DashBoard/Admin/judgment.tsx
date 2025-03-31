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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

//@ts-ignore
function Row({ row }) {
  const navigate = useNavigate();
  const DataParse = JSON.parse(row.content);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [servertype, setServertype] = useState("");
  const [serverName, setServerName] = useState(
    DataParse.Servername === undefined ? "" : DataParse.Servername
  );
  const [vmId, setVmId] = useState(
    DataParse.vmId === undefined ? "" : DataParse.vmId
  );
  const [isApproved, setIsApproved] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [NetworkInfo, setNetworkInfo] = useState("");
  const [open, setOpen] = React.useState(false);
  //@ts-ignore
  const [userinfo] = useAtom(User_info);
  const handleSubmit = async () => {
    const result_content = JSON.parse(row.content);
    let result = {
      content: {},
      isApproved: 0,
    };

    if (isApproved == "true") {
      try {
        delete result_content.rejectionReason;
        result_content.Servername = serverName;
      } finally {
        result_content.region = selectedRegion;
        result_content.vmId = vmId;
        result_content.NetworkInfo = NetworkInfo;
        result_content.servertype = servertype;
        result = {
          content: result_content,
          isApproved: 381,
        };
      }
    } else if (isApproved == "false") {
      try {
        delete result_content.region;
        delete result_content.vmId;
      } finally {
        result_content.rejectionReason = isApproved ? "" : rejectionReason;
        result = {
          content: result_content,
          isApproved: 4394,
        };
      }
    } else if (isApproved == "depending") {
      result_content.rejectionReason = isApproved ? "" : rejectionReason;
      result = {
        content: result_content,
        isApproved: 3812,
      };
    } else if (isApproved == "out_true") {
      delete result_content.region;
      delete result_content.vmId;
      result_content.rejectionReason = isApproved ? "" : rejectionReason;
      result = {
        content: result_content,
        isApproved: 7422,
      };
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

  function DateReplace(data: string) {
    const date = new Date(data);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // @ts-ignore
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="dark:bg-[#181818]"
      >
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
        <TableCell sx={{ color: "gray" }}>
          {row.Appcet === "0"
            ? "⚪️ 진행중"
            : row.Appcet === "3812"
            ? "🟠 승인이 되었지만 제작중입니다."
            : row.Appcet === "381"
            ? "🟢 승인되었습니다."
            : row.Appcet === "7422"
            ? "🟢 외부 승인되었습니다."
            : "🔴 거절 되었습니다."}
        </TableCell>
      </TableRow>
      <TableRow className="dark:bg-[#181818]">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <div className="flex gap-4">
                      <div className="w-3/5">
                        <Accordion
                          className="dark:bg-[#1f1f1f] "
                          type="single"
                          collapsible
                        >
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="dark:text-[#cccccc]">
                              사용자 정보
                            </AccordionTrigger>
                            <AccordionContent>
                              <Card>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        이름
                                      </TableCell>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        {DataParse.name}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        이메일
                                      </TableCell>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        {DataParse.email}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        연락처
                                      </TableCell>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        {DataParse.phone_number}
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                </Table>
                              </Card>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger className="dark:text-[#cccccc]">
                              신청 서버 정보
                            </AccordionTrigger>
                            <AccordionContent>
                              <Card>
                                <Table>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        OS
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DataParse.os}
                                      </TableCell>
                                      <TableCell className="text-center dark:text-[#cccccc]">
                                        |
                                      </TableCell>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        생성자
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DataParse.name}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        서버 이름
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DataParse.Servername}
                                      </TableCell>
                                      <TableCell className="text-center dark:text-[#cccccc]">
                                        |
                                      </TableCell>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        유저 ID
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DataParse.Username}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        유저 PW
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DataParse.User_pw}
                                      </TableCell>
                                      <TableCell className="text-center dark:text-[#cccccc]">
                                        |
                                      </TableCell>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        Root PW
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DataParse.root_pw}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        CPU / RAM
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DataParse.CPU} (C) / {DataParse.RAM}
                                        (GB)
                                      </TableCell>
                                      <TableCell className="text-center dark:text-[#cccccc]">
                                        |
                                      </TableCell>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        Storgae
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DataParse.Storage} (GB)
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Card>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3">
                            <AccordionTrigger className="dark:text-[#cccccc]">
                              기타 사항
                            </AccordionTrigger>
                            <AccordionContent>
                              <Card>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        대여 시작
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DateReplace(DataParse.date.from)}
                                      </TableCell>
                                      <TableCell className="text-center dark:text-[#cccccc]">
                                        |
                                      </TableCell>
                                      <TableCell className="font-medium dark:text-[#cccccc]">
                                        대여 종료
                                      </TableCell>
                                      <TableCell className="text-left dark:text-[#cccccc]">
                                        {DateReplace(DataParse.date.to)}
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                </Table>
                              </Card>
                              <br />
                              <p className="dark:text-[#cccccc]">
                                네트워크 추가사항
                              </p>
                              <br />
                              <Card className="p-4 dark:text-[#cccccc]">
                                {DataParse.Network_Requirements}
                              </Card>
                              <br />
                              <p className="dark:text-[#cccccc]">대여사유</p>
                              <br />
                              <Card className="p-4 dark:text-[#cccccc]">
                                {DataParse.Application_period}
                              </Card>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                      <div className="w-2/5">
                        <div className="grid">
                          <div className="space-y-4 p-4">
                            <p className="dark:text-[#cccccc]">
                              결과를 눌려주세요.
                            </p>
                            <div className="grid lg:flex lg:space-x-2">
                              {/* @ts-ignore */}
                              <Button onClick={() => setIsApproved("out_true")}>
                                외부 승인
                              </Button>
                              ㅤ{/* @ts-ignore */}
                              <Button onClick={() => setIsApproved("true")}>
                                승인
                              </Button>
                              ㅤ{/* @ts-ignore */}
                              <Button
                                onClick={() => setIsApproved("depending")}
                              >
                                제작 대기
                              </Button>
                              ㅤ{/* @ts-ignore */}
                              <Button onClick={() => setIsApproved("false")}>
                                거절
                              </Button>
                              ㅤ
                            </div>
                            {isApproved === "false" && (
                              <>
                                <p className="dark:text-[#cccccc]">
                                  거절 사유를 필히 적어주십시오.
                                </p>
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
                            {isApproved === "true" && (
                              <>
                                <p className="dark:text-[#cccccc]">
                                  먼저 리전을 선택해주세요.
                                </p>
                                <Select onValueChange={setSelectedRegion}>
                                  <SelectTrigger className="w-[180px] dark:bg-[#cccccc]">
                                    <SelectValue placeholder="서버 구역을 선택해주세요." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="compute1">
                                      1번 서버 (HPE)
                                    </SelectItem>
                                    <SelectItem value="compute2">
                                      2번 서버 (HPE)
                                    </SelectItem>
                                    <SelectItem value="computer3">
                                      3번 서버 (HPE)
                                    </SelectItem>
                                    <SelectItem value="computer4">
                                      4번 서버 (HPE)
                                    </SelectItem>
                                    <SelectItem value="compute5">
                                      5번 서버 (INTEL)
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <p className="dark:text-[#cccccc]">
                                  실제로 생성할 서버 이름을 적습니다.
                                </p>
                                <Input
                                  className="dark:bg-[#cccccc]"
                                  value={serverName}
                                  onChange={(e) =>
                                    setServerName(e.target.value)
                                  }
                                  placeholder={serverName}
                                />
                                <p className="dark:text-[#cccccc]">
                                  실제로 생성할 타입을 적어주세요.
                                </p>
                                <Select onValueChange={setServertype}>
                                  <SelectTrigger className="w-[180px] dark:bg-[#cccccc]">
                                    <SelectValue placeholder="타입을 선택해주세요" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="qemu">VM</SelectItem>
                                    <SelectItem value="lxc">lxc</SelectItem>
                                  </SelectContent>
                                </Select>
                                <p className="dark:text-[#cccccc]">
                                  실제로 생성된 ID을 입력해주세요.
                                </p>
                                <Input
                                  className="dark:bg-[#cccccc]"
                                  value={vmId}
                                  onChange={(e) => setVmId(e.target.value)}
                                  placeholder={vmId}
                                />
                                <p className="dark:text-[#cccccc]">
                                  승인하고 기타 네트워크 사항에 대해 적어주세요.
                                </p>
                                <Textarea
                                  className="dark:bg-[#cccccc]"
                                  value={NetworkInfo}
                                  //@ts-ignore
                                  onChange={(e) =>
                                    setNetworkInfo(e.target.value)
                                  }
                                  placeholder="사용자가 처음 일수도 있으니 자세히 적어주세요"
                                />
                              </>
                            )}

                            <Button onClick={handleSubmit}>제출</Button>
                          </div>
                        </div>
                      </div>
                    </div>
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
  //@ts-ignore
  const [logCount, setlogCount] = useAtom(login_Count);
  const [Accessjwt, setAccessjwt] = useAtom(Access_jwt);
  const [userinfo, setUserInfo] = useAtom(User_info);
  const [Jsondata, setJsondata] = React.useState([]);

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
        navigate("/site/");
      }
    });
  }

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

  async function getApiNav() {
    try {
      const response = await fetch(
        //@ts-ignore
        `/api/server_application/?username=${userinfo.name}&email=${userinfo.email}&type=user`
      );
      const restApi = await response.json();

      setNavData((prevData) => {
        const newData = { ...prevData };
        //@ts-ignore
        newData.navMain[2].items = restApi.map((item) =>
          JSON.parse(item.Appcet) == 381
            ? {
                title: JSON.parse(item.content).Servername,
                url: `/site/server/View_vm/${item.id}`,
              }
            : JSON.parse(item.Appcet) == 3812
            ? {
                title: "제작중입니다.",
                url: `/site/server/show_Accpet`,
              }
            : {
                title: "아직 승인되지 않았습니다.",
                url: `/site/server/show_Accpet`,
              }
        );
        return newData;
      });
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  }

  useEffect(() => {
    //@ts-ignore
    if (userinfo.name && userinfo.email) {
      GetApi();
      getApiNav();
    }
    //@ts-ignore
    if (userinfo.Admin == 0) {
      navigate("/site/");
    }
    //@ts-ignore
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
              {navData.navMain.map((item) =>
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
              {navData.navMain.map((item) =>
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
      <SidebarInset className="dark:bg-[#181818]">
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
            <Card className="dark:bg-[#181818]">
              <TableContainer>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell sx={{ color: "gray" }}>ID</TableCell>
                      <TableCell sx={{ color: "gray" }}>신청자</TableCell>
                      <TableCell sx={{ color: "gray" }}>서버이름</TableCell>
                      <TableCell sx={{ color: "gray" }}>신청시간</TableCell>
                      <TableCell sx={{ color: "gray" }}>
                        이전 신청결과
                      </TableCell>
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
