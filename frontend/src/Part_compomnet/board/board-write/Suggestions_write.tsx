import Topnav from "@/Part_compomnet/nav";
import { login_Count, User_info, Access_jwt } from "@/store/strore_data";
import { useAtom } from "jotai";
import MDEditor from '@uiw/react-md-editor';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


function Suggestions_write() {
  const [title, settitle] = useState('');
  const [value, setValue] = useState("**Hello world!!!**");
  const [logCount] = useAtom(login_Count);
  const [AccessToken] = useAtom(Access_jwt);
  const [userinfo] = useAtom(User_info);
  const navigate = useNavigate();

  const saveTitle = (event: any) => {
    settitle(event.target.value);
    // console.log(event.target.value);
  };


  useEffect(() => {
    //@ts-ignore
    if (logCount == 1) {
      navigate("/site/")
    }
  })

  async function Upload() {
    if (title.length != 0) {
      await fetch("/api/createPost?board=Suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //@ts-ignore
          Access: AccessToken.Access,
          title: title,
          content: value,
          //@ts-ignore
          User_email: userinfo.email,
          //@ts-ignore
          username: userinfo.name
        })
      }).then((response) => {
        if (response.status == 201) {
          toast.success("성공적으로 저장했습니다.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          });
          setTimeout(() => {
            navigate("/site/board")
          }, 2000);
        }
      })
    } else {
      toast.error("제목이나 본문에 값이 없습니다.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }


  }
  return (
    <>
      <div className="p-5 md:p-20">
        <Topnav />
        <div className="h-[10vh] md:h-[15vh]"></div>
        <div className="xl:flex md:grid  justify-center  flex-nowrap" >
          <div className="container">
            <p className="title">건의사항 게시판 작성</p>
            <p>운영자에게 하고 싶은 말이나 서버에 추가사항을 적어주세요.</p>
            <br />
            <p className="authtitle" style={{ fontWeight: "bold" }}>제목 추가 </p>
            <Input value={title}
              onChange={saveTitle}></Input>
            <br />
            <p className="authtitle mb-2" style={{ fontWeight: "bold" }}>본문 내용추가 </p>
            <MDEditor
              value={value}
              //@ts-ignore
              onChange={setValue}
            />
            <br />
            <div className="justify-self-end ">
              <Button onClick={() => { Upload() }} style={{ backgroundColor: "#26a641" }}>
                작성 완료
              </Button>
            </div>

          </div>

        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Suggestions_write;
