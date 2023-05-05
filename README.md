# How To Run
You can use the deployed link: https://online-tutoring-team-eleven.vercel.app/ to view our website. Should you want to run it locally, follow these steps:

- Clone this GitHub Repo into your work environment by using: `git clone https://github.com/Online-Tutoring-Application-Team-11/FE-tutoring-website.git`
- Navigate to the FE folder by `cd .\FE-tutoring-website\` and then `cd .\FE\`
- Run `npm install` to install all necessary modules
- Run `npm start` to start the website on your localhost

# FE-tutoring-website
The Frontend code for Online Tutoring Application Team 11.

```mermaid
sequenceDiagram
  participant React-FE
  participant Java-Spring-API
  participant AWS-SQL-DB
  participant Caching-Layer

  Java-Spring-API->>Caching-Layer: Replace cache every 10 minutes or bust cache if any update API call has been made

  React-FE->>Java-Spring-API: Send Request
  Java-Spring-API->>AWS-SQL-DB: Query Database
  AWS-SQL-DB-->>Java-Spring-API: Return Data
  Java-Spring-API-->>React-FE: Return Response

  React-FE->>Caching-Layer: Send Request to Get Tutor Info
  Caching-Layer-->>React-FE: Return Cached Data
```
