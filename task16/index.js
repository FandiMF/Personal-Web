const express = require('express')
const  dbPool  = require('./src/connection/index')
const { handlebars } = require('hbs')
const app = express()
const port = 5000

// import multer
const multer = require('multer');
const upload = require('./src/middlewares/uploadFile')

// sequelize config
const { development } = require('./src/config/config.json');
const { Sequelize, QueryTypes } = require('sequelize');
const SequelizePool = new Sequelize(development);


// import bcrypt
const bcrypt = require("bcrypt");

// import session
const session = require("express-session");

// imort flash
const flash = require("express-flash");


// use handlebars for template enginw
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));
app.use("/upload", express.static("src/upload"));
app.use(express.urlencoded({extended: false}));    //bodyParse


// middleware session
app.use(session({
    cookie:{
        httpOnly: true,             //memastikan hanya dapat diakses oleh server
        secure: false,              //dapat diakses http
        maxAge: 1000 * 60 * 60 * 24 //batas waktu cookie
    },
    resave: false,                  //tidak menyimpan ulang selama tidak ada perubahan pada sesi
    store: session.MemoryStore(),   //menyimpan sesi
    secret: 'kunci',                //kata kunci
    saveUninitialized: true         //menyimpan data walaupun 0
}))

app.use(flash())

// ALAMAT ROUTING
app.get('/home', home)


app.get('/project', myProject)
app.post('/project', upload.single('image'), addProject)

app.get('/delete/:id', delProject)

app.get("/reproject/:id", editProjectView);
app.post("/reproject/:id", upload.single('image'), editedProjectView);

app.get('/detailProject/:id', detailProject)

app.get('/testimonial', testimonial)

app.get('/contact-me', contact)

app.get('/register', register)
app.post('/register', addRegister)

app.get('/login', login)
app.post('/login', isLogin)

app.get('/logout', logOut)

let data = [];

function generateTimeProject(startDate, endDate)
{
    let start = new Date(startDate);
    let end = new Date(endDate);

    let diff = end.getTime() - start.getTime();
    let days = diff / ((1000 * 3600 * 24));
    let months = Math.floor (days / 30);
    let monthsdays = days  % 30;
    let years = Math.floor (days / 365);
    let yearsdays = days % 365;
    console.log(diff);

    let timeproject = "";

    if (diff < 0) {
        return alert("End Date must be after Start Date!");
    }

    if (days <= 6){
        timeproject = `${days} Hari`
    }else if (years > 0){
        if (years > 0){
            timeproject = `${years} Tahun ${Math.floor(yearsdays / 30)} Bulan ${Math.floor(yearsdays % 30)} Hari`
        }else{
            timeproject = `${years} Tahun`
        }
    }else if (months > 0){
        if (months > 0){    
            timeproject = `${months} Bulan ${monthsdays} Hari`
        }else{
            timeproject = `${months} Bulan`
        }
    }else if (days > 0){
        timeproject = `${days} Hari`
    }

    return timeproject;
}

async function home(req, res){
   try {

    const query = await SequelizePool.query(`SELECT blogs.id, "projectName", "startDate", "endDate", description, tech, image, author, blogs."createdAt", users.name AS author FROM blogs LEFT JOIN users ON blogs.author = users.id ORDER BY blogs.id DESC`, {type: QueryTypes.SELECT});
    const data = query.map(function (res) {
        res.timeproject = generateTimeProject(res.startDate, res.endDate);
        console.log(res.tech)
        return {...res, isLogin: req.session.isLogin};
    });
    
    const user = req.session.user;
    const isLogin = req.session.isLogin
    res.render('index', {data, isLogin, user})
    
   } catch (error) {
    throw error
   }
}

function myProject(req, res){
    const titleTab = "Add Project";
    const isLogin = req.session.isLogin;
    const user = req.session.user;
    if (!isLogin){
        res.redirect('/login');
        return;
    }
    res.render('myProject', { titleTab, isLogin, user });
}

async function addProject(req, res){
  try {
    let {projectName, startDate, endDate, description, tech} = req.body;

    const image = req.file.filename;
    const author = req.session.idUser;
    console.log(image, author);
    


    

    const blog ={
        projectName,
        startDate,
        endDate,
        // timeproject,
        description,
        tech
        // Array.isArray(tech) ? tech : [tech],
    
    };

  
    await SequelizePool.query(`INSERT INTO blogs("projectName", "startDate", "endDate", description, tech, image, author, "createdAt", "updatedAt") VALUES  ('${projectName}','${startDate}', '${endDate}', '${description}', '{${tech}}', '${image}', ${req.session.idUser}, NOW(), NOW())`);
    req.flash("addData", "1 data berhasil ditambahkan.");
    res.redirect("/home");
  } catch (error) {
    throw error

  }
}

