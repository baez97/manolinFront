npm ci 

npx expo publish --non-interactive

expo publish --release-channel production --non-interactive

expo build:android --release-channel production --no-publish 

curl -o app.apk "$(expo url:apk --non-interactive)"

fastlane supply --track 'internal' --json_key '/Users/josemanuelbaezsoriano/Desktop/Manolin/api-7461674513776927488-585593-6805cfbff92d.json' --package_name "com.app.manolin" --apk "app.apk" --skip_upload_metadata --skip_upload_images --skip_upload_screenshots