function submitData() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
 
    if (name == "") {
       return alert("Nama harus diisi yak");
    } else if (email == "") {
       return alert("Email harus diisi yak");
    } else if (phoneNumber == "") {
       return alert("Nomor harus diisi yak");
    } else if (subject == "") {
       return alert("Subject harus dipilih yak");
    } else if (message == "") {
       return alert("Pesan harus diisi yak");
    }
 
    let emailReceiver = "rrover068@gmail.com"
 
    let a = document.createElement("a");
    a.href = `mailto:${emailReceiver}?subject=${subject}&body= ${encodeURIComponent(message)} Halo, nama saya ${name}, ${message}. Silakan kontak saya di nomor ${phoneNumber}, terima kasih.` ;
    a.click();
 
    console.log(name);
    console.log(email);
    console.log(phoneNumber);
    console.log(subject);
    console.log(message);
 
    let emailer = {
       name,
       email,
       phoneNumber,
       subject,
       message,
     };
   
     console.log(emailer);
 }
 