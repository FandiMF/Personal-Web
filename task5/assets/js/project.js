
const blogs = []

function addBlog(event){
    event.preventDefault()

    let projectName = document.getElementById("projectName").value;
    let start = new Date(document.getElementById("start-date").value);
    let end = new Date(document.getElementById("end-date").value);
    let description = document.getElementById("description").value;
    let checkbox1 = document.getElementById("mycheckbox1").checked ? `<i class="fa-brands fa-node"></i>` : "";
    let checkbox2 = document.getElementById("mycheckbox2").checked ? `<i class="fa-brands fa-react"></i>` : "";
    let checkbox3 = document.getElementById("mycheckbox3").checked ? `<i class="fa-brands fa-vuejs"></i>` : "";
    let checkbox4 = document.getElementById("mycheckbox4").checked ? `<i class="fa-brands fa-js"></i>` : "";
    let image = document.getElementById("inputImage").files;


    let diff = end.getTime() - start.getTime();
    let days = diff / ((1000 * 3600 * 24));
    let months = Math.floor (days / 30);
    let monthsdays = days  % 30;
    let years = Math.floor (days / 365);
    let yearsdays = days % 365;

    let timeproject = "";
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

    console.log(timeproject);

    image = URL.createObjectURL(image[0]);

    const blog ={
        projectName,
        start,
        end,
        timeproject,
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
            <p>durasi : ${blogs[index].timeproject}</p>
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




