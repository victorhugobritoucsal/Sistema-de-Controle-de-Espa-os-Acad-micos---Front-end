import { existsSync, readFileSync } from 'node:fs';

const env = {};
const arquivo = existsSync('.env') ? '.env' : '../.env';
if (existsSync(arquivo)) {
  for (const linha of readFileSync(arquivo, 'utf8').split('\n')) {
    const [chave, ...valor] = linha.trim().split('=');
    if (chave && !chave.startsWith('#')) {
      env[chave] = valor.join('=');
    }
  }
}

export default {
  '/api': {
    target: 'http://127.0.0.1:8080',
    secure: false,
    headers: { 'X-Gateway-Key': process.env.APP_GATEWAY_KEY || env.APP_GATEWAY_KEY },
  },
};
