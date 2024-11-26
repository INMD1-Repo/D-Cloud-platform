import { Button } from "@/components/ui/button";
import { useAtom, useSetAtom } from 'jotai'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useNavigate } from "react-router-dom";
import { login_Count, Access_jwt } from "@/store/strore_data";
const FormSchema = z.object({
  name: z.string().min(1, {
    message: "이름이 입력되지 않았습니다.",
  }),
  email: z.string().min(1, {
    message: "이메일이 입력되지 않았습니다.",
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
  check_value: z.boolean().default(false).optional(),
})


function Auth() {
  const navigate = useNavigate();
  const [logCount, setlogCount] = useAtom(login_Count);
  const setAccessjwt = useSetAtom(Access_jwt);

  const [values, setValues] = useState({
    result: false,
  });

  const [inputs, setInputs] = useState({
    email_login: '',
    password_login: '',
  });

  //@ts-ignore
  const { email_login, password_login } = inputs;
  //@ts-ignore
  const onlogin = (e) => {
    const { name, value } = e.target;

    const nextInputs = {
      //spread 문법. 현재 상태의 내용이 이 자리로 온다. 
      ...inputs,
      [name]: value,
    };
    //객체를 새로운 상태로 쓰겠다. 
    setInputs(nextInputs);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    //@ts-ignore
    check_value: false,
    name: "",
    email: "",
    password: "",
    student_class: "",
    student_ID: "",
    phone_number: ""
  })

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("Test");

    if (values.check_value) {
      delete values.check_value;
      await fetch("http://phpproject.powerinmd.com/api/singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      }).then((response) => {
        if (response.status == 201) {
          toast.success("회원가입 성공 했습니다.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
    } else {
      toast.error("수집동의에 체크표시 해주세요.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    }

  }

  async function login() {
    await fetch("https://phpproject.powerinmd.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": inputs.email_login,
        "password": inputs.password_login
      })
    }).then((response) => {
      if (response.status == 200) {
        toast.success("로그인에 성공 했습니다.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
        setTimeout(() => {
          setAccessjwt(response.json())
          setlogCount(1);
          navigate("/site/")
        }, 2000);
      } else {
        setValues({ result: !values.result })
      }
    })
  }

  const handleConfirm = () => {
    setValues({ result: !values.result })
  };

  useEffect(() => {
    if (logCount == 1) {
      navigate("/site/")
    }
  }, [])
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
                        <Input name="email_login" onChange={onlogin} id="email_login" type="email" placeholder="" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">비밀번호</Label>
                        <Input name="password_login" type="password" onChange={onlogin} id="passowrd_login" placeholder="" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="p-3 lg:p-7">
                  <Button onClick={() => { login(); }} className="singup w-full">로그인</Button>
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
                      <FormField
                        control={form.control}
                        name="check_value"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <span> 본서비스를 이용할때 개인정보 수집에 동의합니다.</span>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <br />
                      <Button type="submit" className="singup w-full">회원가입</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <ToastContainer />
          <AlertDialog open={values.result}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>제출중 오류가 발생함</AlertDialogTitle>
                <AlertDialogDescription>
                  아이디나 비빌번호가 틀렸습니다. 다시 입력해주길 바람니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}

export default Auth;
