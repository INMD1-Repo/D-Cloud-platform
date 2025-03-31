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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Recommended() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger style={{ textDecoration: "underline" }}>
          ℹ️ (필독) 서비스별 권장 VM 사양
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>서비스별 권장 VM 사양</AlertDialogTitle>
            <AlertDialogDescription>
              아래 보이는 표를 기준으로 서버 사양을 기입해주세요. 너무 과한 서버
              용량 표기는 거절사유에 포함됨니다.
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">서비스 내용</TableHead>
                    <TableHead>CPU(Core)</TableHead>
                    <TableHead>RAM(GB)</TableHead>
                    <TableHead>Storage(GB)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>웹서버(간단한)</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>0~30</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>웹서버</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>1~2</TableCell>
                    <TableCell>0~80</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>데이터베이스(단독)</TableCell>
                    <TableCell>1~2</TableCell>
                    <TableCell>1~2</TableCell>
                    <TableCell>0~100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>API(DB+Web)</TableCell>
                    <TableCell>1~2</TableCell>
                    <TableCell>2~4</TableCell>
                    <TableCell>0~100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Back+Front</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>0~150</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Recommended;
