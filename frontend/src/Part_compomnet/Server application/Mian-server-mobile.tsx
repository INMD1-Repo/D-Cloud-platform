import Topnav from "../common parts/Nav";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = ["", "", "", ""];

function Main_server_mobile() {
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
        <div className="h-[10vh] md:h-[15vh]"></div>
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
                {/*단계별 안내*/}
                {activeStep == 0 ? (
                  //1단계
                  <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      <p style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                        사용자 정보 및 대여 기간 입력
                      </p>
                    </Typography>
                  </>
                ) : activeStep == 1 ? (
                  //2단계
                  <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      <p style={{ fontSize: "1.4em", fontWeight: "bold" }}>
                        서버 정보 입력
                      </p>
                    </Typography>
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
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "신청" : "다음"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}

export default Main_server_mobile;
