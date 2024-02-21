# quickshop

reference: https://dev.to/jctaveras/sequelize-typescript-what-you-need-to-know-41mj#chapter-2
https://dev.to/franciscomendes10866/how-to-use-sequelize-orm-with-typescript-3no

commands:

 build the project : npm run build


npx sequelize-cli init

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
npx sequelize-cli model:generate --name Product --attributes productName:string,productPrice:float,productRating:float,description:string

npx sequelize-cli db:migrate

//how env file loads in the application, so it will take automatically
Default: path.resolve(process.cwd(), '.env')


//Joi validation
reference: https://dev.to/jeffsalive/the-right-way-to-use-joi-validator-in-your-nodejs-express-application-147g
