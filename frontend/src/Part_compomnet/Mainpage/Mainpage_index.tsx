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
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]


function Mainpage_index() {
    return (
        <div className="p-0 lg:p-20">
            <Topnav />
            <div style={{ height: "5vh" }}></div>
            <div className="xl:h-40 md:h-10"></div>
            <div className="xl:flex md:grid items-center flex-nowrap gap-20 " >
                <div className="grid custon-with">
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
                                    <CardDescription>🟢 Working</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Computer2</CardTitle>
                                    <CardDescription>🟢 Working</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Computer3</CardTitle>
                                    <CardDescription>🟢 Working</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Computer4</CardTitle>
                                    <CardDescription>🟢 Working</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Computer5</CardTitle>
                                    <CardDescription>🟢 Working</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                    <br />
                    <p className="title">공지사항</p>
                    <div className="lg:h-7 h-5"></div>
                    <div className="m-2 lg:m-0">
                        <Card className="p-4">
                            <Table>
                                <TableCaption>A list of your recent invoices.</TableCaption>
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