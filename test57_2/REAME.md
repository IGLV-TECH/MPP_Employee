dai comanda asta sa iti faca fisierul de react:
npx react-native bundle --platform android --dev false --entry-file index.tsx --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

la tine entry point trebuie sa fie neaparat index.tsx

dupa deschizi ca proiect separat in intellij folderul android si din gradle dai app -> install -> installDebug

aproape fiecarui node adaugat cu npm install/yarn add in react trebuie sa ii adaugi corespondetul din java (in app/build.gradle)

corespondul trebuie fie trebuie luat din node_modules/librarie_adaugata/android/build.gradle fie de pe https://mvnrepository.com/