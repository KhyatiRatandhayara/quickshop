# quickshop

reference: https://dev.to/jctaveras/sequelize-typescript-what-you-need-to-know-41mj#chapter-2
https://dev.to/franciscomendes10866/how-to-use-sequelize-orm-with-typescript-3no

commands:

 build the project : npm run build


npx sequelize-cli init

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
npx sequelize-cli model:generate --name Product --attributes productName:string,productPrice:float,productRating:float,description:string

npx sequelize-cli db:migrate
