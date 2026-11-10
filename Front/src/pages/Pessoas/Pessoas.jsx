import { useEffect, useState } from 'react';
import FormularioPessoa from '../../components/FormularioPessoa/FormularioPessoa';
import TabelaPessoas from '../../components/TabelaPessoas/TabelaPessoas';
import {
    listarPessoas,
    cadastrarPessoa,
    alterarPessoa,
    excluirPessoa,
} from '../../services/pessoaService.js';
import './Pessoas.css';

function Pessoas() {
    const [pessoas, setPessoas] = useState([]);
    const [pessoaEditando, setPessoaEditando] = useState(null);
    const [mensagem, setMensagem] = useState(null); // { tipo: 'ok' | 'erro', texto }

    // Ao abrir a tela, busca as pessoas no Back-end.
    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        try {
            setPessoas(await listarPessoas());
        } catch (erro) {
            setMensagem({ tipo: 'erro', texto: erro.message });
        }
    }

    // Serve para CADASTRAR e para ALTERAR.
    // Retorna true se deu certo (o formulário usa isso para se limpar).
    async function salvar(dados) {
        try {
            if (pessoaEditando) {
                await alterarPessoa(pessoaEditando.pes_id, dados);   // UPDATE
                setMensagem({ tipo: 'ok', texto: 'Pessoa alterada com sucesso.' });
                setPessoaEditando(null);
            } else {
                await cadastrarPessoa(dados);                        // CREATE
                setMensagem({ tipo: 'ok', texto: 'Pessoa cadastrada com sucesso.' });
            }
            await carregar();
            return true;
        } catch (erro) {
            setMensagem({ tipo: 'erro', texto: erro.message });
            return false;
        }
    }

    async function excluir(pessoa) {
        if (!window.confirm(`Deseja excluir ${pessoa.pes_nome}?`)) return;
        try {
            await excluirPessoa(pessoa.pes_id);                      // DELETE
            setMensagem({ tipo: 'ok', texto: 'Pessoa excluída com sucesso.' });
            if (pessoaEditando?.pes_id === pessoa.pes_id) setPessoaEditando(null);
            await carregar();
        } catch (erro) {
            setMensagem({ tipo: 'erro', texto: erro.message });
        }
    }

    return (
        <main className="pagina-pessoas">
            <h2>Pessoas cadastradas</h2>

            {mensagem && <p className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</p>}

            {/* "key" recria o formulário quando muda a pessoa em edição */}
            <FormularioPessoa
                key={pessoaEditando?.pes_id ?? 'novo'}
                pessoaEditando={pessoaEditando}
                aoSalvar={salvar}
                aoCancelar={() => setPessoaEditando(null)}
            />

            <TabelaPessoas
                pessoas={pessoas}
                aoEditar={setPessoaEditando}
                aoExcluir={excluir}
            />
        </main>
    );
}

export default Pessoas;
