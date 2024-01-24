const express = require('express')
const  dbPool  = require('./src/connection/index')
const { handlebars } = require('hbs')
const app = express()
const port = 5000

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
app.post('/project', addProject)

app.get('/delete/:id', delProject)

app.get("/reproject/:id", editProjectView);
app.post("/reproject/:id", editedProjectView);

app.get('/detailProject/:id', detailProject)

app.get('/testimonial', testimonial)

app.get('/contact-me', contact)

app.get('/register', register)
app.post('/register', addRegister)

app.get('/login', login)
app.post('/login', isLogin)

app.get('/login', logOut)

let data = [];


async function home(req, res){
   try {
    const query = await SequelizePool.query(`SELECT * FROM blogs`, {type: QueryTypes.SELECT});
    const data = query.map(res => ({
        ...res, 
        isLogin: req.session.isLogin
    }))
    
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
    res.render('myProject', { titleTab, isLogin, user });
}

async function addProject(req, res){
  try {
        let {projectName, startDate, endDate, description, tech} = req.body;

    let start = new Date(startDate);
    let end = new Date(endDate);

    let diff = end.getTime() - start.getTime();
    let days = diff / ((1000 * 3600 * 24));
    let months = Math.floor (days / 30);
    let monthsdays = days  % 30;
    let years = Math.floor (days / 365);
    let yearsdays = days % 365;

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

    const blog ={
        projectName,
        startDate,
        endDate,
        // timeproject,
        description,
        tech
        // Array.isArray(tech) ? tech : [tech],
    
    };

  
    const query = await SequelizePool.query(`INSERT INTO blogs(name, start_date, end_date, description, technologies, timeproject) VALUES  ('${projectName}','${startDate}', '${endDate}', '${description}', '{${tech}}', '${timeproject}')`);
    req.flash("addData", "1 data berhasil ditambahkan.");
    res.redirect("/home");
    console.log(query)
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
    const user = req.session.user;
    const isLogin = req.session.isLogin;


    res.render("editProject", {data:query[0], user, isLogin});
   } catch (error) {
    throw error
   }
  }

async function editedProjectView(req, res){
    try {

        const { id } = req.params;
        let {projectName, startDate, endDate, description, tech} = req.body;
        console.log(req.body);

        let start = new Date(startDate);
        let end = new Date(endDate);
    
        let diff = end.getTime() - start.getTime();
        let days = diff / ((1000 * 3600 * 24));
        let months = Math.floor (days / 30);
        let monthsdays = days  % 30;
        let years = Math.floor (days / 365);
        let yearsdays = days % 365;
    
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
    
        const blog ={
            projectName,
            startDate,
            endDate,
            timeproject,
            description,
            tech
            // Array.isArray(tech) ? tech : [tech],
        
        };
    
        data.unshift(blog);
        const query = await SequelizePool.query(`UPDATE blogs SET name = '${projectName}', start_date = '${startDate}', end_date = '${endDate}', timeproject = '${timeproject}',  description = '${description}', technologies = '{${tech}}' WHERE id = ${id} `, {type: QueryTypes.UPDATE});
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
        const query = await SequelizePool.query(`SELECT * FROM blogs WHERE id=${id}`, {type:QueryTypes.SELECT});
        const user = req.session.user;
        const isLogin = req.session.isLogin;
       
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let tanggalAwal = new Date(query[0].start_date);
        const dateStart = tanggalAwal.getDate();
        const monthStart = tanggalAwal.getMonth();
        const yearStart = tanggalAwal.getFullYear();

        let tanggalAkhir = new Date(query[0].end_date);
        const dateEnd = tanggalAkhir.getDate();
        const monthEnd = tanggalAkhir.getMonth();
        const yearEnd = tanggalAkhir.getFullYear();

        const fullStartDate = `${dateStart} ${months[monthStart]} ${yearStart}`;
        const fullEndDate = `${dateEnd} ${months[monthEnd]} ${yearEnd}`;

        res.render("detailProject", {data:query[0], fullStartDate, fullEndDate, user, isLogin});
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
            await SequelizePool.query(`INSERT INTO users(name, email, password) VALUES  ('${username}','${email}', '${hash}')`,{type:QueryTypes.INSERT});

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