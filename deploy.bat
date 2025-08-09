@echo off
echo Fazendo commit e push das alterações para GitHub Pages...
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
echo.
echo ✅ Push concluído! 
echo.
echo Agora siga os passos no arquivo DEPLOY.md para ativar o GitHub Pages.
echo O site estará disponível em: https://raulprotazio.github.io/cecigames/
echo.
pause
