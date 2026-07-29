/**
 * Greeting Builder
 * This is a small greeting helper. The main function, "createGreeting", should take a person's name, last name,
 * and time of day, the return greeting string.
 */

/**
 * Write these functions:
 * - formatName(firstName, lastName): should return the first and last name as one string.
 * - getGreeting(timeOfDay): should return "Good morning", "Good afternoon", or "Good evening".
 * - createGreeting(firstName, lastName, timeOfDay): should use the other two functions and return the final greeting.
 */

function formatName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

function getGreeting(timeOfDay) {
    if (timeOfDay === "morning") {
        return "Good morning"
    }
    if (timeOfDay === "afternoon") {
        return "Good afternoon";
    }
    return "Good evening";
}

function createGreeting(firstName, lastName, timeOfDay) {
    const greeting = getGreeting(timeOfDay);
    const name = formatName(firstName, lastName);
    return `${greeting}, ${name}`;
}

console.log(createGreeting("John", "Doe", "morning")); // Output: Good morning, John Doe
console.log(createGreeting("Jane", "Smith", "afternoon")); // Output: Good afternoon, Jane Smith
console.log(createGreeting("Alice", "Johnson", "evening")); // Output: Good evening, Alice Johnson