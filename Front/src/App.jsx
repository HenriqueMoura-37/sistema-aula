import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Pessoas from './pages/Pessoas/Pessoas';
import Cargos from './pages/Cargos/Cargos';

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pessoas" element={<Pessoas />} />
                <Route path="/cargos" element={<Cargos />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
