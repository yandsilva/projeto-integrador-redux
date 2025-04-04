import { me } from "../utilis/bestShipping";

const url = me.auth.getAuth({
  client_id: "xxxx",
  scope: "xxxx xxxx xxxx xxxx",
  state: "meu id unico?",
  redirect_uri: "https://minhaurl.com.br",
});
