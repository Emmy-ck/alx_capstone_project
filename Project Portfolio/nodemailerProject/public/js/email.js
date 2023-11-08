//Function to validate the email
function validateEmail() {
    const email = document.getElementById('email').value;
    const errorElement = document.getElementById('error');

    //Regular expression to validate email format
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (emailRegex.test(email)) {
        //Clear error message to allow form submission
        errorElement.textContent = '';
        return true;
    } else {
        //Display error message and prevent form submission
        errorElement.textContent = 'Please enter a valid email address.';
        return false;
    }
}
//Add an event listener to the form to call the validation function on submission
document.getElementById('emailForm').addEventListener('submit', function(event) {
    if (!validateEmail()) {
        event.preventDefault(); //Prevent form submission if email format is incorrect
    }
});