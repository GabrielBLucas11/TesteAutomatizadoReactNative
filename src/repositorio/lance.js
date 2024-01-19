import apiLeiloes from '../servicos/apiLeiloes';

export async function obtemLancesDoLeilao(id) {
  try {
    const resposta = await apiLeiloes.get(`/lances?leilaoId=${id}`);
    data = resposta.data.sort((a, b) => {
      if (a.valor > b.valor) return -1;
    })
    return data;
  } catch(erro) {
    return [];
  }
}

export async function adicionaLance(lance) {
  try {
    await apiLeiloes.post(`/lances`, lance);
    return true;
  } catch(erro) {
    return false;
  }
}