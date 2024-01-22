import { describe, it, expect, jest } from "@jest/globals";
import { obtemLeiloes, obtemLeilao } from "../../src/repositorio/leilao";
import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock('../../src/servicos/apiLeiloes');

const mockLeiloes = [
    {
        id: 1,
        nome: 'Leilão de um carro',
        descricao: 'Leilão de um carro usado',
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

describe('repositorio/leilao', () => {

    beforeEach(() => {
        apiLeiloes.get.mockClear();
    
    })
    describe('ObtemLeiloes', () => {
        it('Deve retornar uma lista de leilões', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));

            const leiloes = await obtemLeiloes();

            expect(leiloes).toEqual(mockLeiloes);
            expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes')
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
        });

        it('Deve retornar uma lista vazia quando a requisição falhar', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

            const leiloes = await obtemLeiloes();

            expect(leiloes).toEqual([]);
            expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes')
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1)

        });
    });

    describe('obtemLeilao', () => {
        it('Deve retornar um leilao', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes[0]));

            const leilao = await obtemLeilao(1);
            expect(leilao).toEqual(mockLeiloes[0]);
        });
        it('Deve retornar um leilao', async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

            const leilao = await obtemLeilao(1);
            expect(leilao).toEqual({});
        });
    });
});