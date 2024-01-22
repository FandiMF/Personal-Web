const express = require('express')
const  dbPool  = require('./src/connection/index')
const { handlebars } = require('hbs')
const app = express()
const port = 5000

// use handlebars for template engine
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
app.post("/reproject", editProject);

app.get('/detailProject/:id', detailProject)

app.get('/testimonial', testimonial)

app.get('/contact-me', contact)

let data = [];
console.log(dbPool)

function home(req, res){
    const titleTab = "Home";
    res.render('index', {data, titleTab})
}

function myProject(req, res){
    const titleTab = "Add Project";
    res.render('myProject', { titleTab });
}

function addProject(req, res){
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
    timeproject,
    description,
    tech: Array.isArray(tech) ? tech : [tech],
  
};

data.unshift(blog);
res.redirect("/home")
}

function delProject(req, res){
    const {id} = req.params;

    data.splice(id, 1);
    res.redirect('/home');
}

function editProjectView(req, res) {
    const { id } = req.params;
  
    const dataFilter = data[parseInt(id)];
    dataFilter.id = parseInt(id);
    console.log(dataFilter)
    res.render("editProject", { data: dataFilter });
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

function detailProject(req, res) {
  const { id } = req.params;
  const titleTab = "Detail Project";
  const detailData = data[parseInt(id)];

  detailData.id = parseInt(id);

    res.render("detail-project", {detailData, titleTab});
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