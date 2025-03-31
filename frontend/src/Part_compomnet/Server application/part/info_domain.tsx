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

  function Info_domain(){
    return(
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
    );
  }
  export default Info_domain;