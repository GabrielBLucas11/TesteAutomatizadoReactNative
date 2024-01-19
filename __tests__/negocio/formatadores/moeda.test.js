import { formataBrasileiroParaDecimal, formataDecimalParaReal } from "../../../src/negocio/formatadores/moeda";

// Descrevendo o grupo de testes
describe('negocio/formatadores/moeda', () => {

    describe("formataBrasileiroParaDecimal", () => {
        // Escrevendo um teste individual
        it('deve formatar corretamente a moeda brasileira para decimal', () => {
            // Esperamos que a função retorne um valor específico quando passamos um argumento específico
            expect(formataBrasileiroParaDecimal('1.234,56')).toBe(1234.56);
            expect(formataBrasileiroParaDecimal('7.890,12')).toBe(7890.12);
            expect(formataBrasileiroParaDecimal('0,99')).toBe(0.99);
            expect(formataBrasileiroParaDecimal('1.000,00')).toBe(1000);
        });
    })

    describe('formataDecimalParaReal', () => {
        it('deve retornar R$ 8,59 quando o valor for 8.59', () => {
            const resultado = formataDecimalParaReal(8.59);
            expect(resultado).toMatch(/R\$\s8,59/);
        });
    });

});