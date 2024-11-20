import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';
function Topnav() {
    const navigate = useNavigate();
    return (
        <>
            <header>
                <div className='flex justify-between'>
                    {/* 로고 입력부분 */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img className="rounded-md lg:w-20 lg:h-20  w-10 h-10" src="./image/161593018.png" alt="" />
                        <div className='w-3'></div>
                        <p className='title'>D Cloud Platform</p>
                    </div>
                    {/* 로고 입력부분 */}
                    <div>
                    <Button className='mobile_none h-16 w-40' onClick={() => {navigate("/site/auth_prcess")}}>
                        <p style={{fontSize: "1.3em", fontWeight: "bold"}}>회원가입/로그인</p>
                    </Button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Topnav
