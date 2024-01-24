function submitData() {
    let projectName = document.getElementById("projectName").value;
    let start = document.getElementById("start-date").value;
    let end = document.getElementById("end-date").value;
    let description = document.getElementById("description").value;
    let image = document.getElementById("inputImage").files;

    if (project == "") {
        return alert("Nama project harus diisi yak");
     } else if (start == "") {
        return alert("Tanggal mulai harus diisi yak");
     } else if (end == "") {
        return alert("Tanggal selesai harus diisi yak");
     } else if (description == "") {
        return alert("Deskripsi harus diisi yak");
     } else if (image == "") {
        return alert("Gambar harus diisi yak");
     }
};



let dataBlog = [];

function addBlog(event) {
    event.preventDefault();

    let projectName = document.getElementById("projectName").value;
    let start = document.getElementById("start-date").value;
    let end = document.getElementById("end-date").value;
    let description = document.getElementById("description").value;

    const nodejs = '<i class="fa-brands fa-node-js"></i>';
    const reactjs = '<i class="fa-brands fa-html5"></i>';
    const vuejs = '<i class="fa-brands fa-php"></i>';
    const javascripts = '<i class="fa-brands fa-react"></i>';

    let iconnodejs = document.getElementById("nodejs").checked ? nodejs : "";
    let iconhtml = document.getElementById("reactjs").checked ? rectjs : "";
    let iconphp = document.getElementById("vuejs").checked ? vuejs : "";
    let iconreactjs = document.getElementById("javascripts").checked ? javascripts : "";
    // let checkbox = document.getElementById("technologies").value;
    let image = document.getElementById("inputImage").files;

    // membuat url
    image = URL.createObjectURL(image[0]);
    console.log(image);

    let blog = {
      projectName,
      start,
      end,
      description,
      iconnodejs,
      iconreactjs,
      iconvuejs,
      iconjavascripts,
                  // checkbox,
      inputImage             
    };

    dataBlog.push(blog);
    console.log(dataBlog);

    renderBlog();
}

function renderBlog(){
   document.getElementById("content").innerHTML = "";

   for (let index = 0; index < dataBlog.length; index++){
      document.getElementById("content").innerHTML += `
      <div class="card" >
            <img src="${dataBlog[index].inputImage}" alt="hp";>
            <p class="title">${dataBlog[index].projectName}</p>
            <p>${dataBlog[index].start} Sampai ${dataBlog[index].end}</p>
            <p class="about">${dataBlog[index].description}</p>
            <p>${dataBlog[index].iconnodejs}${dataBlog[index].iconreactjsl}${dataBlog[index].iconvuejs}${dataBlog[index].iconjavascripts}</p>
            <div class="button">
               <button>edit</button>
               <button>delete</button>
            </div>  
         </div>
      `;  
   }

}