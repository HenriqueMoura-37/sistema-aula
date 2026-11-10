import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header>
            <h1>Meu sistema</h1>
            <nav>
                <Link to="/">Início</Link>
                {' | '}
                <Link to="/pessoas">Pessoas</Link>
                {' | '}
                <Link to="/cargos">Cargos</Link>
            </nav>
        </header>
    );
}

export default Header;
