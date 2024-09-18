// Register the service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function(error) {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }
  
  // Calculator functionality
  const display = document.querySelector('input[name="display"]');
  const buttons = document.querySelectorAll('button');
  
  // Add event listeners for all buttons
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const value = event.target.value;
  
      if (value === "=") {
        try {
          display.value = eval(display.value); // Evaluate the expression in the display
        } catch (error) {
          display.value = "Error"; // Handle invalid expressions
        }
      } else if (value === "AC") {
        display.value = ""; // Clear display
      } else if (value === "DEL") {
        display.value = display.value.slice(0, -1); // Delete last character
      } else {
        display.value += value; // Add input to the display
      }
    });
  });
  