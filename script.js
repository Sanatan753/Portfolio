let touchStartY = 0;
let touchEndY = 0;

document.querySelector('.background_index').addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.querySelector('.background_index').addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    if (touchEndY > touchStartY + 50) { // If the user swipes down more than 50 pixels
        location.reload();
    }
});

function openPage(url) {
  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    const box = document.getElementById("submittedData")
    const submittedDataDiv = document.getElementById("submittedData");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      const formData = new FormData(form); // Create FormData object from the form
      const request = new XMLHttpRequest(); // Create XMLHttpRequest object
  
      request.open("POST", form.action); // Specify POST method and form action URL
  
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            // Handle successful form submission
            console.log("Form submitted successfully!");
  
            // Display the submitted data
            const responseData = JSON.parse(request.responseText);
            const username = responseData.username;
            submittedDataDiv.innerHTML = `<p>Username: ${username}</p>`;
          } else {
            // Handle form submission error
            console.error("Form submission error!");
          }
        }
      };
  
      request.send(formData); // Send form data
  
      // Optionally, reset the form after submission
      form.reset();
    });
  });
  