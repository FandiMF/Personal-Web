// NGODING AJA DULU, JAGONYA BELAKANGAN!!!
function getTestimonialData (){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open("GET", "https://api.npoint.io/a25f945621eb8534eae0",true)
        xhr.onload = () => {
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText)
                resolve(response)
            }else{
                reject('Error Loading Data')
            }

            xhr.onerror = () =>{
                reject("Network ERROR!!!")
            }
        
        }

        xhr.send()
        
        
    })
}



async function allTestimonial(){
    document.getElementById("testimonials").innerHTML = "LOADING..."
    const testimonials = await getTestimonialData()


    let testimonialHtml = ""

    testimonials.forEach((value) => {
        testimonialHtml += `
        <div class="col-lg-3 m-1">
            <div class="card-project  shadow">
                                <div class="col-card-img">
                                    <img class="img-fluid" src="${value.image}" alt="foto" />
                                </div>
                                <div class="col-card-2">
                                    <div class="card-text">
                                    <p class="text-review"><i>"${value.review}"</i></p>
                                    </div>
                                
                                    <div class="card-text-author">
                                    <p class="author-name">${value.author}</p>
                                    <p class="rating">${value.rating}</p>
                                    </div>
                                    </div>
                                </div>
                            </div>`       
    });   
    document.getElementById("testimonials").innerHTML = testimonialHtml;
}



allTestimonial()
async function  filterTestimonial(rating) {
    document.getElementById("testimonials").innerHTML = "LOADING....."
    const testimonials = await getTestimonialData();


    const filteredTestimonial = testimonials.filter((value) => value.rating === rating)

    if (!filteredTestimonial.length) {

        return document.getElementById("testimonials").innerHTML = "<h1>Data Not Found!!!</h1>"}
        let filteredTestimonialHTML = ""

        filteredTestimonial.forEach((value) => {
            filteredTestimonialHTML += ` <div class="col-lg-3 m-1">
            <div class="card-project  shadow">
                                <div class="col-card-img">
                                    <img class="img-fluid" src="${value.image}" alt="foto" />
                                </div>
                                <div class="col-card-2">
                                    <div class="card-text">
                                        <p class="text-review"><i>"${value.review}"</i></p>
                                    </div>
                                
                                    <div class="card-text-author">
                                        <p class="author-name">${value.author}</p>
                                    </div>
                                    <div>
                                        <p class="rating">${value.rating}</p>
                                    </div>
                                    </div>
                                </div>
                            </div>`
        })
      
       
    document.getElementById("testimonials").innerHTML = filteredTestimonialHTML;
  }








