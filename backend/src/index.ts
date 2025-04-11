import app from './app.js';
import { connectToDatabase } from './db/connectdb.js';

//conection and listeners
const PORT = process.env.PORT || 3000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log('Server is running & Database is connected'));
})
    .catch((error) => { console.log(error); });
