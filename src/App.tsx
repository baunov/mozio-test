import './App.scss'
import {Route, Routes} from "react-router-dom";
import {HomePage} from "@/pages/Home.tsx";
import {Toaster} from "sonner";
import {DestinationPage} from "@/pages/Destination.tsx";

function App() {
    return (
        <>
            <Toaster position={'top-right'} richColors={false} />
            <Routes>
                <Route path={'/'} element={<HomePage/>}>
                    <Route path={'/:id'} element={<DestinationPage/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App;
