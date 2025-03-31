import Auth from "./Part_compomnet/Auth/Auth";
import Main_board from "./Part_compomnet/board/Main_board";
import Mainpage_index from "./Part_compomnet/Mainpage/Mainpage_index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import { ThemeProvider } from "@/components/theme-provider";
import Suggestions_write from "./Part_compomnet/board/board-write/Suggestions_write";
import Board_view from "./Part_compomnet/board/board-view/board_view";
import Main_server from "./Part_compomnet/Server application/Main-server";
import Main_server_mobile from "./Part_compomnet/Server application/Mian-server-mobile";
import Main_DashBoard from "@/Part_compomnet/DashBoard/Main_DashBoard.tsx";
import Show_Appect from "./Part_compomnet/DashBoard/show_Appect";
import Judgment from "@/Part_compomnet/DashBoard/Admin/judgment.tsx";
import Write_notice from "@/Part_compomnet/DashBoard/Admin/write_notice.tsx";
import View_vm from "./Part_compomnet/DashBoard/View_vm";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/site/" element={<Mainpage_index />}></Route>
          <Route path="/site/auth_prcess" element={<Auth />}></Route>

          <Route path="/site/board" element={<Main_board />}></Route>
          <Route
            path="/site/board/Suggestions_write"
            element={<Suggestions_write />}
          ></Route>
          <Route path="/site/board/show" element={<Board_view />}></Route>

          <Route
            path="/site/server/subscription"
            element={
              <>
                <BrowserView>
                  <Main_server />
                </BrowserView>
                <MobileView>
                  <Main_server_mobile />
                </MobileView>
              </>
            }
          ></Route>

          <Route path="/site/dashboard" element={<Main_DashBoard />}></Route>
          <Route
            path="/site/server/show_Accpet"
            element={<Show_Appect />}
          ></Route>

          <Route
            path="/site/server/Admin/judgment"
            element={<Judgment />}
          ></Route>
          <Route
            path="/site/server/Admin/write_notice"
            element={<Write_notice />}
          ></Route>
          <Route path="/site/server/View_vm/:id" element={<View_vm />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
