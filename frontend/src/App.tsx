import Auth from "./Part_compomnet/auth/Auth";
import Mainpage_index from "./Part_compomnet/Mainpage/Mainpage_index";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage_index />}></Route>
        <Route path="/auth_prcess" element={<Auth />}></Route>
      </Routes>
      <footer className="mobile_none">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://github.com/INMD1" className="hover:underline">INMD1</a>. All Rights Reserved.</span>
      </footer>
    </BrowserRouter>
  )
}

export default App
