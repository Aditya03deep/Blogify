// import express from 'express';
// import mongoose from 'mongoose'
// import bodyParser from 'body-parser';
// // import Connect from './config/db.js'
// import cors from 'cors'
// import dotenv from 'dotenv';

// //routes
// import postRoutes from './routes/posts.js'


// const app = express();



// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
// app.use(cors());

// //routers
// app.use('/posts', postRoutes);

// const PORT = process.env.PORT || 5000;
// //mongodb connection
//  mongoose.connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
    
// })
//     .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//     .catch((error)=>console.log(`${error} did not connect`))

// mongoose.set('useFindAndModify', false)


// // app.listen(PORT, () => console.log(`Server running on Port :${PORT}`))

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user' , userRoutes)

// const CONNECTION_URL = 'mongodb+srv://admin:admin123@cluster0.puja3.mongodb.net/blogify2?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

 mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
