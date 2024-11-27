import Topnav from "@/Part_compomnet/nav";
import { login_Count } from "@/store/strore_data";
import { useAtom } from "jotai";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function Suggestions_write() {
  const [logCount] = useAtom(login_Count);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if(logCount ==1 ){
  //     navigate("/site/")
  //   }
  // })
  return (
    <>
      <div className="p-5 md:p-20">
        <Topnav />
        <div className="h-[10vh] md:h-[15vh]"></div>
        <div>

        </div>
      </div>
    </>
  );
}

export default Suggestions_write;
