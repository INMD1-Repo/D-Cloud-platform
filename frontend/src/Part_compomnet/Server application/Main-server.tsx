// import { useNavigate } from "react-router-dom";
import Topnav from "../common parts/Nav";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

// import { isMobile } from 'react-device-detect';
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
import { Card } from "@/components/ui/card";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useAtom } from "jotai";
import { login_Count, User_info } from "@/store/strore_data";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

const source = `
# 서비스 이용약관

## 제1장 총칙

### 제1조 (목적)

본 약관은  DCloud(이하 '기관'이라 합니다)가 제공하는 서버 호스팅 및 코로케이션 서비스(이하 '서비스')를 이용하는 고객(이하 '고객') 간에, 서비스의 이용 조건 및 절차, 권리와 의무에 관한 사항을 규정하는 것을 목적으로 합니다.

### 제2조 (약관의 효력 및 변경)

1. 본 약관은 고객이 이메일을 통해 동의 의사를 밝힘으로써 효력이 발생합니다. 또한, 약관은 기관의 웹사이트에도 게시됩니다(홈페이지: https://dcp.powerinmd.com/site/).
2. 약관의 효력은 고객이 서비스 이용을 신청한 시점부터, 서비스가 종료되고 모든 정산이 완료된 시점까지 유지됩니다.
3. 기관은 관련 법령에 위배되지 않는 범위 내에서, 합리적인 사유가 있을 경우 약관을 변경할 수 있습니다. 중요한 사항(요금, 고객 권리 또는 의무에 중대한 영향을 미치는 변경)은 최소 7일 이전에 공지되며, 공지 후 그 효력이 발생합니다.
4. 고객은 변경된 약관에 대해 동의하지 않을 권리가 있으며, 동의하지 않을 경우 서비스 이용 계약 해지를 요청할 수 있습니다. 변경된 약관의 효력 발생 이후에도 서비스를 계속 이용하는 경우, 해당 변경 사항에 동의한 것으로 간주됩니다.

### 제3조 (약관의 적용)

본 약관에 명시되지 않은 사항은 관계 법령, 개별 이용 계약서의 내용, 또는 서비스별 안내에 따릅니다. 그 외 사항은 관련 업계의 관행을 기준으로 해석됩니다.

## 제2장 서비스 이용

### 제4조 (서비스의 제공)

1. 기관은 업무상 또는 기술적 이유가 없는 한, 연중무휴로 하루 24시간 서비스를 제공합니다.
2. 기관은 정기점검, 시스템 업그레이드 등의 사유로 서비스 제공을 일시적으로 중단할 수 있으며, 사전 통지를 원칙으로 합니다. 불가피한 경우에는 사후 통지를 할 수 있습니다.

### 제5조 (서비스 이용의 제한)

기관은 다음의 경우 고객의 서비스 이용을 제한하거나 중단할 수 있습니다:

1. 타인의 서비스 이용을 방해하거나 정상적인 운영을 저해하는 경우
2. 사회적 공익이나 국익을 저해하는 목적으로 서비스를 이용하는 경우
3. 범죄 행위를 목적으로 서비스를 이용하는 경우
4. 법적 위반 또는 불법 콘텐츠 업로드 등의 행위가 있을 경우

## 제3장 의무 및 책임

### 제6조 (기관의 의무)

1. 기관은 고객이 신청한 서비스 개통일에, 특별한 사유가 없는 한 서비스를 제공해야 합니다.
2. 기관은 안정적인 서비스 제공을 위해 설비에 장애가 발생할 경우 지체 없이 수리 또는 복구 조치를 취합니다.
3. 기관은 고객의 정보를 법적 보호 범위 내에서 안전하게 관리하며, 고객의 개인정보를 제3자에게 제공하지 않습니다.

### 제7조 (고객의 의무)

1. 고객은 기관이 제공하는 설비를 선량한 관리자의 주의 의무를 다해 관리해야 하며, 무단으로 제3자에게 양도하거나 대여할 수 없습니다.
2. 고객은 자신의 서버 및 데이터 보안 관리를 책임지며, 서버에 대한 부정 접속 및 외부 침입 방지 조치를 취해야 합니다.
3. 고객은 서비스 이용과 관련하여 법률 및 본 약관을 준수해야 하며, 위반 시 발생하는 문제에 대해 책임을 집니다.

## 제4장 계약의 해지 및 이용 제한

### 제8조 (계약 해지 및 이용 제한)

1. 고객이 서비스 이용 계약을 해지하려면, 해지 희망일 최소 30일 전에 기관에 서면 또는 전자 우편으로 통보해야 합니다.
2. 기관은 다음의 경우 사전 통지 없이 즉시 서비스 이용을 제한하거나 계약을 해지할 수 있습니다:
    - 법적 위반 또는 불법 행위를 한 경우
    - 서버에 심각한 손상을 주거나 타인에게 피해를 준 경우
    - 타인의 명예를 훼손하거나 불이익을 주는 행위를 한 경우
    - 서비스의 정상적 운영을 방해한 경우

## 제5장 데이터 관리 책임

### 제9조 (데이터 보관 및 책임)

1. 기관은 서비스의 안정적 제공을 위해 노력하나, 데이터의 안전한 보관을 보장하지 않습니다.
2. 고객은 데이터 손실에 대비해 정기적으로 백업을 유지할 책임이 있습니다.
3. 데이터 손실, 훼손, 멸실에 대한 책임은 고객에게 있으며, 기관은 이러한 손해에 대해 어떠한 책임도 지지 않습니다. 이는 기관의 과실로 인한 경우에도 적용됩니다.
4. 서비스 해지 또는 계약 종료 시, 기관은 고객의 모든 데이터를 즉시 삭제할 수 있으며, 이에 대한 책임을 지지 않습니다.
5. 데이터 손실로 인해 발생하는 직접적, 간접적, 부수적 또는 파생적 손해에 대해 기관은 책임을 지지 않습니다.
6. 기관은 고객이 별도로 요청하지 않는 한 데이터 백업을 수행하지 않습니다. 고객은 자신의 데이터 백업에 대한 전적인 책임이 있습니다.
7. 기존에 서버에 저장되어 있던 데이터가 어떠한 이유로든 상실된 경우, 이에 대한 책임은 전적으로 고객에게 있습니다. 기관은 이로 인해 발생하는 어떠한 손해에 대해서도 책임을 지지 않습니다.
`;

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

