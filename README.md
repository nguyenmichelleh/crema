# Crema
React-Firebase web app featuring shared calendar and map resources to connect individuals with preexisting cafe plans.  Crema is aimed at facilitating offline social interaction.  Studies show that individuals with "social health" exhibit greater mental and physical wellbeing.

## Features

#### Shared calendar
- Create, read, update, or delete events (CremaRun)
- CremaRuns cannot be modified by users other than event creator/host

#### User profile
- Create, read, update, or delete personal profile
- View details of events in which the user is the host
- View details of events user would like to attend

#### Google Places & Maps APIs
- Support finding cafe locations
- Places autocomplete suggests locations, populates physical address
- Map for visualization of location area

## Dependencies
    - firebase
    - fullcalendar
    - react-google-maps
    - react-places-autocompletea
    - use-places-autocomplete
    - date-fns
    - reach combobox
    - react-router-dom
    - react-modal
    - react-bootstrap

## Environment

In addition to installing dependencies, two API keys must be obtained from the Google platform.  When creating a Firebase project, a Web API Key is generated.  This API key should be configured in an index.js file, or where the application is rendered.  A separate API key will be obtained from the Google Maps Platform. The Crema application communicates directly from a React front-end to a Firebase Realtime database.  The API key can be stored in a .env.local file, as long as the variable name begins with REACT_APP_.  Alternatively, restrictions can be managed from the Google Cloud Platform, under APIs & Services > Credentials.


