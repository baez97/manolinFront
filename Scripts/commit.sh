echo "¿Qué has cambiado?" &&
read commitMessage        &&
git add .                 &&  
git commit -m "$commitMessage"
