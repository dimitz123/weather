#Requirements:
- Node.js
- npm

#Instructions:
- Clone or download the repository.
- Run npm install in the project's root directory to install dependancies
- Run npm start to start a local instance of the app in development mode

#Approach:

Libraries used:
 - ReactJS (UI Framework)
 - Create-react-app (Project bootstrapping)
 - Redux (State management)
 - Redux-Starter-Kit (reduce redux boilerplate)
 - ESLint[Air-BnB config] (code quality helper)
 - jest, enzyme (automated testing)

While the specified task needs very limited state information, and could be completed without using Redux, I approached the problem as a smaller piece of a larger fully featured web application where a central state store would be necessary, and this approach informs the choice of libraries, as well as the project structure.

#Assumptions:

Requirements:
 - The small interface shown is part of a larger web application, and should be composed from re-usable components

Behaviour:
 - Location permissions must be requested from the user, in the absence of a suitable location a default location can be used
 - If the weather API is unavailable an error message is shown instead of the UI, since default weather data doesn't make much sense as it will most likely be incorrect or outdated.
 - There are 16 wind directions (N, NNE, NE ... etc)
 - Icons should be provided by the OpenWeather API, though these don't match the icon on the reference UI.
 
Responsive Layout:
 - The form components stretch to fill the entire horizontal space allocated to the form.
 - The form itself stretches to fill all available horizontal space at all times.
 - The widget size is FIXED for all screen widths.
 - When the screen can no longer accomodate the form and widget side by side, the widget is rendered beneath the form.
