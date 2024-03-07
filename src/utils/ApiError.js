// this class is created to define how the errors will be shown
// Define a custom error class named ApiError that extends the built-in Error class
class ApiError extends Error {
    // Constructor function for initializing the ApiError instance
    constructor(
        // Parameters for the constructor function
        statusCode,     // HTTP status code for the error
        message = "something went wrong",   // Error message, defaults to "something went wrong"
        errors = [],    // Array to store additional error details, defaults to an empty array
        stack = ""      // Stack trace of the error, defaults to an empty string
    ) {
        // Call the constructor of the base Error class
        super(message);
        
        // Initialize properties of the ApiError instance
        this.statusCode = statusCode;   // Assign the provided HTTP status code to the statusCode property
        this.data = null;   // Initialize data property to null
        this.message = message;   // Assign the provided error message to the message property
        this.errors = errors;     // Assign the provided errors array to the errors property
        this.stack = stack;       // Assign the provided stack trace to the stack property

        // Set the success property to false by default
        this.success = false;

        // Check if a stack trace is provided
        if (stack) {
            // If provided, assign the stack trace to the stack property
            this.stack = stack;
        } else {
            // If not provided, capture the stack trace using Error.captureStackTrace method
            // and assign it to the stack property
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Export the ApiError class to make it available for use in other modules
export { ApiError };
