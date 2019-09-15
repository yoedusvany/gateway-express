import express from 'express';
import bodyParser from 'body-parser';
import gatewayRoutes from './routes/gateway';
import deviceRoutes from './routes/device';
import mongoose from 'mongoose';
import config from './config';
import cors from 'cors';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

//routes for api
app.use('/api', gatewayRoutes,deviceRoutes);

//connection
mongoose.connect('mongodb://localhost:27017/gateway', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("Db Connection successful")
    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));



app.listen(config.port, () => {
    console.log('server started - 3000');
});