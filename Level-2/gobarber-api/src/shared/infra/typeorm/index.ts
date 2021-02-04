import { createConnections } from 'typeorm';

createConnections();
// procura a pasta ormconfig.json e automaticamente importa os dados
// desse arquivo para fazer a conexão com o banco de dados
