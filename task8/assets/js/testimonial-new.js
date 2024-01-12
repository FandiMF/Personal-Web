const testimonials =[
    {
        author: "Fandi",
        review: "Sipdeh",
        image: "assets/img/camera.jpg",
        rating: 1
    },
    {
        author: "Muhammad",
        review: "Bagusdeh",
        image: "assets/img/camera.jpg",
        rating: 2
    },
    {
        author: "Fajar",
        review: "Okeydeh",
        image: "assets/img/camera.jpg",
        rating: 3
    },
    {
        author: "Andi",
        review: "Okeydeh",
        image: "assets/img/camera.jpg",
        rating: 4
    },
    {
      author: "Inda",
      review: "Okeydeh",
      image: "assets/img/camera.jpg",
      rating: 4
  }
]

function html(value){
    return `<div class="card-project">
                <div class="col-card-img">
                    <img src="${value.image}" alt="foto" />
                </div>
                <div class="col-card-2">
                    <div class="card-text">
                    <p class="text-review"><i>"${value.review}"</i></p>
                    </div>
                
                    <div class="card-text-author">
                    <p class="author-name">${value.author}</p>
                    <p class="author-name">${value.rating}</p>
                    </div>
                </div>
            </div>`;
}

function allTestimonial(){

    let testimonialHtml = ``;

    testimonials.forEach((value) => {
        testimonialHtml += html(value);
       
    });   
    document.getElementById("testimonials").innerHTML = testimonialHtml;
}



function testimonialClick(rating) {
    let testimonialHtml = ``;
  
    const filterTestimonial = testimonials.filter((value) => {
      return value.rating === rating;
    });
    if (filterTestimonial.length === 0) {
      testimonialHtml = `<div class="alert-text">
        <h3 class="text-alert">404 NOT FOUND!!!</h3>
      </div>`;
    } else {
      console.info("Data terfilter : ", filterTestimonial);
      filterTestimonial.forEach((value) => {
        testimonialHtml += html(value);
      });
    }
    document.getElementById("testimonials").innerHTML = testimonialHtml;
  }






