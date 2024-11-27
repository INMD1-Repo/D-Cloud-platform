import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Topnav from "../nav"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { Access_jwt } from "@/store/strore_data"
import { useNavigate } from "react-router-dom"
import Mainpage_part_Board from "./notice"

function Mainpage_index() {
    const navigate = useNavigate();
    const [logCount] = useAtom(Access_jwt)
    const [statuses, setStatuses] = useState({
        Computer1: "🟡 Checking",
        Computer2: "🟡 Checking",
        Computer3: "🟡 Checking",
        Computer4: "🟡 Checking",
        Computer5: "🟡 Checking",
    });

    useEffect(() => {
        console.log(logCount);

        async function fetchData() {
            try {

                const response = await fetch("/api/proxmox?search=nodes");
                const data = await response.json();

                // 데이터 기반으로 상태 업데이트
                const updatedStatuses = { ...statuses };
                data.data.forEach((node: { status: string }, index: number) => {
                    const computerKey = `Computer${index + 1}`;
                    // @ts-ignore
                    if (updatedStatuses[computerKey] !== undefined) {
                        // @ts-ignore
                        updatedStatuses[computerKey] =
                            node.status === "online" ? "🟢 Online" : "🔴 Error";
                    }
                });

                setStatuses(updatedStatuses);
            } catch (error) {
                console.error("데이터 가져오기 중 오류 발생:", error);

                // 모든 상태를 Error로 설정
                // @ts-ignore
                setStatuses(prevStatuses =>
                    Object.fromEntries(
                        Object.keys(prevStatuses).map(key => [key, "🔴 Error"])
                    )
                );
            }
        }

        fetchData();
    }, []);
    return (

        <div className="p-5 md:p-20">
            <Topnav />
            <div className="mobile_none mt-20"></div>
            <div className="xl:flex md:grid items-center flex-nowrap gap-20 " >
                <div className="grid custon-with mt-10">
                    <div className="m-5 xl:m-20">
                        <p className="mianpage_header">저희는 서버가 필요하는</p>
                        <p className="mianpage_header">프로젝트에 무상으로 서버를</p>
                        <p className="mianpage_header">지원해 드리고 있습니다.</p>
                        <div className="lg:h-10 h-5"></div>
                        <p className="mianpage_sidheader ">프로젝트를 하는데 서버 비용이 문제라면 저희 서버를 한번 이용해보세요.</p>
                        <div className="flex lg:justify-end mt-3 lg:mt-5 ">
                            <Button className="h-10 w-20 lg:h-16 lg:w-40" >
                                <p className="mainpage_button">서버 신청</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="grid custon-with">

                    <p className="title">서버 현황</p>
                    <div className="lg:h-7 h-5"></div>
                    <div className="grid grid-cols-2 grid-rows-2  lg:flex gap-10 lg:w-80 m-5 lg:m-0 ">
                        {/*서버 현황을 보여주는 컴포넌트*/}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Computer1</CardTitle>
                                    <CardDescription>{statuses.Computer1}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Computer2</CardTitle>
                                    <CardDescription>{statuses.Computer2}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Computer3</CardTitle>
                                    <CardDescription>{statuses.Computer3}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Computer4</CardTitle>
                                    <CardDescription>{statuses.Computer4}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Computer5</CardTitle>
                                    <CardDescription>{statuses.Computer5}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                    <br />
                    <div className="mobile_none">
                        <p>업데이트 시각: {Date()}</p>
                    </div>
                    <br />
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p className="title">공지사항ㅤ</p>
                        <Button className="self-end mb-2.5" onClick={() => { navigate("/site/board"); }}>게시판 이동</Button>
                    </div>
                    <div className="lg:h-7 h-5"></div>
                    <div className="m-2 lg:m-0">
                        <Mainpage_part_Board />
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Mainpage_index