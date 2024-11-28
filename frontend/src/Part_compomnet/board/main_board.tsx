import { login_Count } from "@/store/strore_data";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import Topnav from "../nav";
import { Button } from "@/components/ui/button";
import Notice_part_Board from "./board-part/notice";
import { useState } from "react";
import Suggestions from "./board-part/Suggestions";
import { toast, ToastContainer } from "react-toastify";

function Main_board() {
  const navigate = useNavigate();
  const [logCount] = useAtom(login_Count);
  const [selected, setseleted] = useState("Suggestions");

  function asdvc(value: string) {
    setseleted(value);
  }

  async function login_check() {
    if (logCount == 0) {
      toast.error("글을 작성하기 위해 로그인을 해주시기 바람니다.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      navigate("/site/board/Suggestions_write");
    }
  }

  return (
    <>
      <div className="p-5 md:p-20 ">
        <Topnav />
        <div className="h-[10vh] md:h-[15vh]"></div>
        <div className="xl:flex md:grid  justify-center  flex-nowrap" >

          <div className="container">
            <div className="grid">
              <p className="title">
                {selected == "notice" ? "공지사항 게시판" : "건의사항 게시판"}
              </p>
              <p>아 뭘적을지 고민중이에요</p>
              <br />
              <div className="flex justify-between ">
                <div>
                  <Button
                    variant="ghost"
                    className="board_button"
                    onClick={() => {
                      asdvc("notice");
                    }}
                  >
                    공지사항
                  </Button>
                  <Button
                    variant="ghost"
                    className="board_button"
                    onClick={() => {
                      asdvc("Suggestions");
                    }}
                  >
                    건의사항
                  </Button>
                </div>
                {selected == "Suggestions" ? (
                  <Button
                    onClick={() => {
                      login_check();
                    }}
                  >
                    새글 작성하기
                  </Button>
                ) : null}
              </div>
              <div>
                {selected == "notice" ? <Notice_part_Board /> : <Suggestions />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Main_board;
