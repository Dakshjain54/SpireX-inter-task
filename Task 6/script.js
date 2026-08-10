const bmiForm = document.querySelector('#bmiForm');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const errorMessage = document.querySelector('#errorMessage');
const resultBox = document.querySelector('#resultBox');
const bmiValueDisplay = document.querySelector('#bmiValue');
const bmiCategoryDisplay = document.querySelector('#bmiCategory');
const bmiMessageDisplay = document.querySelector('#bmiMessage');

// Event Listener for Form Submission
bmiForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Read input values
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  // Validate inputs
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    showError('Please enter valid height and weight.');
    return;
  }

  // Clear previous errors if inputs are valid
  hideError();

  // Calculate BMI: weight (kg) / (height (m))^2
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const roundedBmi = bmi.toFixed(1);

  // Determine BMI category & message
  const resultData = getBmiCategory(bmi);

  // Display results in DOM
  displayResult(roundedBmi, resultData.category, resultData.categoryClass, resultData.message);
});

// Function to calculate category and return details
function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return {
      category: 'Underweight',
      categoryClass: 'category-underweight',
      message: 'Your BMI suggests you are underweight.'
    };
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return {
      category: 'Normal Weight',
      categoryClass: 'category-normal',
      message: 'Your BMI is within the normal range.'
    };
  } else if (bmi >= 25 && bmi <= 29.9) {
    return {
      category: 'Overweight',
      categoryClass: 'category-overweight',
      message: 'Your BMI indicates you are overweight.'
    };
  } else {
    return {
      category: 'Obese',
      categoryClass: 'category-obese',
      message: 'Your BMI falls in the obese range.'
    };
  }
}

// Function to display the result in the UI
function displayResult(bmiValue, category, categoryClass, message) {
  bmiValueDisplay.textContent = bmiValue;
  bmiCategoryDisplay.textContent = category;
  bmiMessageDisplay.textContent = message;

  // Reset category styling classes and set the active category class
  bmiCategoryDisplay.className = 'bmi-category ' + categoryClass;

  // Reveal the result box smoothly
  resultBox.classList.remove('hidden');
}

// Function to display error message
function showError(messageText) {
  errorMessage.textContent = messageText;
  errorMessage.classList.remove('hidden');
  resultBox.classList.add('hidden');
}

// Function to hide error message
function hideError() {
  errorMessage.classList.add('hidden');
}
