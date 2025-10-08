import React, { useState } from 'react';
import axios from 'axios';

const FormularioProjeto = () => {
  const API_URL = 'https://server-for-forms-zqx1.onrender.com/submit';

  const [nome, setNome] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [turma, setTurma] = useState<string>('');
  
  const [enviando, setEnviando] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nome || !link || !turma) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setEnviando(true);

    const dadosParaEnviar = {
      nome: nome,
      link: link,
      turma: turma
    };

    try {
      const response = await axios.post(API_URL, dadosParaEnviar);
      
      alert('Projeto enviado com sucesso!');
      console.log('Resposta do servidor:', response.data);

      setNome('');
      setLink('');
      setTurma('');

    } catch (error) {
        console.error('Houve um erro ao enviar o formulário:', error);
      alert('Ocorreu um erro ao enviar o projeto. Verifique o console para mais detalhes.');
    } finally {

      setEnviando(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="nome">Nome do Aluno:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={enviando}
          />
        </div>

        <div>
          <label htmlFor="link">Link do Repositório:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            disabled={enviando}
          />
        </div>

        <div>
          <label htmlFor="turma">Turma:</label>
          <input
            type="text"
            id="turma"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            disabled={enviando}
          />
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar Projeto'}
        </button>
      </form>
    </div>
  );
};

export default FormularioProjeto;