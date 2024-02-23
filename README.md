# quickshop

reference: https://dev.to/jctaveras/sequelize-typescript-what-you-need-to-know-41mj#chapter-2
https://dev.to/franciscomendes10866/how-to-use-sequelize-orm-with-typescript-3no

commands:

 build the project : npm run build
 generate empty migration file: npx sequelize-cli migration:generate --name add-new-column-to-product


npx sequelize-cli init

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
npx sequelize-cli model:generate --name Product --attributes productName:string,productPrice:float,productRating:float,description:string

npx sequelize-cli db:migrate

NOTE: By default migration creates the .js files but  in package.json file we have type module so for the successful migration we need to rename it to .cjs

//how env file loads in the application, so it will take automatically
Default: path.resolve(process.cwd(), '.env')


//Joi validation
reference: https://dev.to/jeffsalive/the-right-way-to-use-joi-validator-in-your-nodejs-express-application-147g



//things that needs attention⚠️
convert config.json in config.ts and run migration
file structure especially the sequelize migration folders


//refresh token reference link

https://medium.com/@kizito917/jwt-refresh-token-implementation-with-node-js-postgres-and-sequelize-106ef6b3de68#:~:text=js%2C%20Postgres%20and%20Sequelize,-amaechi%20kingsley&text=To%20have%20a%20secure%20and,with%20JWT%2C%20Postgres%20and%20Sequelize.


