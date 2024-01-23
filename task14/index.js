const express = require('express')
const  dbPool  = require('./src/connection/index')
const { handlebars } = require('hbs')
const app = express()
const port = 5000

// sequelize config
const { development } = require('./src/config/config.json');
const { Sequelize, QueryTypes } = require('sequelize');
const SequelizePool = new Sequelize(development);

// use handlebars for template enginw
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({extended: false}));    //bodyParse

// ALAMAT ROUTING
app.get('/home', home)


app.get('/project', myProject)
app.post('/project', addProject)

app.get('/delete/:id', delProject)

app.get("/reproject/:id", editProjectView);
app.post("/reproject/:id", editedProjectView);
app.post("/reproject", editProject);

app.get('/detailProject/:id', detailProject)

app.get('/testimonial', testimonial)

app.get('/contact-me', contact)

let data = [];


async function home(req, res){
   try {
    const query = await SequelizePool.query(`SELECT * FROM blogs`, {type: QueryTypes.SELECT});
    const data = query.map(res => ({
        ...res
    }))
    console.log(query)
    res.render('index', {data:query})
    
   } catch (error) {
    throw error
   }
}

function myProject(req, res){
    const titleTab = "Add Project";
    res.render('myProject', { titleTab });
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
    res.redirect('/home');
   } catch (error) {
    throw error
   }
}

async function editProjectView(req, res) {
   try {
    const { id } = req.params;
    const query = await SequelizePool.query(`SELECT * FROM blogs WHERE id=${id}`, {type: QueryTypes.SELECT});
    res.render("editProject", {data:query[0]});
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

        res.redirect("/home")
    } catch (error) {
        console.log(error);
        throw error
        
    }

}



function editProject(req, res){
    let {id,projectName, startDate, endDate, description, tech} = req.body;
   
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

   data[+id] ={
    projectName,
    startDate,
    endDate,
    timeproject,
    description,
     tech: Array.isArray(tech) ? tech : [tech],
  
};


res.redirect("/home")

}

async function detailProject(req, res) {
    try {
        const { id } = req.params;
        const query = await SequelizePool.query(`SELECT * FROM blogs WHERE id=${id}`, {type:QueryTypes.SELECT});
       
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

        res.render("detailProject", {data:query[0], fullStartDate, fullEndDate});
    } catch (error) {
        throw error
        
    }
  
  }

function testimonial(req, res){
    const titleTab = "Testimonials"
    res.render('testimonial', {titleTab})
}

function contact(req, res){
    const tittleTab = "Contact Me";
    res.render('contact', {tittleTab})
}

app.listen(port, () =>{
    console.log(`server berjalan di port ${port}`)
})