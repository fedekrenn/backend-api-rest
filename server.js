const express = require('express');
const app = express();

const routerProductos = require('./src/routes/productos')
const routerCarritos = require('./src/routes/carritos')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);

app.use(express.static('public'));


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', error => console.log(`Error en servidor ${error}`));