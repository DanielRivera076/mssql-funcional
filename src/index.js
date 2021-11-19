import app from "./app";
import { getConnection, getRecord} from "./database/connection";
import localStorage from 'local-storage'

app.listen(3000);
console.log('server on port', 3000);
// Clientes

app.get('/clients', async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Client');
    res.send(result.recordset);
})

//Trabajadores

app.get('/workers', async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Worker');
    res.send(result.recordset);
})

//Datos generales

app.get('/record', async (req, res) => {
    const info = await getRecord();
    res.send(info);
    localStorage.set('record',JSON.stringify(info));
});
app.get('/', (req,res) =>{
    res.send('Hola');
    res.render('index')
});

app.use()