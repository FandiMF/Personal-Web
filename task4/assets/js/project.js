
const blogs = []

function addBlog(event){
    event.preventDefault()

    let projectName = document.getElementById("projectName").value;
    let start = document.getElementById("start-date").value;
    let end = document.getElementById("end-date").value;
    let description = document.getElementById("description").value;
    let checkbox1 = document.getElementById("mycheckbox1").checked ? `<i class="fa-brands fa-node"></i>` : "";
    let checkbox2 = document.getElementById("mycheckbox2").checked ? `<i class="fa-brands fa-react"></i>` : "";
    let checkbox3 = document.getElementById("mycheckbox3").checked ? `<i class="fa-brands fa-vuejs"></i>` : "";
    let checkbox4 = document.getElementById("mycheckbox4").checked ? `<i class="fa-brands fa-js"></i>` : "";
    let image = document.getElementById("inputImage").files;
    image = URL.createObjectURL(image[0]);

    const blog ={
        projectName,
        start,
        end,
        description,
        checkbox1,
        checkbox2,
        checkbox3,
        checkbox4,
        image,
    }
    blogs.push(blog)
    renderBlog()
   
}

function renderBlog(){
    document.getElementById("content").innerHTML = "";

    for(let index = 0; index < blogs.length; index++){
        document.getElementById("content").innerHTML +=
         `
        
        <div class="card">
        <img src="${blogs[index].image}" alt="blog">
            <a href="detail-project.html" target="_blank"><p class="title">${blogs[index].projectName}</p></a>
            <p>durasi : ${blogs[index].start} | ${blogs[index].end}</p>
            <p class="about">${blogs[index].description}</p>
            <p>
            ${blogs[index].checkbox1}
            ${blogs[index].checkbox2}
            ${blogs[index].checkbox3}
            ${blogs[index].checkbox4}
            </p>
            
            <div class="button">
                <button class="btn-edit">edit</button>
                   <button class="btn-delete">delete</button>
            </div>  
        </div>
        `
    }

   
    
}




