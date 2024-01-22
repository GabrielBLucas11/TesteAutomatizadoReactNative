import { validaFormatoNumericoDoLance, validaLance } from '../../../src/negocio/validadores/lance';
import { VALIDO, INVALIDO, MENOR_OU_IGUAL_AOS_LANCES, MENOR_QUE_VALOR_INICIAL } from '../../../src/negocio/constantes/estadosLance';

describe('negocio/validadores/lance', () => {
    describe('validaFormatoNumericoDoLance', () => {
        it('Deve validar corretamente o formato numerico do lance', () => {
            expect(validaFormatoNumericoDoLance('100')).toBe(VALIDO);
            expect(validaFormatoNumericoDoLance('100,00')).toBe(VALIDO);
            expect(validaFormatoNumericoDoLance('1.000,00')).toBe(INVALIDO);
            expect(validaFormatoNumericoDoLance('abc')).toBe(INVALIDO);
        });
    })

    describe('validaLance', () => {
        it('should correctly validate the bid', () => {
            const leilao = {
                lances: [{ valor: 100 }, { valor: 200 }],
                valorInicial: 50
            };
            expect(validaLance(250, leilao)).toBe(VALIDO);

            const leilao2 = {
                lances: [{ valor: 300 }, { valor: 400 }],
                valorInicial: 250
            };
            expect(validaLance(200, leilao2)).toBe(MENOR_OU_IGUAL_AOS_LANCES);
            
            const leilao3 = {
                lances: [],
                valorInicial: 250
            };
            expect(validaLance(215, leilao3)).toBe(MENOR_QUE_VALOR_INICIAL);
        });
    });
});

