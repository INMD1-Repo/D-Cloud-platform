// import { login_Count, User_info, Access_jwt } from '@/store/strore_data';
// import { useAtom } from 'jotai';
// import { useNavigate } from 'react-router-dom';
import Topnav from '../nav';
import { Button } from '@/components/ui/button';
import Notice_part_Board from './notice';
import { useState } from 'react';
import Suggestions from './Suggestions';

function Main_board() {
    // const navigate = useNavigate();
    // const [logCount, setlogCount] = useAtom(login_Count);
    // const [Accessjwt, setAccessjwt] = useAtom(Access_jwt);
    // const [userinfo, setUserInfo] = useAtom(User_info);
    const [selected, setseleted] = useState("Suggestions");

    function asdvc(value: string) {
        setseleted(value)
    }
    return (
        <>
            <div className="p-5 md:p-20">
                <Topnav />
                <div className='h-[10vh] md:h-[15vh]'></div>
                <div className='grid'>
                    <p className='title'>
                        {
                            selected == "notice" ? "공지사항 게시판"
                                : "건의사항 게시판"
                        }
                    </p>
                    <p>아 뭘적을지 고민중이에요</p>
                    <br />
                    <div className='flex justify-between '>
                        <div>
                            <Button variant="ghost" className='board_button' onClick={() => { asdvc("notice") }} >공지사항</Button>
                            <Button variant="ghost" className='board_button' onClick={() => { asdvc("Suggestions") }}>건의사항</Button>
                        </div>
                        {
                            selected == "Suggestions" ? <Button>새글 작성하기</Button> : null
                        }
                    </div>
                    <div>
                        {
                            selected == "notice" ? <Notice_part_Board />
                                : <Suggestions />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main_board;