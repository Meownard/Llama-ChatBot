import app from './app.js'; // Import your app.js file
import { connectToDatabase } from './db/connectdb.js'; // Import the database connection
// Connection and listeners
const PORT = process.env.PORT || 3000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log('Server is running & Database is connected'));
})
    .catch((error) => {
    console.error('Database connection failed:', error);
});
//# sourceMappingURL=index.js.map