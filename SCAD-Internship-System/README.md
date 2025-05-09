# SCAD Internship System

A comprehensive web application for managing university internships, connecting students, companies, and administrators.

## Overview

The SCAD Internship System is a React-based platform that facilitates the internship process for universities. It provides tailored interfaces for different user types:

- **Students**: Browse internship listings, apply for positions, manage applications, and submit reports
- **PRO Students**: Additional access to exclusive workshops and enhanced profile features
- **Companies**: Post internship opportunities, review applications, and manage interns
- **SCAD Office**: Approve company registrations, oversee internship cycles, and generate reports
- **Faculty Members**: Review student reports and provide feedback

## Features

- **Authentication System**: Secure login with role-based access control
- **Dashboard**: Personalized dashboards for each user type
- **Internship Listings**: Browse, filter, and search for internships
- **Application Process**: Submit and track internship applications
- **Profile Management**: Update personal/company information and preferences
- **Reporting System**: Submit and review internship reports
- **Workshop Management**: For PRO students to register for skill-building workshops
- **Notification System**: Real-time alerts for important events

## Project Structure

```
internship-system/
│
├── public/               # Static files
│
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── Select.js
│   │   ├── Navbar.js
│   │   ├── NotificationCenter.js
│   │   └── ProtectedRoute.js
│   │
│   ├── context/          # React context providers
│   │   └── AuthContext.js
│   │
│   ├── pages/            # Main application pages
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── CompanyRegistration.js
│   │   ├── InternshipListings.js
│   │   ├── InternshipDetails.js
│   │   ├── StudentProfile.js
│   │   ├── CompanyDashboard.js
│   │   ├── ScadDashboard.js
│   │   ├── ReportDetails.js
│   │   └── Workshop.js
│   │
│   ├── styles/           # Global styles and theme
│   │   └── GlobalStyle.js
│   │
│   ├── App.js            # Application routes
│   └── index.js          # Application entry point
│
└── package.json          # Project dependencies
```

## Technology Stack

- **React**: Frontend library for building the user interface
- **React Router**: For navigation and routing
- **Styled Components**: For component-level styling
- **React Icons**: Icon library
- **Context API**: For state management

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/internship-system.git
   cd internship-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Login Credentials (Demo)

Use the following credentials to explore different user interfaces:

- **Student**:
  - Email: student@university.edu
  - Password: password123
  - User Type: Student

- **PRO Student**:
  - Email: prostudent@university.edu
  - Password: password123
  - User Type: PRO Student

- **Company**:
  - Email: company@example.com
  - Password: password123
  - User Type: Company

- **SCAD Office**:
  - Email: scad@university.edu
  - Password: password123
  - User Type: SCAD Office

- **Faculty**:
  - Email: faculty@university.edu
  - Password: password123
  - User Type: Faculty Member

## Future Enhancements

- Integration with backend API for real data
- Advanced analytics and reporting
- Mobile application
- Email notifications
- Resume builder tool
- Integration with university calendar for scheduling interviews

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
