class Testi {
    constructor(image, review, author) {
      this.image = image;
      this.review = review;
      this.author = author;
    }
  
    html() {
      return ` <div class="card-project">
      <div class="col-card-img">
        <img src="${this.image}" alt="foto" />
      </div>
      <div class="col-card-2">
        <div class="card-text">
          <p class="text-review"><i>"${this.review}"</i></p>
        </div>
  
        <div class="card-text-author">
          <p class="author-name">${this.author}</p>
        </div>
      </div>
    </div>`;
    }
  }
  
 
  class CardFirst extends Testi {
    getValue() {
      return `${this.image} ${this.review} ${this.author}`;
    }
  }
  
  
  let testimonial1 = new Testi(
    "assets/img/camera.jpg",
    "Sangat Keren",
    "Adi"
  );
  let testimonial2 = new Testi("assets/img/camera.jpg", "Mudah dipahami", "Ali");
  let testimonial3 = new Testi(
    "assets/img/camera.jpg",
    "Sangat Memuaskan",
    "Ari"
  );
  let testimonial4 = new Testi("assets/img/camera.jpg", "Sangat baik", "Abi");
  let testimonial5 = new Testi(
    "assets/img/camera.jpg",
    "Dapat dipahami",
    "Avi"
  );
  let testimonial6 = new CardFirst("assets/img/camera.jpg", "Bagus", "Fajar");
  
  let testimonials = [
    testimonial1,
    testimonial2,
    testimonial3,
    testimonial4,
    testimonial5,
    testimonial6,

  ];
  console.info(testimonials);
  
  let testimonialHtml = "";
  for (let index = 0; index < testimonials.length; index++) {
    testimonialHtml += testimonials[index].html();
  }
  document.getElementById("testimonial").innerHTML = testimonialHtml;