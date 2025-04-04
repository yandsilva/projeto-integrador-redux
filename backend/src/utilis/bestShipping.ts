import MelhorEnvioSdk from "melhor-envio";

export const me = new MelhorEnvioSdk({
  client_id: "NoFIRJWYMjWbuW6ivVmzh6WkmGik5ZoMdy",
  client_secret: "HKwu8zOnl2B7IgsZzrc3IK3FGJXFS75x",
  sandbox: process.env.ME_SANDBOX || "true",
  bearer: process.env.ME_ACCESS_TOKEN,
  redirect_uri: "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
  request_scope:
    "cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write webhooks-read webhooks-write",
  state: "BPMDruWTWzd",
});
