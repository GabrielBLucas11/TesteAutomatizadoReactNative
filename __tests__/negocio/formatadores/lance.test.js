import { formataMaiorLanceDoLeilao } from "../../../src/negocio/formatadores/lance";

describe('formataMaiorLanceDoLeilao', () => {
  it('deve encontrar corretamente o maior lance em um leilão', () => {
    const lances = [
      { valor: 100 },
      { valor: 200 },
      { valor: 150 }
    ];
    const valorInicial = 50;
    expect(formataMaiorLanceDoLeilao(lances, valorInicial)).toBe(200);

    const lances2 = [
      { valor: 300 },
      { valor: 400 },
      { valor: 350 }
    ];
    const valorInicial2 = 250;
    expect(formataMaiorLanceDoLeilao(lances2, valorInicial2)).toBe(400);
  });
});