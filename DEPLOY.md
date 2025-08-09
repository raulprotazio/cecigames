# CeciFlags - Deploy GitHub Pages

## Como ativar o GitHub Pages

Após fazer push das alterações para o GitHub, siga estes passos:

### 1. Vá até as configurações do repositório
- Acesse o repositório no GitHub
- Clique em **Settings** (Configurações)

### 2. Configure o GitHub Pages
- No menu lateral, clique em **Pages**
- Em **Source**, selecione **GitHub Actions**
- Clique em **Save**

### 3. Aguarde o deploy
- O GitHub Actions irá executar automaticamente
- Você pode acompanhar o progresso na aba **Actions**
- O site ficará disponível em: `https://raulprotazio.github.io/cecigames/`

## Como atualizar o site
Sempre que você fizer push para a branch `main`, o site será atualizado automaticamente.

## Arquivos modificados para GitHub Pages:
- ✅ `vite.config.ts` - Configurada a base URL
- ✅ `package.json` - Adicionado script `build:client`
- ✅ `.github/workflows/deploy.yml` - Workflow de deploy automático
- ✅ `client/public/manifest.json` - Ajustado start_url
- ✅ `client/public/404.html` - Redirecionamento para SPA
- ✅ `client/index.html` - Script de redirecionamento

## URL Final
Seu app estará disponível em:
**https://raulprotazio.github.io/cecigames/**

Sua filha poderá acessar esse link no celular! 📱🏳️
