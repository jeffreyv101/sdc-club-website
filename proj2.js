function displayResults() {
    // Results from form:
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Birth year calculation:
    let birthYear = new Date().getFullYear() - age;
    
    // Display results on Website and in console:
    document.getElementById("results").innerHTML = generateGreeting(name);
    console.log("Form submitted successfully!");
    console.log("Name: " + name + "\nAge: " + age + "\nBirth Year: " + birthYear + "\nEmail: " + email + "\nMessage: " + message);
    
    // Prevent form submission:
    event.preventDefault();
    return false;
}

// Function to generate greeting:
function generateGreeting(name) {
    // This will output to the website:
    let greeting = `<img src="images/logo.png" alt="Software Development Club Logo"><h3>Hello ` + name + `!</h3><p>We will be in touch! We are excited to see what we can make together 🚀!</p><br>`;
    return greeting;
}