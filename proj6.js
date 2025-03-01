function createAccount() {
    // Prevent reload
    event.preventDefault();

    let form = document.forms['contactform'];
    
    // Form validation
    try 
    {
        
        // -- Validate Full Name -- \\
        console.log(form.elements["name"].value);
        // Length validation
        if (form.elements["name"].value == "")
            throw "Full Name cannot be empty!";

        // Using RegEx test if the full name contains only letters
        let letters = /^[a-z ]+$/i;
        if (!letters.test(form.elements["name"].value))
            throw "Full Name needs to be alphabetic!";

        // -- Validate Username -- \\
        console.log(form.elements["username"].value);
        // Length validation

        if (form.elements["username"].value.length < 6)
            throw "Username is too short!";
        else if (form.elements["username"].value.length > 15)
            throw "Username is too long!";

        // Validate that the username starts with a letter
        if (!/^[a-z]/i.test(form.elements["username"].value))
            throw "Username must start with a letter!"
        
        // Using RegEx test if the username contains only alphanumeric characters
        let alphanumeric = /^[a-z0-9 ]+$/i;
        if (!alphanumeric.test(form.elements["username"].value))
            throw "Username needs to be alphanumeric!";

        // -- Validate Email -- \\
        console.log(form.elements["email"].value);

        if (form.elements["email"].value == "")
            throw "Email cannot be empty!";

        // Using RegEx test if the email is in the correct format
        let email = /\S+@\S+\.\S+/;
        if (!email.test(form.elements["email"].value))
            throw "Email is not in the correct format!";

        // -- Validate Password -- \\
        // Length validation
        if (form.elements["password"].value.length < 8)
            throw "Password is too short!";
        else if (form.elements["password"].value.length > 20)
            throw "Password is too long!";

        // Contains one uppercase letter
        if (!/[A-Z]/.test(form.elements["password"].value))
            throw "Password needs an uppercase letter!";

        // Contains one lowercase letter
        if (!/[a-z]/.test(form.elements["password"].value))
            throw "Password needs a lowercase letter!";

        // Contains one digit and special character
        if (!/\d/.test(form.elements["password"].value))
            throw "Password needs a digit!";
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.elements["password"].value))
            throw "Password needs a special character!";

        // -- Validate Password and Confirm Password -- \\
        if (form.elements["password"].value != form.elements["confirm-password"].value)
            throw "Passwords do not match";
        
        // -- Validate Phone Number -- \\
        console.log(form.elements["phone"].value);
        // Length validation
        if (form.elements["phone"].value.length < 10)
            throw "Phone number is too short!";
        else if (form.elements["phone"].value.length > 15)
            throw "Phone number is too long!";

        // Using RegEx test if the phone number contains only numbers
        let numbers = /^[0-9-()\ ]+$/;
        if (!numbers.test(form.elements["phone"].value))
            throw "Phone number needs to be numeric!";

        // -- Validate Date of Birth -- \\
        console.log(form.elements["date-of-birth"].value);
        if (form.elements["date-of-birth"].value == "")
            throw "Date of Birth cannot be empty!";

        // Age validation
        let dob = new Date(form.elements["date-of-birth"].value);
        let ageDifMs = Date.now() - dob.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (age < 18)
            throw "You must be at least 18 years old to create an account!";
        
        // -- Ensure Terms are agreed to -- \\
        console.log(form.elements["confirm-agreement"].value);
        if (form.elements["confirm-agreement"].value == 'off')
            throw "You must agree to the terms and conditions!";
    }
    catch (err)
    {
        alert(err);
    }


}

// Function to end the agreement overlay
function hideAgreement() {
    document.getElementById("overlay").style.display = "none";

    // Remove overlay-text
    let overlayText = document.getElementById("overlay-text");
    overlayText.remove();
}

// Function to create and start the agreement overlay
function showAgreement() {
    // Prevent reload
    event.preventDefault();

    let overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    // Create overlay-text
    let overlayText = document.createElement("div");
    overlayText.id = "overlay-text";
    overlay.appendChild(overlayText);

    // Create closeOverla
    let closeOverlay = document.createElement("button");
    closeOverlay.id = "closeOverlay";
    closeOverlay.textContent = "X";
    closeOverlay.addEventListener("click", hideAgreement);
    overlayText.appendChild(closeOverlay);

    // Create break to make the overlay look better
    let br = document.createElement("br");
    overlayText.appendChild(br);

    // Create agreement title
    let agreementTitle = document.createElement("h1");
    agreementTitle.id = "agreementTitle";
    agreementTitle.textContent = "Terms and Conditions";
    overlayText.appendChild(agreementTitle);

    // Create agreement text
    let agreementText = document.createElement("p");
    agreementText.id = "agreementText";
    agreementText.textContent = "By creating an account, you agree to the terms and conditions of the Software Development Club. These terms include but are not limited to: not sharing your account information with others, not using the account for malicious purposes, and not using the account to break any laws. If you do not agree to these terms, you will not be able to create an account.";
    overlayText.appendChild(agreementText);
}
