import { useNavigate } from "react-router-dom";
import Topnav from "../common parts/Nav";
import { GrServerCluster } from "react-icons/gr";
import { useEffect } from "react";
import { isMobile } from 'react-device-detect';

function Main_server() {
    const navigate = useNavigate();

    //모바일이면 모바일 페이지로 넘어감
    useEffect(() => {
        if (isMobile) {
            navigate('/mobile', { replace: true });
        }
    }, [navigate]);

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

export default Main_server;