const FormSchema = z.object({
  Application_period: z.string(),
  Reason_for_renta: z.string(),
  Servername: z.string().min(1, "필수 항목입니다."),
  Username: z.string().min(1, "필수 항목입니다."),
  User_pw: z.string().min(5, "5자리 이싱 및 필수 항목입니다."),
  root_pw: z.string().min(5, "5자리 이싱 및 필수 항목입니다."),
  CPU: z.string().min(1, "필수 항목입니다."),
  RAM: z.string().min(1, "필수 항목입니다."),
  Storage: z.string().min(1, "필수 항목입니다."),
  Network_Requirements: z.string(),
  iamcheck: z.boolean().refine((val) => val === true, {
    message: "서비스 이용 약관에 동의해야 합니다.",
  }),
});

const options = [
  { value: "ubuntu24", label: "Ubuntu 24.04.1 LTS" },
  { value: "ubuntu22", label: "Ubuntu 22.04.5 LTS" },
  { value: "ubuntu20", label: "Ubuntu 20.04.6 LTS" },
  { value: "ubuntu18", label: "Ubuntu 18.04.6 LTS" },
  { value: "debian", label: "Debian 12.8.0" },
  { value: "rocky9", label: "Rocky 9.5" },
  { value: "rocky8", label: "Rocky 8.9" },
];

function Main_server({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
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
      root_pw: "",
      CPU: "",
      RAM: "",
      Storage: "",
      Network_Requirements: "",
      //@ts-ignore
      iamcheck: false,
    },
  });

  // const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("click");
    
    if (logCount == 1) {
      let json = data;
      //@ts-ignore
      json.name =  info.name;
      //@ts-ignore
      json.email =  info.email;
      //@ts-ignore
      json.phone_number =  info.phone_number;
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
                          options={options}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <div className="flex gap-x-4">
                      <FormField
                        control={form.control}
                        name="CPU"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPU(Core)</FormLabel>
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
                        name="RAM"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>RAM(MB)</FormLabel>
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
                        name="Storage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Storage(GB)</FormLabel>
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
                    <p className="flex server_sub_sub_title">서버 계정 정보</p>
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
                      <FormField
                        control={form.control}
                        name="root_pw"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>루트 계정 비빌번호</FormLabel>
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
                            <Textarea className="h-40" placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                  <div>
                    <p className="flex server_sub_sub_title">이용 약관</p>
                    <Card
                      className="md:w-[30vw] p-4 h-[40vh]"
                      style={{ overflowX: "auto", overflowY: "auto" }}
                    >
                      <MarkdownPreview
                        source={source}
                        style={{ padding: 16 }}
                      />
                    </Card>
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
