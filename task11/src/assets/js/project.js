
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
        <div class="col-lg-4 mt-4">
    <!-- Card -->
            <div class="card border-0 shadow">
                <img
                src="${blogs[index].image}"
                class="card-img-top"
                height="300"
                alt="..."
                />
            <div class="card-body">
                <h5 class="card-title fw-bold">
                <a href="/detailProject" class="text-dark text-decoration-none">${blogs[index].projectName}</a>
                </h5>
                <small class="text-secondary">
                <i class="fa-regular fa-clock"></i> ${blogs[index].timeproject}
                </small>
                <p class="text-paraf mt-2">
                ${blogs[index].description}
                </p>
                <div class="ikon mt-4 mb-4">
                ${blogs[index].checkbox1}
                ${blogs[index].checkbox2}
                ${blogs[index].checkbox3}
                ${blogs[index].checkbox4}
                </div>
                <div class="btn-bottom d-flex justify-content-center mb-2">
                <a href="#" class="btn btn-dark me-1 p-0 w-50">Edit</a
                ><a href="#" class="btn btn-dark p-0 w-50">Delete</a>
                </div>
            </div>
            </div>
            <!-- Close Card -->
        </div>
        `
    }

   
    
}




