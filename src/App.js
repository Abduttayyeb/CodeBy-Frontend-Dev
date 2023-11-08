import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import Playground from "./pages/PlaygroundPage";
import Invite from "./pages/InvitePage";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="playground/:roomId" element={<Playground />}></Route>
                    <Route path="new/:roomId" element={<Invite />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
