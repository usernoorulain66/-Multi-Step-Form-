const form = document.getElementById("registrationForm");
const steps = document.querySelectorAll(".form-step");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const submitButton = document.getElementById("submitButton");
const progress = document.getElementById("progress");
const stepText = document.getElementById("stepText");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const summary = document.getElementById("summary");
let currentStep = 0;
const inputs = form.querySelectorAll("input, select, textarea");
function showStep() {
    steps.forEach(function(step, index) {
        step.classList.remove("active");
        if (index === currentStep) {
            step.classList.add("active");
        }
    });
    prevButton.style.display = "block";
    nextButton.style.display = "block";
    submitButton.style.display = "none";
    if (currentStep === 0) {
        prevButton.style.display = "none";
    }
    if (currentStep === steps.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "block";
        showSummary();
    }

    let percentage = ((currentStep + 1) / steps.length) * 100;
    progress.style.width = percentage + "%";
    stepText.textContent = "Step " + (currentStep + 1) + " of " + steps.length;
    errorMessage.textContent = "";
}
function validateStep() {
    const currentFields = steps[currentStep].querySelectorAll("input, select, textarea");
    for (let field of currentFields) {
        if (field.value.trim() === "") {
            errorMessage.textContent = "Please fill in all required fields.";
            field.focus();
            return false;
        }
        if (field.type === "email" && !field.checkValidity()) {
            errorMessage.textContent = "Please enter a valid email address.";
            field.focus();
            return false;
        }

    }
    errorMessage.textContent = "";
    return true;
}
nextButton.addEventListener("click", function() {

    if (validateStep()) {

        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep();
        }

    }

});
prevButton.addEventListener("click", function() {
    if (currentStep > 0) {
        currentStep--;
        showStep();
    }

});
function showSummary() {
    summary.innerHTML = `
        <p><strong>Full Name:</strong> ${document.getElementById("fullName").value}</p>
        <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
        <p><strong>Phone:</strong> ${document.getElementById("phone").value}</p>
        <p><strong>Course:</strong> ${document.getElementById("course").value}</p>
        <p><strong>Education:</strong> ${document.getElementById("education").value}</p>
        <p><strong>Experience:</strong> ${document.getElementById("experience").value}</p>
    `;

}
function saveData() {
    const formData = {};

    inputs.forEach(function(input) {
        formData[input.id] = input.value;
    });

    localStorage.setItem("registrationData", JSON.stringify(formData));

}
function loadData() {
    const savedData = localStorage.getItem("registrationData");
    if (savedData) {
        const formData = JSON.parse(savedData);
        inputs.forEach(function(input) {
            if (formData[input.id] !== undefined) {
                input.value = formData[input.id];
            }
        });
    }
}
inputs.forEach(function(input) {
    input.addEventListener("input", saveData);
    input.addEventListener("change", saveData);
});
form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateStep()) {
        successMessage.textContent = "Registration submitted successfully!";
        localStorage.removeItem("registrationData");
        submitButton.disabled = true;
        submitButton.textContent = "Submitted";
    }
});
loadData();
showStep();
