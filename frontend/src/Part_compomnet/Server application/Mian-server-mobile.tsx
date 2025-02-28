import Topnav from "../common parts/Nav";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@/components/ui/button";
import Typography from "@mui/material/Typography";
import { login_Count, User_info } from "@/store/strore_data";
import { useAtom } from "jotai";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";
import Json_os from "./os.json";

const steps = ["", "", "", ""];

const FormSchema = z.object({
  Application_period: z.string(),
  Reason_for_renta: z.string(),
  Servername: z.string(),
  Username: z.string(),
  User_pw: z.string(),
  CPU: z.string(),
  RAM: z.string(),
  Storage: z.string(),
  Network_Requirements: z.string(),
  iamcheck: z.boolean().refine((val) => val === true, {
    message: "서비스 이용 약관에 동의해야 합니다.",
  }),
});

const source = `
# **제1장 총칙**

### **제1조 (목적)**
본 약관은 **DCloud(이하 '기관')**가 제공하는 **서버 호스팅 및 코로케이션 서비스(이하 '서비스')**를 이용하는 고객(이하 '고객') 간의 서비스 이용 조건, 절차 및 권리와 의무에 관한 사항을 규정하는 것을 목적으로 합니다.

### **제2조 (약관의 효력 및 변경)**
1. 본 약관은 고객이 이메일을 통해 동의 의사를 밝힘으로써 효력이 발생합니다.
2. 본 약관은 기관의 웹사이트에도 게시됩니다.  
   - **홈페이지:** https://asw-dcp.o-r.kr/
3. 약관의 효력은 고객이 서비스 이용을 신청한 시점부터 서비스가 종료되고 모든 정산이 완료된 시점까지 유지됩니다.
4. 기관은 관련 법령에 위배되지 않는 범위 내에서 합리적인 사유가 있을 경우 약관을 변경할 수 있습니다.
5. 요금 및 고객 권리·의무에 중대한 영향을 미치는 변경 사항은 최소 **4일 이전**에 공지되며, 공지 후 그 효력이 발생합니다.
6. 고객은 변경된 약관에 동의하지 않을 권리가 있으며, 동의하지 않을 경우 서비스 이용 계약 해지를 요청할 수 있습니다.
7. 변경된 약관 효력 발생 이후에도 서비스를 계속 이용하는 경우, 해당 변경 사항에 동의한 것으로 간주됩니다.

### **제3조 (약관의 적용)**
1. 본 약관에 명시되지 않은 사항은 관계 법령, 개별 이용 계약서, 서비스별 안내에 따릅니다.
2. 그 외 사항은 관련 업계의 관행을 기준으로 해석됩니다.

---

# **제2장 서비스 이용**

### **제4조 (서비스의 제공)**
1. 기관은 업무상 또는 기술적 이유가 없는 한 연중무휴 24시간 서비스를 제공합니다.
2. 다음과 같은 경우 서비스가 일시적으로 중단될 수 있습니다.
   - 정기점검, 시스템 업그레이드 등 사전 통지가 가능한 경우
   - 긴급 장애 발생 시 불가피한 경우 사후 통지 가능

### **제5조 (서비스 이용의 제한)**
기관은 다음의 경우 고객의 서비스 이용을 제한하거나 중단할 수 있습니다.
- 1. 타인의 서비스 이용 방해 또는 정상 운영 저해 시  
- 2. 사회적 공익이나 국익을 저해할 목적으로 서비스 이용 시  
- 3. 범죄 행위를 목적으로 서비스 이용 시  
- 4. 법적 위반 또는 불법 콘텐츠 업로드 시  
- 5. 허위 정보로 기재하여 가입한 경우우

---

# **제3장 의무 및 책임**

### **제6조 (기관의 의무)**
1. 기관은 고객이 신청한 서비스 개통일에 특별한 사유가 없는 한 서비스를 제공합니다.
2. 안정적 서비스 제공을 위해 장애 발생 시 지체 없이 수리 또는 복구 조치를 취합니다.
3. 고객 정보를 법적 보호 범위 내에서 안전하게 관리하며, 고객 동의 없이 제3자에게 제공하지 않습니다.

### **제7조 (고객의 의무)**
1. 고객은 기관이 제공한 설비를 선량한 관리자의 주의 의무를 다해 관리해야 합니다.
2. 고객은 제공받은 서비스를 무단으로 제3자에게 양도하거나 대여할 수 없습니다.
3. 서버 및 데이터 보안 관리는 고객의 책임이며, 부정 접속 및 외부 침입 방지 조치를 취해야 합니다.
4. 고객은 서비스 이용과 관련된 법률 및 본 약관을 준수해야 하며, 위반 시 발생하는 문제에 대해 책임을 집니다.

---

# **제4장 계약의 해지 및 이용 제한**

### **제8조 (계약 해지 및 이용 제한)**
1. 고객이 계약을 해지하려면 해지 희망일 최소 **30일 전**에 서면 또는 전자우편으로 기관에 통보해야 합니다.
2. 기관은 다음의 경우 사전 통지 없이 즉시 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.
   - 1. 법적 위반 또는 불법 행위가 있는 경우
   - 2. 서버에 심각한 손상을 주거나 타인에게 피해를 준 경우
   - 3. 타인의 명예를 훼손하거나 불이익을 주는 행위를 한 경우
   - 4. 서비스 정상 운영을 방해한 경우

---

# **제5장 데이터 관리 책임**

### **제9조 (데이터 보관 및 책임)**
1. 기관은 안정적 서비스 제공을 위해 노력하지만, 데이터 보관의 안전성을 보장하지 않습니다.
2. 고객은 데이터 손실에 대비해 정기적으로 백업을 유지할 책임이 있습니다.
3. 데이터 손실, 훼손, 멸실에 대한 책임은 고객에게 있으며 기관은 이에 대해 어떠한 책임도 지지 않습니다. 이는 기관의 과실로 인한 경우에도 적용됩니다.
4. 서비스 해지 또는 계약 종료 시, 기관은 고객 데이터를 즉시 삭제할 수 있으며 이에 대한 책임을 지지 않습니다.
5. 고객이 별도 요청하지 않는 한, 기관은 데이터 백업을 수행하지 않습니다. 데이터 관리 책임은 전적으로 고객에게 있습니다.
6. 서버에 저장된 데이터가 어떠한 이유로 상실되더라도 기관은 손해에 대한 책임을 지지 않습니다.

---

# **제6장 대여 기간 및 신청 우선순위**

### **제10조 (대여 기간 확인 및 무통보 해제)**
1. 기관은 대여 기간 확인을 위해 아래 절차를 진행합니다.
   - **안내 메일 발송:** 각 분기의 **첫 번째 달**에 고객에게 대여 기간 및 연장 안내 메일 발송
   - **관리자 확인:** 각 분기의 **마지막 달**에 대여 기간 확인 진행
2. 고객은 **마지막 달 말일까지** 연장 또는 해지 의사를 회신해야 합니다.
3. 회신이 없을 경우 기관은 **별도 통보 없이 서비스 해지 및 데이터 삭제**를 진행할 수 있습니다.
4. 이로 인한 데이터 손실 및 서비스 중단에 대한 책임은 고객에게 있습니다.

### **제11조 (신청 우선순위 및 차등 신청 비율)**
1. 서비스 신청은 아래 **우선순위 및 차등 신청 비율**에 따라 접수 및 선발합니다.

#### **우선순위**
- **1순위:** 응용소프트웨어공학전공 (890-1987)
- **2순위 이하:** 차등 신청 비율 적용 학과  
  - 컴퓨터소프트웨어공학전공 (890-1987)    
  - 컴퓨터공학과 (890-1704)  
  - 인공지능학과 (890-2176)  
  - 전기공학과 (890-1674)  
  - 전자공학과 (890-1674)  
  - 정보통신공학 (890-2176)  
  - 디지털콘텐츠학과 (890-2720)  
  - 게임공학과 (890-2720)  
  - 영화학과 (890-2176)  

2. 신청 인원이 초과될 경우 **우선순위 및 차등 신청 비율**을 기준으로 선발합니다.
3. 차등 신청 비율은 운영 방침 및 학과별 신청 현황에 따라 변경될 수 있습니다.

`;

