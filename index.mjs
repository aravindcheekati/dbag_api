import "dotenv/config"

/* -- SERVER PORT CONFIGARATION -- */

import express from "express"
const app = express()

/* -- SERVER PORT CONFIGARATION -- */

const port = process.env.PORT || 8080
app.listen(port)


/* -- API's ROUTES -- */


