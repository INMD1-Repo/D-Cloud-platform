import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Topnav from "../nav"
import { useEffect, useState } from "react"


const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },

]


function Mainpage_index() {
    const [statuses, setStatuses] = useState({
        Computer1: "🟡 Checking",
        Computer2: "🟡 Checking",
        Computer3: "🟡 Checking",
        Computer4: "🟡 Checking",
        Computer5: "🟡 Checking",
    });

    useEffect(() => {
        async function fetchData() {
            try {
                
                const response = await fetch("https://phpproject.powerinmd.com/api/proxmox?search=nodes");
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
        <div className="p-0 lg:p-20">
            <Topnav />
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
                    <div className="grid  grid-cols-2 grid-rows-2 lg:flex gap-10 lg:w-80 m-5 lg:m-0 ">
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
                    <br/>
                    <p>업데이트 시각: {Date()}</p>
                    <br />
                    <div className="flex items-stretch">
                    <p className="title">공지사항ㅤ</p>
                    <Button className="self-end">게시판 이동</Button>
                    </div>
                    <div className="lg:h-7 h-5"></div>
                    <div className="m-2 lg:m-0">
                        <Card className="p-4">
                            <Table>
                                <TableCaption>좀더 보고 싶으면 공지사항 게시판에서 조회하시기 바람니다.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">ID</TableHead>
                                        <TableHead>작성자</TableHead>
                                        <TableHead>제목</TableHead>
                                        <TableHead className="text-right">작성일</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoices.map((invoice) => (
                                        <TableRow key={invoice.invoice}>
                                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                            <TableCell>{invoice.paymentStatus}</TableCell>
                                            <TableCell>{invoice.paymentMethod}</TableCell>
                                            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Mainpage_index