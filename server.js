const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require("./app")


mongoose.connect(process.env.DATABASE_LOCAL).then(con => {
    console.log("databaseConnect Success")
}).catch(err => {
    console.log("databaseConnect Error")
})



const port = 3000;
app.listen(port, () => {
    console.log(`Server Actived on port : ${port} `);
});