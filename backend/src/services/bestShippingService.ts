import axios, { AxiosInstance } from "axios";

interface AuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class MelhorEnvioService {
  private httpClient: AxiosInstance;
  private token: AuthToken | null = null;

  constructor() {
    this.httpClient = axios.create({
      baseURL:
        process.env.ME_SANDBOX === "sandbox"
          ? "https://www.melhorenvio.com.br/api/v2"
          : "https://sandbox.melhorenvio.com.br/api/v2",
    });

    this.authenticate();
  }

  private async authenticate() {
    try {
      const response = await this.httpClient.post("/oauth/token", {
        grant_type: "client_credentials",
        client_id: process.env.MELHOR_ENVIO_CLIENT_ID,
        client_secret: process.env.MELHOR_ENVIO_CLIENT_SECRET,
      });

      this.token = response.data;
      this.httpClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.token?.access_token}`;
    } catch (error) {
      console.error("Erro na autenticação com Melhor Envio:", error);
      throw error;
    }
  }

  public async calculateShipping(data: any) {
    try {
      const response = await this.httpClient.post(
        "/me/shipment/calculate",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      throw error;
    }
  }

  public async createShipment(data: any) {
    try {
      const response = await this.httpClient.post("/me/shipment", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar envio:", error);
      throw error;
    }
  }

  // Outros métodos da API conforme necessidade
}
