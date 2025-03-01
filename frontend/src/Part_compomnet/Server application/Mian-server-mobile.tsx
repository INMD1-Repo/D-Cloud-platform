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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

//-------내부 파츠 import-------
import Json_os from "./os.json";
//@ts-ignore
import { Terms_View } from "./part/Terms_of_Use";

const steps = ["", "", "", ""];

const FormSchema = z.object({
  Application_period: z.string(),
  Reason_for_renta: z.string(),
  Servername: z.string().min(1, "필수 항목입니다."),
  Username: z.string().min(1, "필수 항목입니다."),
  User_pw: z.string().min(5, "5자리 이싱 및 필수 항목입니다."),
  CPU: z.string().min(1, "필수 항목입니다."),
  RAM: z.string().min(1, "필수 항목입니다."),
  Storage: z.string().min(1, "필수 항목입니다."),
  Network_Requirements: z.string(),
  iamcheck: z.boolean().refine((val) => val === true, {
    message: "서비스 이용 약관에 동의해야 합니다.",
  }),
});

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

  return (
    <>
      <div className="p-5 md:p-20">
        <Topnav />
        <div className="h-[5vh]"></div>
        <div className="grid flex-nowrap">
          <p style={{ fontSize: "2em", fontWeight: "bold" }}>서버 신청</p>
          <p>서버 신청을 원하는 경우 아래 정보란에 입력해주세요.</p>
          <p style={{ fontSize: "0.8em" }}>
            서버 신청 승인은 평일에 이루어 짐니다.
          </p>
          <br />
          <br />
          <Box sx={{ width: "100%" }}>
            <Form {...form}>

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
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {activeStep === steps.length ? (
                  //마지막 단계에 표출되는 메세지
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      <p style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                        최종점검
                      </p>
                      다시 한번에 아래 신청 정보를 확인하시고 이상 없으면 신청 버튼을 눌려주세요.
                    </Typography>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">유형</TableHead>
                          <TableHead>입력값</TableHead>
                          <TableHead className="w-[100px]">유형</TableHead>
                          <TableHead>입력값</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">이름</TableCell>
                          <TableCell>{info.name}</TableCell>
                          <TableCell className="font-medium">전화번호</TableCell>
                          <TableCell>{info.phone_number}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">서버 이름</TableCell>
                          <TableCell>{form.getValues().Servername}</TableCell>
                          <TableCell className="font-medium">CPU Core</TableCell>
                          <TableCell>{form.getValues().CPU}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">램(GB)</TableCell>
                          <TableCell>{form.getValues().RAM}</TableCell>
                          <TableCell className="font-medium">스토리지(GB)</TableCell>
                          <TableCell>{form.getValues().Storage}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">계정 이름</TableCell>
                          <TableCell>{form.getValues().Username}</TableCell>
                          <TableCell className="font-medium">비빌번호</TableCell>
                          <TableCell>{form.getValues().User_pw}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2, gap: 4 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button type="submit">
                        신청서 체출
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {/*단계별 안내*/}
                    {activeStep == 0 ? (
                      //1단계 (대여 일정 입력)
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
                      //2단계 (서버 정보 입력)
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
                                <FormLabel>RAM(GB)</FormLabel>
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
                          <br />
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
                        <br />
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
                      </>
                    ) : activeStep == 2 ? (
                      //3단계 (네트워크 추가사항 입력)
                      <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          <p style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                            네트워크 및 기타 요청 입력
                          </p>
                        </Typography>
                        <FormField
                          control={form.control}
                          name="Network_Requirements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>네트워크 추가 사항</FormLabel>
                              <FormControl>
                                <Textarea
                                  className="h-40"
                                  placeholder="원하는 사항을 입력해주세요."
                                  { ...field }
                                />
                              </FormControl>
                              <FormMessage />
                              <AlertDialog>
                                <AlertDialogTrigger
                                  style={{ textDecoration: "underline" }}
                                >
                                  ℹ️ (필독) 만약 80,443 포트 및 도메인이 필요할 경우
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      만약 80,443 포트 및 도메인이 필요할 경우
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      리버스 프록시 서버를 통해 웹 사이트를 연결해
                                      드립니다.
                                      <br />
                                      443 및 80 포트는 관리자와 협의후 공인 IP가
                                      별도로 할당된 경우에만 직접 사용 가능합니다.{" "}
                                      <br />
                                      기존 사용자는 도메인을 연결 할경우 네트워크
                                      추가 요청 시 다음 정보를 기재해 주세요:
                                      <br />
                                      <br />
                                      [웹 도메인 연결 요청]
                                      <br />
                                      1. 내부망에서 사용할 웹 포트(ex: front 3000 ,
                                      backend 3002 ) <br />
                                      2. 원하시는 서브도메인 (선택사항) or 자신이
                                      연결할 도메인 주소
                                      <br />
                                      3. SSL 생성여부: Yes or No
                                      <br />
                                      <br />
                                      <hr />
                                      <br />
                                      위 정보를 네트워크 추가 양식에 기재해 주시면
                                      최대한 반영하여 설정해 드리겠습니다. <br />
                                      <br />
                                      ⚠️주의사항: 서브도메인이 필요하지만 별도로
                                      기재하지 않으신 경우, 관리자가 랜덤으로
                                      배정합니다.
                                      <br /> 문의사항이 있으시면 언제든 연락 주시기
                                      바랍니다.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogAction>확인</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </FormItem>
                          )}
                        ></FormField>
                      </>
                    ) : (
                      //4단계 (이용 약관 보기)
                      <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          <p style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                            이용 약관 확인 및 신청
                          </p>
                        </Typography>
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
                      </>
                    )}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        //@ts-ignore
                        sx={{ mr: 1 }}
                      >
                        뒤로
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button onClick={handleNext}>
                        다음
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </form>
            </Form>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Main_server_mobile;