async function delProject(req, res){
   try {
    const {id} = req.params;
    await SequelizePool.query(`DELETE FROM blogs where id=${id}`);
    req.flash("delData", "1 data telah dihapus.");
    res.redirect('/home');
   } catch (error) {
    throw error
   }
}

async function editProjectView(req, res) {
   try {
    const { id } = req.params;
    const query = await SequelizePool.query(`SELECT * FROM blogs WHERE id=${id}`, {type: QueryTypes.SELECT});
    const isLogin = req.session.isLogin;
    const user = req.session.user;
    if (!isLogin){
        res.redirect('/login');
        return;
    }


    res.render("editProject", {data:query[0], user, isLogin});
   } catch (error) {
    throw error
   }
  }

async function editedProjectView(req, res){
    try {

        const { id } = req.params;
        let {projectName, startDate, endDate, description, tech} = req.body;

        let q_image = "";
        let image = null;
        if (req.file && req.file.filename) {
            image = req.file.filename;
            q_image = `, image = '${image}'`;
        }

        const blog ={
            projectName,
            startDate,
            endDate,
            description,
            tech
          
        
        };
    
        let q = `UPDATE blogs SET "projectName" = '${projectName}', "startDate" = '${startDate}', "endDate" = '${endDate}',  description = '${description}', tech = '{${tech}}' ${q_image} WHERE id = ${id} `;

        data.unshift(blog);
        console.log(tech);
        const query = await SequelizePool.query(q, {type: QueryTypes.UPDATE});
        req.flash("updateData", "1 data berhasil diperbarui.");
        res.redirect("/home")
    } catch (error) {
        console.log(error);
        throw error
        
    }

}


async function detailProject(req, res) {
    try {
        const { id } = req.params;
        const query = await SequelizePool.query(`SELECT blogs.*, users.name AS author_name FROM blogs INNER JOIN users ON users.id = blogs.author WHERE blogs.id=${id}`, {type:QueryTypes.SELECT});
        const user = req.session.user;
        const isLogin = req.session.isLogin;
       
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let tanggalAwal = new Date(query[0].startDate);
        const dateStart = tanggalAwal.getDate();
        const monthStart = tanggalAwal.getMonth();
        const yearStart = tanggalAwal.getFullYear();

        let tanggalAkhir = new Date(query[0].endDate);
        const dateEnd = tanggalAkhir.getDate();
        const monthEnd = tanggalAkhir.getMonth();
        const yearEnd = tanggalAkhir.getFullYear();

        const fullStartDate = `${dateStart} ${months[monthStart]} ${yearStart}`;
        const fullEndDate = `${dateEnd} ${months[monthEnd]} ${yearEnd}`;
        const timeproject = generateTimeProject(query[0].startDate, query[0].endDate)

        res.render("detailProject", {data:query[0], fullStartDate, fullEndDate, user, isLogin, timeproject});
    } catch (error) {
        throw error
        
    }
  
  }

function testimonial(req, res){
    const titleTab = "Testimonials"
    const isLogin = req.session.isLogin;
    const user = req.session.user;
    res.render('testimonial', {titleTab, user, isLogin});
}

function contact(req, res){
    const tittleTab = "Contact Me";
    const isLogin = req.session.isLogin;
    const user = req.session.user;

    res.render('contact', {tittleTab, user, isLogin});
}

function register(req, res){
    const titleTab = "Register";
    res.render('register', {titleTab});
}

async function addRegister(req, res){ 
    try {
        const {username, email, password} = req.body;
        const salt = 10;

        bcrypt.hash(password, salt, async(err, hash) => {
            await SequelizePool.query(`INSERT INTO users(name, email, password, "createdAt", "updatedAt") VALUES  ('${username}','${email}', '${hash}', NOW(), NOW())`,{type:QueryTypes.INSERT});

        });
        req.flash("success", "Register berhasil. Anda dapat login")
        res.redirect('/login')
    } catch (error) {
        throw error;
    }
}



function login(req, res){
    const titleTab = "Login";
    res.render('login', {titleTab})
}

async function isLogin(req, res){
    try {
        const {email, password} = req.body

        const checkEmail = await SequelizePool.query(`SELECT * FROM users WHERE email = '${email}'`, {type: QueryTypes.SELECT} )

        if(!checkEmail.length){
            req.flash('danger', 'Email belum registrasi');
            return res.redirect('/login');
        }

        bcrypt.compare(password, checkEmail[0].password, function(err, result)  {
            if(!result){
                console.log("Password is Wrong!!!");
                return res.redirect("/login")
            }else {
                req.session.isLogin = true
                req.session.user = checkEmail[0].name
                req.session.idUser = checkEmail[0].id
                req.flash('success', 'Berhasil Login');
                return res.redirect('/home')
            }
        })
    } catch (error) {
        throw error
    }
}

function logOut(req, res){
    req.session.destroy();
    res.redirect('/home');

}


app.listen(port, () =>{
    console.log(`server berjalan di port ${port}`)
})