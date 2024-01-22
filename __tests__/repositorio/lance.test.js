import { expect, it } from "@jest/globals";
import { obtemLancesDoLeilao, adicionaLance } from "../../src/repositorio/lance";
import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock('../../src/servicos/apiLeiloes');

const mockLances = [
    {
        id: 1,
        valor: 1000,
        leilaoId: 1,
        usuario: 'fulano'
    },
    {
        id: 2,
        valor: 2000,
        leilaoId: 1,
        usuario: 'fulano'
    }
]

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: retorno
            })
        }, 200)
    })
}

const mockRequisicaoErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe('repositorio/lance', () => {
    beforeEach(() => {
        apiLeiloes.get.mockClear();
        apiLeiloes.post.mockClear();
    })
    describe('obtemLancesDoLeilao', () => {
        it('Deve retornar todos os lances', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLances));

            const lances = await obtemLancesDoLeilao(1);
            
            expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=1');
            expect(apiLeiloes.get).toBeCalledTimes(1);
            expect(lances).toEqual(mockLances);
        });
        it('Deve retornar arrayu vazio se não houver lances', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

            const lances = await obtemLancesDoLeilao(1);
            
            expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=1');
            expect(apiLeiloes.get).toBeCalledTimes(1);
            expect(lances).toEqual([]);
        });
    });

    describe('adicionaLance', () => {
        it('Deve retornar true caso consiga adicionar um lance', async () => {
            apiLeiloes.post.mockImplementation(() => mockRequisicao());

            const sucesso = await adicionaLance(mockLances[0]);

            expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLances[0]);
            expect(apiLeiloes.post).toBeCalledTimes(1);
            expect(sucesso).toBeTruthy();
        });
        it('Deve retornar false caso não consiga adicionar um lance', async () => {
            apiLeiloes.post.mockImplementation(() => mockRequisicaoErro());

            const sucesso = await adicionaLance(mockLances[0]);

            expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLances[0]);
            expect(apiLeiloes.post).toBeCalledTimes(1);
            expect(sucesso).toBeFalsy();
        });
    });
});