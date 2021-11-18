import express from 'express';  
import {APP_PORT,DB_URL} from './config';
import router from './routes';
import { createSecretKey } from 'crypto';
import errorHandler from './middlewares/errorHandler';
import mongoose from 'mongoose';
import path from 'path';
// Database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});


global.appRoot = path.resolve(__dirname);

const app = express();

app.use(express.json());
app.use('/api',router);
app.use('/uploads', express.static('uploads'));
app.get('/',(req,res)=>res.send('hello'));


app.use(errorHandler);
app.listen(5007, ()=>{
    console.log(`listening to port: 5007`)
});