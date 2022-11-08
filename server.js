const express = require('express');
const app = express();

const routerProductos = require('./src/routes/productos');
const routerCarritos = require('./src/routes/carritos');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);



// En el caso de requerir una ruta no implementada en el servidor, se devuelve un error 404
app.use((req, res) => {
    res.status(404).json({ error: -2, descripcion: `ruta '${req.path}' método '${req.method}' no implementada` });
});



const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on('error', error => console.log(`Error en servidor ${error}`));