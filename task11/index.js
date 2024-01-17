const express = require('express')
const { handlebars } = require('hbs')
const app = express()
const port = 5000

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));

app.get('/home', home)
app.get('/project', myProject)
app.get('/detailProject/:id', detailProject)
app.get('/testimonial', testimonial)
app.get('/contact-me', contact)


function home(req, res){
    res.render('index')
}

function myProject(req, res){
    const data = [
        {
          id: 0,
          image: `assets/img/camera.jpg`,
          tittle: `Judul 1`,
          timeProject: `30 days ago`,
          deskripsi: `deskirpsi 1`,
          node: `<i class="fa-brands fa-node-js fa-2xl"></i>`,
          react: `<i class="fa-brands fa-react fa-2xl"></i>`,
          vue: `<i class="fa-brands fa-vuejs fa-2xl"></i>`,
          js: `<i
          class="fa-brands fa-square-js fa-2xl"
          style="color: #000000"></i>`,
        },
        {
          id: 1,
          image: `assets/img/camera.jpg`,
          tittle: `Judul 2`,
          timeProject: `1 month ago`,
          deskripsi: `deskirpsi 2`,
          react: `<i class="fa-brands fa-react fa-2xl"></i>`,
          js: `<i
          class="fa-brands fa-square-js fa-2xl"
          style="color: #000000"></i>`,
        },
        {
          id: 2,
          image: `assets/img/camera.jpg`,
          tittle: `Judul 3`,
          timeProject: `1 year ago`,
          deskripsi: `deskirpsi 3`,
          node: `<i class="fa-brands fa-node-js fa-2xl"></i>`,
          vue: `<i class="fa-brands fa-vuejs fa-2xl"></i>`,
          js: `<i
          class="fa-brands fa-square-js fa-2xl"
          style="color: #000000"></i>`,
        },
        {
          id: 3,
          image: `assets/img/tips-foto-aesthetics-2.png`,
          tittle: `Judul 4`,
          timeProject: `2 month 1 days ago`,
          deskripsi: `deskirpsi 4`,
          vue: `<i class="fa-brands fa-vuejs fa-2xl"></i>`,
          js: `<i
          class="fa-brands fa-square-js fa-2xl"
          style="color: #000000"></i>`,
        },
      ];
    res.render('myProject', { data })
}

function detailProject(req, res) {
    res.render("detailProject");
  }

function testimonial(req, res){
    res.render('testimonial')
}

function contact(req, res){
    res.render('contact')
}

app.listen(port, () =>{
    console.log(`server berjalan di port ${port}`)
})