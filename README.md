# Convite de aniversário – Manuella (tema Cinnamoroll) ☁️

Site estático (HTML/CSS/JS), sem build. Tudo que muda fica em **`config.js`**.

## 1. Preencher as informações
Edite `config.js`: data/hora, local, endereço, link do Maps, WhatsApp, idade etc.

## 2. Música
Coloque o arquivo em `assets/musica.mp3` (use uma música que você tenha direito de usar). Sem o arquivo o site funciona normalmente, só sem som. Dica: mantenha o MP3 abaixo de ~3 MB.

## 3. Confirmação de presença
Sem banco de dados: a criança escreve o nome, toca em "Confirmar presença" e abre o WhatsApp com a mensagem pronta para o número definido em `whatsapp` no `config.js`. As confirmações chegam na sua conversa do WhatsApp.

## 4. Publicar no GitHub Pages
```bash
git init
git add .
git commit -m "Convite Manuella"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```
No GitHub: Settings → Pages → Branch `main` / root.

## 5. Domínio manuellacalazans.site
No painel do registrador (DNS):
- 4 registros **A** para `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- 1 registro **CNAME** `www` → `SEU_USUARIO.github.io`

Depois, em Settings → Pages, confirme o domínio `manuellacalazans.site` (o arquivo `CNAME` já está no repo) e marque **Enforce HTTPS** (pode levar alguns minutos).

## 6. Prévia do link (WhatsApp)
Adicione uma imagem 1200×630 em `assets/og.png` para aparecer na prévia do link.
