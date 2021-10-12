const express = require(`express`);
const app = express();
const db = require('./config/database');
const QueryResolve = require('./QueryResolve');
const {proccesExcel} = require('./proccess');
const multer = require(`multer`);
const path = require(`path`);
const {asyncForEach} = require('./async');

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, `./uploads/`);
    },
    filename: (req, file, cb) =>{
        const {name, ext} = path.parse(file.originalname);

        cb(null, `Dados${ext}`);
    }
});

const upload = multer({storage});
app.set('view engine', 'ejs')
app.listen('3000');
app.use(express.json({limit: '50mb'}));
app.use(QueryResolve);

///req.body
///req.params
//req.query

app.post('/inserir', upload.single('file'), async (req, res) => {
    let verificar = []
    let linha = undefined
    let msg_retorno = '';
    try{

        const ret = await proccesExcel()

        
        if(ret.length > 0){
            await asyncForEach(ret, async (row, index) => {
                linha = await db('leitura').where('id_passado', '=', row.id_passado).first();
                if(!linha){
                    verificar.push(row)
                }
            }) 
            if(verificar.length > 0){        
                await db('leitura').insert(verificar)
                msg_retorno = `foram ${verificar.length} inseridos no banco`
            } 
            else{
                msg_retorno = 'Não foram inseridos no banco'
            }          
        }
        
        res.send({msg: msg_retorno})
    }catch(err){
        console.log(err)
        res.status(400).send()
    }

})

app.get('/', async (req, res) => {
    res.render('index');
})

app.get('/localizar', async (req, res) => {
    const {nome} = req.query
    
    try{

        const ret = await db.select('*').from('leitura').where('nome', 'like', `%${nome}%`);

        console.log(ret)
        res.send(ret)
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
  
    res.send()
});

