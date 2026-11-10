import { useState } from 'react';
import Botao from '../Botao/Botao';
import './FormularioPessoa.css';

const VAZIO = {
    pes_nome: '',
    pes_email: '',
    pes_telefone: '',
    pes_data_nascimento: '',
};

// Formulário usado para cadastrar e para alterar.
// props:
//   pessoaEditando - pessoa selecionada para alteração (ou null, se for cadastro)
//   aoSalvar       - função chamada com os dados do formulário
//   aoCancelar     - função chamada ao cancelar a edição
function FormularioPessoa({ pessoaEditando, aoSalvar, aoCancelar }) {
    const [campos, setCampos] = useState(pessoaEditando ?? VAZIO);

    function mudar(evento) {
        setCampos({ ...campos, [evento.target.name]: evento.target.value });
    }

    async function enviar(evento) {
        evento.preventDefault();
        const salvou = await aoSalvar(campos);
        if (salvou && !pessoaEditando) setCampos(VAZIO); // limpa após cadastrar
    }

    return (
        <form className="formulario-pessoa" onSubmit={enviar}>
            <h3>{pessoaEditando ? 'Alterar pessoa' : 'Cadastrar pessoa'}</h3>

            <label>
                Nome *
                <input name="pes_nome" value={campos.pes_nome} onChange={mudar} required maxLength={100} />
            </label>

            <label>
                E-mail
                <input name="pes_email" type="email" value={campos.pes_email ?? ''} onChange={mudar} />
            </label>

            <label>
                Telefone
                <input name="pes_telefone" value={campos.pes_telefone ?? ''} onChange={mudar} maxLength={20} />
            </label>

            <label>
                Data de nascimento
                <input name="pes_data_nascimento" type="date" value={campos.pes_data_nascimento ?? ''} onChange={mudar} />
            </label>

            <div className="formulario-botoes">
                <Botao type="submit" texto={pessoaEditando ? 'Salvar alteração' : 'Cadastrar'} />
                {pessoaEditando && <Botao variante="secundario" texto="Cancelar" onClick={aoCancelar} />}
            </div>
        </form>
    );
}

export default FormularioPessoa;
