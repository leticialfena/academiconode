const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const porta = 3000;
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const Aluno = "Letícia Alfena Cunha";
const Turma = "Aut2d2";

var VNode = '';
var versao = exec('node -v',(error, stdout, stderr) => {
    return `${stdout}`;
})
versao.stdout.on('data', function(data) { 
    //console.log('versao: '+data.toString()); 
    VNode = data.toString();
} ) 

let l_alunos = (async() => {
    const db = require('./db');

    //db.connect();
    console.log('inicializado!');
    const alunos = await db.selectAlunos();
    //console.log(alunos);

    return alunos;
})();

var listaAlunos;
l_alunos.then((resp) => {
    listaAlunos = resp;
})

app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.render('principal', {
        titulo: 'Academico2',
        Aluno: Aluno,
        Turma: Turma,
        VNode: VNode,
    })
});

app.get('/lista',(req,res) => {
  
    let arr_alunos = [
        {
            id: '1',  
            matricula: '0056617',   
            cpf: '155.667.987-12',    
            nome: 'maria',
            email: 'maria@gmail.com',   
            gitlab: 'mari',   
            celular: '87776667',   
            turma: '1d3'  
        },
        {
            id: '2',  
            matricula: '0056613',   
            cpf: '224.320.814.04',    
            nome: 'rafaella',
            email: 'rafa@gmail.com',   
            gitlab: 'rafaella',   
            celular: '86677423',   
            turma: '2d2'  
        }
    ];
    res.render('lista', {
        titulo: 'Academico2',
        Aluno: Aluno,
        Turma: Turma,
        VNode: VNode,
        alunos: listaAlunos
        //alunos: arr_alunos
    });

});

app.get('/edita',(req,res) => {
    res.render('desenvolvimento', {
        titulo: 'Academico2',
        Aluno: Aluno,
        Turma: Turma,
        VNode: VNode,
    });
});

app.get('/notas',(req,res) => {
    res.render('desenvolvimento', {
        titulo: 'Academico2',
        Aluno: Aluno,
        Turma: Turma,
        VNode: VNode,
    });
});

app.get('/faltas',(req,res) => {
    res.render('desenvolvimento', {
        titulo: 'Academico2',
        Aluno: Aluno,
        Turma: Turma,
        VNode: VNode,
    });
});

app.listen(porta, function(err) {
    if(err){
        console.log('Erro: '+err);
    } else {
        console.log('Servidor rodando em localhost:'+porta)
    }

})