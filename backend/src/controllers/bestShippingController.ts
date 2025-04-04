import MelhorEnvioSdk from "melhor-envio";

// 1. Interface para configuração do cliente Melhor Envio
interface MelhorEnvioConfig {
  client_id: string;
  client_secret: string;
  sandbox?: boolean;
  redirect_uri?: string;
  bearer?: string;
}

// 2. Interface para os dados de entrada do cálculo de frete
interface DadosCalculoFrete {
  cepOrigem: string;
  cepDestino: string;
  peso: number; // em quilogramas
  dimensoes: {
    altura: number; // em centímetros
    largura: number; // em centímetros
    comprimento: number; // em centímetros
  };
}

// 3. Classe do controlador com injeção de dependência
class FreteController {
  private melhorEnvio: MelhorEnvioSdk;

  constructor(config: MelhorEnvioConfig) {
    // Inicializa a instância do SDK
    this.melhorEnvio = new MelhorEnvioSdk({
      client_id: config.client_id,
      client_secret: config.client_secret,
      sandbox: config.sandbox || true, // Default para ambiente de teste
      redirect_uri: config.redirect_uri,
    });

    // Define o token se existir
    if (config.bearer) {
      this.melhorEnvio.setToken = config.bearer;
    }
  }

  // 4. Método para autenticação
  async autenticar(code: string): Promise<void> {
    try {
      const { data: tokenData } = await this.melhorEnvio.auth.getToken(code);

      // Atualiza o token na instância do cliente
      this.melhorEnvio.setToken = tokenData.access_token;

      // Em produção, você deve armazenar o refresh_token
      console.log("Autenticação realizada com sucesso");
    } catch (error) {
      console.error("Erro na autenticação:", error);
      throw new Error("Falha na autenticação com Melhor Envio");
    }
  }

  // 5. Método principal para cálculo de frete
  async calcularFrete(dados: DadosCalculoFrete) {
    try {
      // Validação básica dos dados de entrada
      if (
        !this.validarCEP(dados.cepOrigem) ||
        !this.validarCEP(dados.cepDestino)
      ) {
        throw new Error("CEP inválido");
      }

      // 6. Montagem do payload para a API
      const payload = {
        from: { postal_code: dados.cepOrigem },
        to: { postal_code: dados.cepDestino },
        package: {
          weight: dados.peso,
          height: dados.dimensoes.altura,
          width: dados.dimensoes.largura,
          length: dados.dimensoes.comprimento,
        },
        options: {
          insurance_value: 0, // Valor do seguro (opcional)
          receipt: false, // Aviso de recebimento
          own_hand: false, // Envio próprio
        },
      };

      // 7. Chamada à API de cálculo
      const response = await this.melhorEnvio.shipment.calculate(payload);

      // 8. Processamento da resposta
      return response.data.map((servico) => ({
        transportadora: servico.company.name,
        servico: servico.name,
        preco: servico.price,
        prazo: servico.delivery_time,
        erro: servico.error || null,
      }));
    } catch (error) {
      console.error("Erro no cálculo de frete:", error);
      throw new Error("Não foi possível calcular o frete");
    }
  }

  // 9. Método auxiliar para validar CEP
  private validarCEP(cep: string): boolean {
    return /^\d{5}-?\d{3}$/.test(cep);
  }
}

// 10. Exemplo de uso do controlador
(async () => {
  // Configuração inicial
  const config: MelhorEnvioConfig = {
    client_id: "SEU_CLIENT_ID",
    client_secret: "SEU_CLIENT_SECRET",
    sandbox: true,
    bearer: "SEU_TOKEN_OPCIONAL", // Se já tiver token
  };

  // Cria instância do controlador
  const freteController = new FreteController(config);

  // Dados de exemplo para cálculo
  const dadosFrete: DadosCalculoFrete = {
    cepOrigem: "01000-000", // CEP de teste para sandbox
    cepDestino: "02000-000",
    peso: 1.5,
    dimensoes: {
      altura: 20,
      largura: 30,
      comprimento: 40,
    },
  };

  try {
    // Executa o cálculo
    const resultados = await freteController.calcularFrete(dadosFrete);

    // Exibe os resultados
    console.log("Opções de frete disponíveis:");
    resultados.forEach((servico) => {
      if (!servico.erro) {
        console.log(
          `${servico.transportadora} - ${servico.servico}: 
            R$${servico.preco} em ${servico.prazo} dias`
        );
      }
    });
  } catch (error) {
    console.error("Erro no processo:", error.message);
  }
})();
