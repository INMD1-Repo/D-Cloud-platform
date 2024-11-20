import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-label";

function Auth() {
    return (
        <>
            <div className="grid  place-content-center" >
                <div className="grid">
                    <div className="h-[10vh] lg:h-[10vh]"></div>
                    <Tabs defaultValue="account" className="pl-[8vh] lg:pl-0 w-[80vw] lg:w-[25vw]">
                        <TabsList className="grid w-full grid-cols-2 lg:h-[4vh]">
                            <TabsTrigger value="account" className="authtitle">로그인</TabsTrigger>
                            <TabsTrigger value="password" className="authtitle">회원가입</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" >
                            <Card className="">
                                <CardHeader>
                                    <br />
                                    <CardTitle className="title">D Cloud Platform에 </CardTitle>
                                    <CardTitle className="title">오신걸 환영합니다.</CardTitle>
                                    <CardDescription>
                                        저희 서비스를 이용하기전에 자격증명을 해주시기 바람니다.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <form>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">Email</Label>
                                                <Input id="email_login" type="email" placeholder="" />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">비밀번호</Label>
                                                <Input id="passowrd_login" placeholder="" />
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="p-3 lg:p-7">
                                    <Button className="singup w-full">로그인</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card className="">
                                <CardHeader>
                                    <br />
                                    <CardTitle className="title">환영합니다. </CardTitle>
                                    <CardDescription>
                                        저희 서비스를 이용하기 전에 아래 정보를 기입해주시기 바람니다.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <form>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">Email</Label>
                                                <Input id="name" placeholder="" />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">비밀번호</Label>
                                                <Input id="name" placeholder="영문숫자포함 8자리 이상" />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">학과</Label>
                                                <Input id="student_class" placeholder="" />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">학번</Label>
                                                <Input id="studentID" placeholder="" />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">전화번호</Label>
                                                <Input id="phone_number" placeholder="" />
                                            </div>
                                        </div>
                                        <br/>
                                        <CardFooter className="p-3 lg:p-3">
                                            <Button className="singup w-full">회원가입</Button>
                                        </CardFooter>
                                    </form>
                                </CardContent>

                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Auth