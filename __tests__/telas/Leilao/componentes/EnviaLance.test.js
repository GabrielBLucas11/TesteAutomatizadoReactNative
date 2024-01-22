import React from "react";
import {jest} from "@jest/globals";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";
import { ENVIADO, NAO_ENVIADO } from "../../../../src/negocio/constantes/estadosLance";

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('telas/Leilao/componentes/EnviaLance', () => {
    it('Deve enviar o lance quando o botão for pressionado', async () => {
        const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)));

        const { getByPlaceholderText, getByA11yHint, getByText } = render(
            <EnviaLance 
                enviaLance={enviaLance} 
                cor="#fff" 
            />);

        const input = getByPlaceholderText('R$');
        const botao = getByA11yHint('Enviar um lance');

        fireEvent.changeText(input, '250');
        fireEvent.press(botao);

        expect(enviaLance).toHaveBeenCalledWith('250');
        expect(enviaLance).toHaveBeenCalledTimes(1);
        await waitFor(() => {
            expect(getByText(ENVIADO)).toBeTruthy();
        })

        expect(() => getByText(NAO_ENVIADO)).toThrow();
    })
});