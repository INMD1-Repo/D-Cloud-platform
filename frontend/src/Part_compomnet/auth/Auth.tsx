import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Auth() {
    return (
        <>
            <div className="grid  place-content-center" >
                <div className="grid">
                    <div className="h-[20vh] lg:h-[20vh]"></div>
                    <Tabs defaultValue="account" className="pl-[8vh] lg:pl-0 w-[80vw] lg:w-[25vw]">
                        <TabsList className="grid w-full grid-cols-2 lg:h-[3vh]">
                            <TabsTrigger value="account" className="authtitle lg:h-[3vh]">로그인</TabsTrigger>
                            <TabsTrigger value="password" className="authtitle lg:h-[3vh]">회원가입</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" >
                            <Card className="h-[40vh]">
                                <CardHeader>
                                    <br />
                                    <CardTitle className="title">D Cloud Platform에 </CardTitle>
                                    <CardTitle className="title">오신걸 환영합니다.</CardTitle>
                                    <CardDescription>
                                        Make changes to your account here. Click save when you're done.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">

                                    </div>
                                    <div className="space-y-1">

                                    </div>
                                </CardContent>
                                <CardFooter className="p-3 lg:p-7">
                                    <Button className="singup w-full">로그인</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card className="h-[40vh]">
                                <CardHeader>
                                    <br />
                                    <CardTitle className="title">환영합니다. </CardTitle>
                                    <CardDescription>
                                        저희 서비스를 이용하기 전에 아래 정보를 기입해주시기 바람니다.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">

                                    </div>
                                    <div className="space-y-1">

                                    </div>
                                </CardContent>
                                <CardFooter className="p-3 lg:p-7">
                                    <Button className="singup w-full">회원가입</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Auth