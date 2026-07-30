# Greeting Builder

Solution for https://roadmap.sh/projects/js-greeting-builder

## Architecture Note:

This snippet demonstrates function composition, small, single-responsibility functions ('formatName,', 'getGreeting') combines inside an orchestrator functions (createGreeting).
This is the foundation of modular design: each function does one thing, and the top-level function coordinates them. Below is a breakdown of every core JS concept present.

1. **Function Declaration (a type of function)**

function formatName(firstName, lastName) { ... }

All three function here use the function declaration syntax ('function name () {}'), not function expression or arrow functions. Key traits:

- **Hoisted**: Function declaration are hoisted to the top of their scope with their full body, so you could technically call 'createGreeting()'
before its declaration in the file and it would still work (unlike 'const fn = () => {}', which is not hoisted the same way).
- **Named**, which makes stack traces easier to debug than anonymous functions.

**Contrast (for learning): The same code as a function expression would look like**:

- const formatName = function(firstname, lastName) {
    return `${firstName}, ${lastName}`;
}

**or as a arrow function**:

- const formatName = (firstName, lastName) => `${firstName}, ${lastName}`;

All three are valid, but interviewers/codebases care about why you pick one, *declarations* for hoisting-dependent code or top-level utilities, *arrow functions* for callbacks and avoid
'this'-binding issues (not relevant here since there's no 'this').

---

2. **Parameters vs Arguments**

- 'firstName', 'lastName', 'timeOfDay' in the function signatures are **parameters** (placeholders).
- 'John', 'Doe', 'morning' when calling 'createGreeting("John", "Doe", "morning") are **arguments**, actual values passed in.

This distinction matters when you start discussing default parameters, rest parameters, or argument validation.

---

3. **Scope**:

This code demonstrate two scope types:

a) **Function Scope**:
    Every variable declared inside a function ('const greeting', 'const name' in 'createGreeting') only exist within that function's execution context. They are not accessible outside it.
    This is JS's core scoping mechanism for 'var', and also applies to 'let'/'const' (which additionally respect block scope).

b) **Block Scope**:
    if (timeOfDay === "morning") {
        return "Good morning"
    }
    The 'if' block itself creates a block scope (relevant if you declared a 'let'/'const inside it, it wouldn't leak out). No variables are declared inside these blocks here, but it's worth
    understanding: 'var' would leak out of block, 
    'let'/'const' would not.

c) **No Global Scope Pollution**:
    Notice there are zero global variables, everything lives inside function scope. This is good practice, it avoids naming collisions in larger codebases.

---

4. **Control Flow — Guard Clauses (a specific if/else pattern)**

function getGreeting(timeOfDay) {
    if (timeOfDay === "morning") {
        return "Good morning"
    }
    if (timeOfDay === "afternoon) {
        return "Goodafternoon"
    }
    return "Good evening"
}

This isn't a plain 'if/else if/else' chain, it's using early returns (guard clauses). Each 'if' immediately exits the function once a condition is met, so there's no need for 'else'.
This is generally considered cleaner than nested 'if/else' because it reduces indentation and makes the "default" case ("Good evening") explicit as a fallback.

Equivalent traditional version (worth comparing mentally):

function getGreeting(timeOfDay) {
    if (timeOfDay === "morning") {
        return "Good morning";
    } else if (timeOfDay === "afternoon") {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

Functionally identical — guard clauses just avoid the else keyword entirely by relying on return to exit early.

---

5. **Template Literals**:

`${firstName} ${lastName}`
`${greeting}, ${name}`

Backtick strings with ${} interpolation — introduced in ES6. Preferred over string concatenation (firstName + " " + lastName) because it's more readable, especially as the number of interpolated values grows.

---

6. **Pure Functions**:

'formatName' and 'getGreeting' are both pure functions:

- Same input always produces the same output.
- No side effects (no mutation of external state, no console.log inside them, no API calls).

This matters architecturally: pure functions are trivially testable and predictable, you'll see this concept constantly in React (pure components, reducers in Redux/useReducer must be pure).

'createGreeting' is also pure — it only calls other pure functions and returns a derived value.

---

7. **Function Composition**:

function createGreeting(firstName, lastName, timeOfDay) {
    const greeting = getGreeting(timeOfDay);
    const name = formatName(firstName, lastName);
    return `${greeting}, ${name}`;
}

'createGreeting' doesn't do any real "work" itself, it delegates to 'getGreeting' and 'formatName' and combines their results. This is the Single Responsibility Principle in action:
each function has exactly one job, and a higher-level function orchestrates them. As you move into React, this is exactly the mental model for composing components,
or composing custom hooks out of smaller hooks.

---