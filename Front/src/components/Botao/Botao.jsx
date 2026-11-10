import './Botao.css';

// Botão reutilizável.
// props: texto, onClick, type ('button' ou 'submit') e variante ('perigo' ou 'secundario')
function Botao({ texto, onClick, type = 'button', variante = '' }) {
    return (
        <button type={type} className={`botao ${variante}`} onClick={onClick}>
            {texto}
        </button>
    );
}

export default Botao;
