import express from 'express'
import cors from 'cors'
import storeRoutes from './routes/stores.js'
import additionalData from './routes/addData.js'
import path from 'path';
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL ('.', import.meta.url))
const __f = url.fileURLToPath(new URL ('.', import.meta.url))

const port = process.env.PORT || 4000 ;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.use('/post_name_toped', storeRoutes,)
app.use('/post_add_data', additionalData,);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
