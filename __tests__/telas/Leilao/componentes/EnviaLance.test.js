import React from "react";
import {render} from "@testing-library/react-native";
import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";

describe('telas/Leilao/componentes/EnviaLance', () => {
    it('Deve enviar  o lance quando o botão for pressionado', () => {
        const { toJSON } = render(
            <EnviaLance 
                enviaLance={() => {}} 
                cor="#fff" 
            />);

        console.log(toJSON());
    })
});