import Topnav from '@/Part_compomnet/common parts/Nav';
import { useSearchParams } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

function Board_view() {
    const [content, setContent] = useState({ title: "", content: "", Username: "", created_at: "", User_email: "" });
    const [searchParams] = useSearchParams();
    const board = searchParams.get('board');
    const id = searchParams.get('id');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/readPost?board=${board}&id=${id}`);
                const getData = await response.json();
                setContent(getData);
                console.log(getData);
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        }
        if (board && id) {
            fetchData();
        }
    }, [board, id]);

    return (
        <div className="p-5 md:p-20">
            <Topnav />
            <div className="h-[10vh] md:h-[15vh]"></div>
            <div className="flex justify-center flex-nowrap gap-10">
                <div className="container">
                    <p className='title lg:mb-5'>게시판 View</p>
                    <p className='board_title'>{content.title}</p>
                    <div className='flex pc_none'>
                        <p>작성자: {content.Username}</p>
                    </div>
                    <br className='pc_none'/>
                    <Card>
                        <MarkdownPreview source={content.content} style={{ padding: 16 }} />
                    </Card>
                </div>
                <div className='grid min-w-[20vw] mobile_none'>
                    <div>
                        <p style={{ fontWeight: "bold" }}>작성자</p>
                        <div className="flex items-center gap-4">
                            <div className="font-medium dark:text-white">
                                <div><p>{content.Username}</p></div>
                                <div className="text-sm text-gray-500 dark:text-gray-400"><p>{content.User_email}</p></div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div>
                        <p style={{ fontWeight: "bold" }}>작성날짜</p>
                        <p>{content.created_at}</p>
                        <hr />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Board_view;