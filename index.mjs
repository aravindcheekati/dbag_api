import "dotenv/config"
import { connectDB } from "./utils/db.mjs"
connectDB() // DATABASE CONNECTION 
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()

/*** IMPORT ROUTES ***/
import authRouter from "./routes/auth.routes.mjs"

/*** SERVER PORT CONFIGARATION ***/
const port = process.env.PORT || 8080
app.listen(port)

/** CORS **/
const cors_options = {
    origin: process.env.DOMAIN
}
app.use(cors(cors_options))

/*** BODY PARSER ***/
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/*** END POINTS ***/
app.use("/auth", authRouter)