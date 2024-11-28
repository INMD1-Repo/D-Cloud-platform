import Auth from "./Part_compomnet/auth/Auth";
import Main_board from "./Part_compomnet/board/main_board";
import Mainpage_index from "./Part_compomnet/Mainpage/Mainpage_index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Suggestions_write from "./Part_compomnet/board/board-write/Suggestions_write";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          
          <Route path="/site/" element={<Mainpage_index />}></Route>
          <Route path="/site/auth_prcess" element={<Auth />}></Route>
          <Route path="/site/board" element={<Main_board />}></Route>
          <Route path="/site/board/Suggestions_write" element={<Suggestions_write/>}></Route>
        </Routes>
        <footer className="mobile_none">
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://github.com/INMD1" className="hover:underline">
              INMD1
            </a>
            . All Rights Reserved.
          </span>
          <br />
        </footer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
