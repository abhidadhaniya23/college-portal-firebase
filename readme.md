# College portal

Welcome to the project!

This project is a web application that consists of three main views: Admin, Teachers, and Students. Each view has different functionalities and roles within the application.

## Table of Contents

- [Features](#features)
- [Local Environment Setup](#local-environment-setup)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Folder Structure](#folder-structure)
- [Contact](#contact)

## Features

### Admin View

- Create and delete subjects
- Assign teachers to subjects

### Teacher View

- Upload materials to assigned subjects
- Delete materials
- View and manage assigned subjects

### Student View

- Access and view uploaded materials
- Open materials in a new tab for further reading

## Local Environment Setup

Before following below steps, make sure you've installed node.js in your system. Download and install from here. [Download Node.js](https://nodejs.org/en/download)

To run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd project-directory
```

3. Install the dependencies:

```bash
npm install
```

4. Set up Firebase configuration:
   - Create a Firebase project on the Firebase console.
   - Obtain your Firebase project's configuration object.
   - Replace the Firebase configuration object in the `firebase/config.js` file with your own configuration.
5. Start the development server:

```bash
npm run dev
```

6. Open the application in your browser:
   - Open application at mentioned port in your terminal.

## Usage

Once you have the application up and running, you can access the different views based on the roles assigned to the user.

- Admin: Access the admin view by logging in with admin credentials. From here, you can create subjects, assign teachers, and manage user accounts.
- Teachers: Log in with teacher credentials to access the teacher view. Upload and delete materials for assigned subjects.
- Students: Log in with student credentials to access the student view. View the uploaded materials and open them in a new tab for further reading.

Please note that different user roles have different access levels and permissions within the application.

Here's the credentials for admin view that we've set.

- email: admin@portal.com
- password: admin@portal.com

## Dependencies

The project uses the following major dependencies:

- React: A JavaScript library for building user interfaces.
- Firebase: A cloud-based platform for building web and mobile applications.
- React Router: A library for routing in React applications.
- Material-UI: A popular React UI framework for building responsive and attractive user interfaces.
- React Query: A library for managing and caching data fetching in React applications.

For a complete list of dependencies, please refer to the `package.json` file.

## Folder Structure

The project follows a modular folder structure for better organization:

- `src`: Main source code directory.
  - `components`: Reusable components used throughout the application.
  - `hooks`: Custom hooks used for specific functionalities.
  - `pages`: Page components for different views.
  - `firebase`: Firebase configuration and initialization code.
  - `utils`: Utility functions and helper modules.
  - `App.js`: The main component that renders the application.
  - `index.js`: The entry point of the application.

## Contact

If you have any questions or need further assistance with the project, please feel free to contact us:

- Name: Abhi Dadhaniya
- Email: abhidadhaniya23@gmail.com
- Website: https://www.abhidadhaniya.com
