# Crema
React-Firebase web application featuring shared calendar and map resources aimed at connecting individuals with preexisting cafe plans.  Crema seeks to facilitate offline social interaction.  Studies have shown that individuals with "social health" exhibit greater mental and physical wellbeing.

![Screen Shot 2021-11-07 at 3 52 33 PM](https://user-images.githubusercontent.com/47237380/140666902-058da6b7-4a88-442c-a66c-a9e6d9ba1981.png)
![Screen Shot 2021-11-07 at 1 03 29 PM](https://user-images.githubusercontent.com/47237380/140666940-a6c0ccdb-a109-4683-8b55-670e951c8124.png)
![Screen Shot 2021-11-07 at 1 04 05 PM](https://user-images.githubusercontent.com/47237380/140666965-5e00bffd-ec92-48f0-85d4-5f6e920dc7ba.png)
![Screen Shot 2021-11-07 at 1 04 22 PM](https://user-images.githubusercontent.com/47237380/140666985-e7c38e77-d19e-4326-9d73-6bc625581988.png)
## Features

#### Shared calendar
- Create, read, update, or delete events (CremaRun)
- CremaRuns cannot be modified by users other than the event creator/host

#### User profile
- Create, read, update, or delete personal profile
- View details of events user is hosting
- View details of events user is interested in attending

#### Google Places & Maps APIs
- Support finding cafe locations
- Places autocomplete suggests locations, populates physical address
- Map for visualization of location area

## Dependencies
    - firebase
    - fullcalendar
    - react-google-maps
    - react-places-autocomplete
    - use-places-autocomplete
    - date-fns
    - reach combobox
    - react-router-dom
    - react-modal
    - react-bootstrap

## Environment

In addition to installing dependencies, two API keys must be obtained from the Google platform.  When creating a Firebase project, a Web API Key is generated.  This API key should be configured in an index.js file, or in the module in which the application is rendered.  A separate API key will be obtained from the Google Maps Platform. The Crema application communicates directly from a React front-end to a Firebase Realtime database.  The API key can be stored in a .env.local file, as long as the variable name begins with REACT_APP_.  Alternatively, restrictions can be managed from the Google Cloud Platform, under APIs & Services > Credentials.
