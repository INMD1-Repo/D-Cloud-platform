import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";


const FormSchema = z.object({
  name: z.string().min(1, {
    message: "이름이 입력되지 않았습니다.",
  }),
  email: z.string().min(1, {
    message: "이메일이 입력되지 않랐습니다.",
  }),
  password: z.string().min(8, {
    message: "비빌번호가 8자리 이상이 아님니다",
  }),
  student_class: z.string().min(1, {
    message: "학과가 입력되지 않았습니다.",
  }),
  student_ID: z.string().min(7, {
    message: "학번이 입력되지 않았습니다.",
  }),
  phone_number: z.string().min(13, {
    message: "전화번호가 입력되지 않았습니다. - 도 추가해야 합니다.",
  }),
})

function Auth() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    //@ts-ignore
    name: "",
    email: "",
    password: "",
    student_class: "",
    student_ID: "",
    phone_number: ""
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <div className="grid  place-content-center">
        <div className="grid">
          <div className="h-[10vh] lg:h-[10vh]"></div>
          <Tabs
            defaultValue="account"
            className="pl-[8vh] lg:pl-0 w-[80vw] lg:w-[30vw]"
          >
            <TabsList className="grid w-full grid-cols-2 lg:h-[4vh]">
              <TabsTrigger value="account" className="authtitle  lg:h-[3.3vh]">
                로그인
              </TabsTrigger>
              <TabsTrigger value="password" className="authtitle lg:h-[3.3vh]">
                회원가입
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
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
                    저희 서비스를 이용하기 전에 아래 정보를 기입해주시기
                    바람니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>이름</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>이메일</FormLabel>
                            <FormControl>
                              <Input placeholder="example@Test.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>비밀번호</FormLabel>
                            <FormControl>
                              <Input placeholder="영문숫자 포함 8자리 이상" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="student_class"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>학과</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="student_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>학번</FormLabel>
                            <FormControl>
                              <Input placeholder="00000000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>핸드폰 전화번호</FormLabel>
                            <FormControl>
                              <Input placeholder="010-0000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <br />
                      <div className="items-top flex space-x-2">
                        <Checkbox id="terms1" />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            개인정보수집에 동의합니다.
                          </label>
                        </div>
                      </div>
                      <br />
                      <Button type="submit" className="singup w-full">회원가입</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Auth;
