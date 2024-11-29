import { GrServerCluster } from "react-icons/gr";
import Topnav from "../common parts/Nav";

function Main_server_mobile() {
    return (
        <>
            <div className="p-5 md:p-20">
                <Topnav />
                <div className="h-[10vh] md:h-[15vh]"></div>
                <div className="flex justify-start flex-nowrap gap-10">

                    <p className='flex title lg:mb-5'>  <GrServerCluster /> 서버 신청</p>
                    <br />

                </div>
            </div>
        </>
    )
}

export default Main_server_mobile;