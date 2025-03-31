import Topnav from "../common parts/Nav";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import Select from "react-select";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useAtom } from "jotai";
import { login_Count, User_info } from "@/store/strore_data";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Recommended from "./part/recommended";
//-------내부 파츠 import-------
import Json_os from "./os.json";
//@ts-ignore
import { Terms_View } from "./part/Terms_of_Use";
import Info_domain from "./part/info_domain";

interface userinfo {
  email: string;
  name: string;
  phone_number: string;
  password: string;
  student_id: string;
  created_at: string;
  updated_at: null;
  student_class: string;
  Admin: number;
}

// 데이터 스키마 설정
const FormSchema = z.object({
  Application_period: z.string(),
  Reason_for_renta: z.string(),
  Servername: z.string().min(1, "필수 항목입니다."),
  Username: z.string().min(1, "필수 항목입니다."),
  User_pw: z.string().min(5, "5자리 이싱 및 필수 항목입니다."),
  CPU: z
    .string({
      required_error: "필수 항목입니다.",
    })
    .min(1, { message: "필수 항목입니다" }),
  RAM: z
    .string({
      required_error: "필수 항목입니다.",
    })
    .min(1, { message: "필수 항목입니다" }),
  Storage: z
    .string({
      required_error: "필수 항목입니다.",
    })
    .min(1, { message: "필수 항목입니다" }),
  Network_Requirements: z.string(),
  iamcheck: z.boolean().refine((val) => val === true, {
    message: "서비스 이용 약관에 동의해야 합니다.",
  }),
});

function Main_server({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 366 + 20),
  });
  const navigate = useNavigate();
  const [userinfo] = useAtom(User_info);
  //@ts-ignore
  const info: userinfo = userinfo;
  const [logCount] = useAtom(login_Count);
  const [selectedOption, setSelectedOption] = useState("선택안함");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Application_period: "",
      Reason_for_renta: "",
      Servername: "",
      Username: "",
      User_pw: "",
      CPU: "",
      RAM: "",
      Storage: "",
      Network_Requirements: "",
      //@ts-ignore
      iamcheck: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // 사용자가 이 메시지가 안떠 자주 보내는 문제점 발견하여 수정함
    toast.warning(
      "서버 전송하고 있습니다. 성공적으로 제출했습니다 라고 뜰때까지 기다려 주십시오.",
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
    );
    if (logCount == 1) {
      let json = data;
      //@ts-ignore
      json.name = info.name;
      //@ts-ignore
      json.email = info.email;
      //@ts-ignore
      json.phone_number = info.phone_number;
      //@ts-ignore
      json.os = selectedOption.label;
      //@ts-ignore
      json.date = date;

      await fetch(
        //@ts-ignore
        `/api/server_application/?writename=${info.name}&email=${info.email}&type=user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
        }
      )
        .then((response) => {
          if (response.status == 201) {
            toast.success(
              "성공적으로 제출 했습니다. \n 관리자에게 문자가 올때까지 기다려 주세요.",
              {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              }
            );
            setTimeout(() => {
              navigate("/site/");
            }, 2000);
          }
        })
        .catch(() => {
          toast.error("다시 제출해주시기 바람니다.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        });
    } else {
      toast.error("로그인을 하고 제출해주시기 바람니다.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/site/");
      }, 2000);
    }
  }

  return (
    <>
      <div className="p-5 md:p-20">
        <Topnav />
        <div className="h-[10vh] md:h-[10vh]"></div>
        <div className="gird justify-start flex-nowrap">
          <div>
            <p className="flex server_title">서버 신청</p>
            <p className="server_sub_title">
              서버 신청을 원하는 경우 아래 정보란에 입력해주세요.
            </p>
            <p>서버 신청 승인은 평일에 이루어 짐니다.</p>
          </div>
          <br />
          <div className="justify-items-center ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:flex gap-x-8 grow">
                  <div className="grid">
                    <p className="flex server_sub_sub_title">사용자 정보</p>
                    <Label htmlFor="terms">이름</Label>
                    <Input placeholder={info.name} disabled />
                    <Label htmlFor="terms">이메일</Label>
                    <Input placeholder={info.email} disabled />
                    <Label htmlFor="terms">전화번호</Label>
                    <Input placeholder={info.phone_number} disabled />
                    <p className="flex server_sub_sub_title">대여 정보</p>
                    <div className={cn("grid gap-2", className)}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>날짜를 선택하세요.</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormField
                        control={form.control}
                        name="Application_period"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>대여사유</FormLabel>
                            <FormControl>
                              <Textarea
                                className="h-60"
                                placeholder=""
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                    </div>
                  </div>
                  <div className="grid">
                    <p className="flex server_sub_sub_title">서버 정보</p>
                    <FormField
                      control={form.control}
                      name="Servername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>서버 이름</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                    <FormItem>
                      <FormLabel>운영체제</FormLabel>
                      <FormControl>
                        <Select
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                          defaultValue={selectedOption}
                          //@ts-ignore
                          onChange={setSelectedOption}
                          //@ts-ignore
                          options={Json_os.OS}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <div className="flex gap-x-4 mt-4">
                      <FormField
                        control={form.control}
                        name="CPU"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPU(Core)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                className=""
                                placeholder="입력해주세요"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="RAM"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>RAM(GB)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                className=""
                                placeholder="입력해주세요"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="Storage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Storage(GB)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                className=""
                                placeholder="입력해주세요"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                    </div>
                    <div className="mt-4">
                      <Recommended />
                    </div>
                    <p className="flex server_sub_sub_title mt-4">
                      서버 계정 정보
                    </p>
                    <div className="flex gap-x-4">
                      <FormField
                        control={form.control}
                        name="Username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>일반 계정 이름</FormLabel>
                            <FormControl>
                              <Input
                                className=""
                                placeholder="입력해주세요"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="User_pw"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>일반 계정 비밀번호</FormLabel>
                            <FormControl>
                              <Input
                                className=""
                                placeholder="입력해주세요"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                    </div>

                    <FormField
                      control={form.control}
                      name="Network_Requirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>네트워크 추가 사항</FormLabel>
                          <FormControl>
                            <Textarea
                              className="h-40"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <Info_domain />
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                  <div>
                    <p className="flex server_sub_sub_title">이용 약관</p>
                    <Terms_View />
                    <br />
                    <FormField
                      control={form.control}
                      name="iamcheck"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: field.value
                                  ? "#4caf50"
                                  : "#fff",
                                border: "2px solid #000",
                              }}
                              //@ts-ignore
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <span>
                            {" "}
                            본 서비스를 이용하기 위해 서비스 이용약관에
                            동의합니다.
                          </span>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                    <br />
                    <div className="justify-self-end">
                      <Button type="submit" className=" w-full">
                        신청서 체출
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Main_server;
