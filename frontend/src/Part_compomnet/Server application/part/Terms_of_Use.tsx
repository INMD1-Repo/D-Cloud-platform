import { Card } from "@/components/ui/card";
import MarkdownPreview from "@uiw/react-markdown-preview";

const source = `
## 제1조 (목적 및 정의)

① 이 약관은 Dcloud(이하 "제공기관")이 제공하는 DCloud VM(이하 "서비스")의 이용과 관련하여 제공기관와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다. <br/>
② 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.

1.  "서비스"라 함은 제공기관가 회원에게 제공하는 가상 서버, 스토리지, 네트워크 등 클라우드 컴퓨팅 자원 및 관련 제반 서비스를 의미합니다.
2.  "회원"이라 함은 이 약관에 따라 제공기관와 이용계약을 체결하고 제공기관가 제공하는 서비스를 이용하는 자를 말합니다.
3.  "계정"이라 함은 회원의 식별과 서비스 이용을 위하여 회원이 선정하고 제공기관가 부여하는 문자, 숫자 또는 특수문자의 조합을 의미합니다.
4.  이 약관에서 사용하는 용어의 정의는 본 조에서 정하는 것을 제외하고는 관계 법령 및 서비스별 안내에서 정하는 바에 따릅니다.

③ 본 서비스는 학과 기기를 기반으로 운영되며, 회원의 비상업적 프로젝트, 개발, 연구 활동을 지원하는 것을 근본 목적으로 합니다.

## 제2조 (약관의 게시와 개정)

① 제공기관는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면 또는 연결 화면에 게시합니다.<br/>
② 제공기관는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br/>
③ 제공기관가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 제1항의 방식에 따라 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.<br/>
④ 회원은 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 이용계약을 해지(회원 탈퇴)할 수 있습니다.<br/>
⑤ 제공기관가 제3항에 따라 개정약관을 공지 또는 통지하면서 회원에게 일정 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 공지 또는 통지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 개정약관에 동의한 것으로 봅니다.<br/>

## 제3조 (이용계약 체결 및 계정 관리)

① 이용계약은 서비스를 이용하고자 하는 자(이하 "가입신청자")가 약관의 내용에 대하여 동의를 한 다음 제공기관가 정한 절차에 따라 이용신청을 하고, 제공기관가 이러한 신청에 대하여 승낙함으로써 체결됩니다.<br/>
② 제공기관는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.

1.  가입신청자가 이 약관에 의하여 이전에 회원 자격을 상실한 적이 있는 경우
2.  실명이 아니거나 타인의 명의를 이용한 경우
3.  허위의 정보를 기재하거나, 제공기관가 제시하는 내용을 기재하지 않은 경우
4.  회원의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우
5.  기술적, 물리적으로 서비스 제공이 불가능하다고 판단되는 경우

③ 회원은 자신의 계정 정보 및 비밀번호의 보안에 대한 일차적인 책임이 있으며, 자신의 계정을 타인에게 양도하거나 이용하게 해서는 안 됩니다.<br/>

④ 회원은 자신의 계정이 도용되거나 제3자에 의해 사용되고 있음을 인지한 경우에는 이를 즉시 제공기관에 통지하고 제공기관의 안내에 따라야 합니다. 이를 소홀히 하여 발생하는 모든 불이익에 대한 책임은 회원 본인에게 있습니다.<br/>


## 제4조 (서비스의 제공 및 범위)

① 제공기관는 회원에게 가상 서버 인스턴스, 스토리지, 네트워크 자원 등 제공기관가 정한 범위 내의 서비스를 제공합니다. 서비스의 구체적인 내용 및 범위는 서비스 웹사이트를 통해 안내합니다.<br/><br/>
② 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 단, 제공기관는 시스템 정기점검, 증설 및 교체, 보안 문제 해결, 기타 운영상 상당한 이유가 있는 경우 서비스의 전부 또는 일부를 일시적으로 중단할 수 있습니다.<br/><br/>
③ 본 서비스는 회원의 프로젝트 및 개발 활동을 지원하기 위해 제공되는 것으로, "있는 그대로(as-is)" 그리고 "이용 가능한 대로(as-available)"의 원칙에 따라 제공됩니다. 제공기관는 서비스의 특정 목적에의 적합성, 완전성, 안정성, 계속성을 보증하지 않습니다.<br/>

## 제5조 (금지 행위 및 상업적 이용 제한)

회원은 다음 각 호에 해당하는 행위를 하여서는 안 됩니다.

1.  제6조에 따라 사전에 제공기관의 서면 승인을 받은 경우를 제외하고, 서비스를 직접 또는 간접적으로 이용하여 이윤을 추구하는 모든 형태의 상업적, 영리적, 직업적 활동
2.  제공기관 및 제3자의 저작권 등 지적재산권을 침해하는 행위 
3.  제공기관 및 제3자의 명예를 손상시키거나 업무를 방해하는 행위
4.  해킹, 악성 프로그램 유포, 서비스 거부 공격(DoS), 시스템 취약점 스캐닝 등 서비스의 안정적인 운영을 방해하거나 정보통신망에 장애를 유발하는 행위 
5.  제공기관의 동의 없이 타인의 개인정보를 수집, 저장, 공개하는 행위
6.  암호화폐 채굴, 상업적 광고 발송, 프로젝트 및 개발 목적과 무관한 대규모 파일 공유 서버 운영 등 제공기관의 자원을 과도하게 점유하거나 본래 목적에 맞지 않게 사용하는 행위
7.  현행 법령, 이 약관 및 제공기관가 정한 기타 이용 조건에 위배되는 일체의 행위

## 제6조 (창업 목적 이용에 관한 특별 규정)

① 제공기관는 회원들의 기술 개발 성과의 사업화 및 창업 활동을 장려하기 위한 목적으로, 제5조 제1호에도 불구하고 예외적으로 서비스의 창업 준비 목적 이용을 허용할 수 있습니다.
② 본 조에 따른 이용은 '상업적 활동의 개시'가 아닌 '개발 기반의 예비 창업 활동'으로 정의되며, 반드시 사전에 제공기관가 지정한 관리자의 서면 승인을 받아야 합니다.
③ 관리자의 승인을 받고자 하는 회원은 다음 각 호의 사항을 포함한 이용 계획서를 제출하여야 합니다.

1.  프로젝트가 제공기관의 공식 활동 또는 제공기관에서 승인한 프로젝트와 직접적으로 연계되어 있음을 증명하는 자료
2.  프로젝트의 기술적 내용, 목표 및 비상업적 개발 단계임을 명시하는 계획
3.  외부 투자 유치 또는 법인 설립 등 본격적인 상업화 단계에 진입할 경우, DCloud 자원에서 외부 상용 서비스로 이전하기 위한 구체적인 계획 및 일정
4.  프로젝트 결과물에 대한 지식재산권 귀속 및 처리에 관한 동의

④ 관리자 제출된 계획서를 심의하여 승인 여부를 결정하며, 필요한 경우 이용 기간 제한 등 조건을 부가할 수 있습니다. 승인되지 않은 창업 관련 활동은 제5조 제1호에 따른 무단 상업적 이용으로 간주됩니다.


## 제7조 (회원의 의무 및 데이터 관리)

① 회원은 관계 법령, 이 약관의 규정, 이용 안내 및 서비스와 관련하여 공지한 주의사항, 제공기관(자)가 통지하는 사항 등을 준수하여야 하며, 기타 제공기관의 운영에 방해되는 행위를 하여서는 아니 됩니다.<br/>
② 회원은 서비스 내에 저장하는 모든 데이터 및 콘텐츠에 대한 법적 책임을 부담합니다.<br/>
③ 회원은 자신의 데이터를 안전하게 보존하기 위해 스스로 정기적인 백업을 수행할 책임이 있습니다. 제공기관는 데이터의 유실, 손상 등에 대비하여 자체적인 서버 백업을 수행할 수 있으나, 이는 서비스의 재해 복구를 위한 것일 뿐 회원 개별 데이터의 복구를 보장하지 않습니다.<br/>


## 제8조 (서비스 이용의 제한, 정지 및 계약 해지)

① 제공기관는 다음 각 호에 해당하는 경우, 회원의 서비스 이용을 사전 통지 없이 즉시 제한하거나 정지할 수 있습니다.

1.  회원의 행위가 서비스의 안정성, 보안에 심각하고 급박한 위협을 초래한다고 판단되는 경우
2.  해킹, 대규모 트래픽 유발 등 다른 회원 및 전체 시스템에 중대한 장애를 야기하는 경우
3.  제5조 제1호의 상업적 이용 금지 규정을 고의적으로 또는 반복적으로 위반한 경우
4.  저작권 침해, 불법 정보 유통 등 현행법을 명백히 위반하여 수사기관의 수사 대상이 된 경우
5.  타인의 계정을 도용하거나 시스템을 해킹하여 제공기관 또는 타인에게 심각한 피해를 입힌 경우
6.  제공기관의 시정 요구 또는 경고를 2회 이상 받고도 동일한 위반 행위를 반복하는 경우

② 제공기관는 회원이 제5조의 금지 행위를 하거나 이 약관상의 의무를 위반하는 경우, 위반의 정도에 따라 경고, 일시 정지, 영구 이용 정지(계약 해지) 등의 조치를 단계적으로 또는 즉시 취할 수 있습니다.<br/>
③ 제2항에 따른 조치를 취할 경우, 제공기관는 원칙적으로 회원에게 사전에 통지하고 소명할 기회를 부여합니다. 다만, 다른 회원의 보호나 긴급한 시스템 안정 확보 등 정당한 사유가 있는 경우에는 사후에 통지할 수 있습니다.<br/>
④ 다음 각 호의 하나에 해당하는 중대한 위반 행위의 경우, 제공기관는 사전 통지 없이 회원의 자격을 영구히 박탈(계약 해지)할 수 있습니다.


**위반 행위 심각도 및 제재 단계별 기준**

| 위반 유형 | 심각도 | 1차 위반 | 2차 위반 | 3차 위반 / 중대 위반 |
| :--- | :--- | :--- | :--- | :--- |
| **무단 상업적 이용** | 높음 | 서면 경고 및 7일 이용 정지 | 30일 이용 정지 및 최종 경고 | **영구 이용 정지 (계약 해지)** |
| **자원 남용 (암호화폐 채굴 등)** | 중간 | 서면 경고 및 해당 프로세스 강제 종료 | 15일 이용 정지 | 30일 이용 정지 |
| **경미한 저작권 침해** | 낮음 | 해당 게시물 삭제 요구 및 경고 | 7일 이용 정지 | 15일 이용 정지 |
| **해킹 시도 / 악성코드 유포** | 매우 높음 | - | - | **즉시 영구 이용 정지 및 법적 조치 검토** |

## 제9조 (게시물의 관리)

① 회원이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.<br/>
② 제공기관는 회원의 게시물이 다음 각 호에 해당한다고 판단되는 경우, 사전 통지 없이 해당 게시물을 삭제하거나 이동 또는 등록을 거부할 수 있습니다.

1.  제5조의 금지 행위에 해당하는 경우
2.  스팸성, 상업적 광고, 도배 등 서비스 목적에 부합하지 않는 경우
3.  기타 관계 법령에 위반된다고 판단되는 경우

## 제10조 (제공기관의 면책 및 책임 제한)

① 본 서비스는 제공기관의 비영리적 활동 지원의 일환으로 회원에게 무료로 제공되므로, 제공기관는 제공기관의 **고의 또는 중대한 과실**로 인하여 회원에게 발생한 손해를 제외하고는 어떠한 손해에 대해서도 책임을 부담하지 않습니다. <br/>
② 제공기관는 천재지변 또는 이에 준하는 불가항력, 서비스 설비의 보수, 교체, 점검 등 부득이한 사유로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.<br/>
③ 제공기관는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 데이터 손실에 대하여는 책임을 지지 않습니다. 이는 회원이 본인의 계정 정보를 부실하게 관리하거나, 제7조 제3항에 따른 데이터 백업 의무를 소홀히 한 경우 등을 포함합니다.<br/>
④ 제공기관는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않으며, 그 밖에 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.<br/>

## 제11조 (관할법원)

서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우, 대한민국의 법률을 준거법으로 하며, 민사소송법상의 관할법원에 소를 제기합니다.
`;

export const Terms_View = () => {
    return (
        <Card
            className="md:w-[30vw] p-4 h-[40vh]"
            style={{ overflowX: "auto", overflowY: "auto" }}
        >
            <MarkdownPreview
                source={source}
                style={{ padding: 16 }}
            />
        </Card>
    );
}
