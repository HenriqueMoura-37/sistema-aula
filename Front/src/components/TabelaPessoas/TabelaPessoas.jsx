import Botao from '../Botao/Botao';
import './TabelaPessoas.css';

// Converte "AAAA-MM-DD" para "DD/MM/AAAA".
function formatarData(data) {
    if (!data) return '-';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Lista as pessoas e mostra os botões Editar e Excluir.
function TabelaPessoas({ pessoas, aoEditar, aoExcluir }) {
    if (pessoas.length === 0) {
        return <p>Nenhuma pessoa cadastrada.</p>;
    }

    return (
        <table className="tabela-pessoas">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Nascimento</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {pessoas.map((pessoa) => (
                    <tr key={pessoa.pes_id}>
                        <td>{pessoa.pes_nome}</td>
                        <td>{pessoa.pes_email || '-'}</td>
                        <td>{pessoa.pes_telefone || '-'}</td>
                        <td>{formatarData(pessoa.pes_data_nascimento)}</td>
                        <td className="tabela-acoes">
                            <Botao texto="Editar" onClick={() => aoEditar(pessoa)} />
                            <Botao texto="Excluir" variante="perigo" onClick={() => aoExcluir(pessoa)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TabelaPessoas;
