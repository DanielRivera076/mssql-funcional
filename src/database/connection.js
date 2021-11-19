import sql from "mssql";


const dbSettings = {
    user: 'apolo',
    password: 'JellyFish2020',
    server: 'localhost',
    database: 'td_Prueba',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true
    },

}
async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (err) {
        console.error(err);
    }
}
async function getRecord() {
    try {
        const pool = await sql.connect(dbSettings);
        const { recordset } = await pool.request().query('SELECT * FROM Production INNER JOIN Client ON Production.id_Client = Client.id INNER JOIN Worker ON Production.id_Worker = Worker.id INNER JOIN Warehouse ON Production.id_Warehouse = Warehouse.id INNER JOIN Category ON Production.id_Category = Category.id');
        //construccion de la data
        
        const _data = Object.values( recordset );
        const info = [];
        
        _data.forEach(({name_Client, name_Worker, name_Category, name_Warehouse,id , quantity , description}) => {
            info.push({
                id: id[0],
                client: name_Client.trim(),
                worker: name_Worker.trim(),
                category: name_Category.trim(),
                warehouse: name_Warehouse.trim(),
                quantity,
                description,
            });
        });
        return info;
    } catch (err) {
        console.error(err);
    }
}
 export {getConnection,getRecord}
