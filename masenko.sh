echo "¿Qué has cambiado?"
read commitMessage
git add .
git commit -m "$commitMessage"

npm ci 
npx jest --ci && npx expo publish --non-interactive