function Main_server_mobile({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  //---------------------------------------------------------
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 366 + 20),
  });
  const navigate = useNavigate();
  const [userinfo] = useAtom(User_info);

  //@ts-ignore
  const info: userinfo = userinfo;

  const [logCount] = useAtom(login_Count);
  const [selectedOption, setSelectedOption] = React.useState("선택안함");

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
    console.log("click");

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
        .then((response: { status: number }) => {
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
  //---------------------------------------------------------
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <div className="p-5 md:p-20">
        <Topnav />
        <div className="h-[5vh]"></div>
        <div className="grid justify-start flex-nowrap">
          <p style={{ fontSize: "2em", fontWeight: "bold" }}>서버 신청</p>
          <p>서버 신청을 원하는 경우 아래 정보란에 입력해주세요.</p>
          <p style={{ fontSize: "0.8em" }}>
            서버 신청 승인은 평일에 이루어 짐니다.
          </p>
          <br />
          <br />
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              //마지막 단계에 표출되는 메세지
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Form {...form}>
                  {/*단계별 안내*/}
                  {activeStep == 0 ? (
                    //1단계
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        <p style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                          사용자 정보 및 대여 기간 입력
                        </p>
                        <br />
                        <p style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                          사용자 정보
                        </p>
                        <Label htmlFor="terms">이름</Label>
                        <Input placeholder={info.name} disabled />
                        <Label htmlFor="terms">이메일</Label>
                        <Input placeholder={info.email} disabled />
                        <Label htmlFor="terms">전화번호</Label>
                        <Input placeholder={info.phone_number} disabled />
                      </Typography>
                      <br />
                      <p style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                        대여 정보
                      </p>
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
                                  className="h-30"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                    </>
                  ) : activeStep == 1 ? (
                    //2단계
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        <p style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                          서버 정보 입력
                        </p>
                      </Typography>
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
                      <div className="flex gap-x-4 mt-4">
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
                    </>
                  ) : activeStep == 2 ? (
                    //3단계
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        <p style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                          네트워크 및 기타 요청 입력
                        </p>
                      </Typography>
                    </>
                  ) : (
                    //4단계
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        <p style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                          이용 약관 확인 및 신청
                        </p>
                      </Typography>
                    </>
                  )}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      뒤로
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "신청" : "다음"}
                    </Button>
                  </Box>
                </Form>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}

export default Main_server_mobile;
