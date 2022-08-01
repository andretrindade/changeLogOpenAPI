// TODO - em construção. 
// Favor utilizar mecanismos de testes para validar aplicação. 
// npx ts-node index.ts

import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'

import { ChangeLogRoute } from './src/routes/ChangeLogRoute';
import ChangeLogGeneratorService from './src/services/ChangeLogGeneratorService';
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

let changeLogRoute = new ChangeLogRoute(new ChangeLogGeneratorService());

// public 
app.use('/change-log',changeLogRoute.montaRotas() );
app.listen(3000);
console.log('App started');

