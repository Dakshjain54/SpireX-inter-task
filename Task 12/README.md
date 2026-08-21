# 📅 Event Registration System

A simple, attractive and responsive **Event Registration System** built
using **HTML5, CSS3, and Vanilla JavaScript**.

The application allows users to browse upcoming events, search and
filter events, view event details, register for events, and manage their
registrations easily.

## ✨ Features

-   📅 Browse upcoming events
-   🔍 Search events by title, category, or location
-   🎛️ Filter events by category
-   👁️ View complete event details
-   📝 Register for an event
-   ✅ Registration confirmation
-   📋 View registered events
-   ❌ Cancel registrations
-   🔢 Registration count
-   💾 LocalStorage support
-   🔔 Toast notifications
-   📱 Responsive design
-   ✨ Simple hover and modal animations

## 🎯 Project Flow

``` text
Browse Events
      ↓
Search / Filter
      ↓
View Event Details
      ↓
Register
      ↓
Registration Confirmation
      ↓
My Registrations
      ↓
Cancel Registration
```

## 📅 Event Categories

-   Workshop
-   Technology
-   Coding
-   Business
-   Design
-   Seminar
-   Hackathon
-   Conference

## 🔍 Search & Filter

Users can search events by:

-   Event title
-   Category
-   Location

A category dropdown is also available, and search and filtering work
together.

## 👁️ Event Details

The details modal displays:

-   Event image
-   Event title
-   Category
-   Date
-   Time
-   Location
-   Description
-   Register button

## 📝 Registration

Users can register by entering:

-   Full Name
-   Email
-   Phone Number

Basic validation is included. A user cannot register for the same event
twice.

## 📋 My Registrations

The **My Registrations** section displays registered events with their:

-   Event name
-   Date
-   Time
-   Location
-   Cancel Registration button

## ❌ Cancel Registration

Users can cancel an existing registration. The registration count, list
and LocalStorage data are updated automatically.

## 💾 LocalStorage

Browser **LocalStorage** is used to save registration data, so
registrations remain available after refreshing the page.

No backend or database is required.

## 🔔 Notifications

The project uses small toast messages for actions such as:

``` text
✓ Registration successful
✓ Registration cancelled
✓ Already registered
✓ Please fill all fields
```

## 📱 Responsive Design

The website works on:

-   💻 Desktop
-   💻 Laptop
-   📱 Tablet
-   📱 Mobile

## 🎨 Design

The interface uses:

-   Dark navy / charcoal background
-   White cards
-   Blue or purple accent color
-   Rounded corners
-   Soft shadows
-   Clean typography
-   Subtle animations

## 🛠️ Technologies Used

-   **HTML5** --- Website structure
-   **CSS3** --- Styling, responsive layout and animations
-   **Vanilla JavaScript** --- Event logic, filtering, registration and
    LocalStorage

No frameworks or external JavaScript libraries are used.

## 📂 Project Structure

``` text
event-registration-system/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

  File           Purpose
  -------------- ------------------------------------------------------
  `index.html`   Main structure of the website
  `style.css`    Styling, responsive design and animations
  `script.js`    Event data, search, filtering and registration logic
  `README.md`    Project documentation

## 🧠 JavaScript Functionality

The project uses simple functions such as:

``` javascript
displayEvents()
searchEvents()
filterEvents()
showEventDetails()
openRegistration()
registerEvent()
cancelRegistration()
updateRegistrationCount()
showToast()
loadRegistrations()
```

The application mainly uses arrays, objects, DOM manipulation, event
listeners, LocalStorage and array filtering.

## ▶️ How to Run

No installation or build process is required.

Simply open:

``` text
index.html
```

in any modern web browser.

You can also open the project in **Visual Studio Code** and use the
**Live Server** extension.

## 📚 What I Learned

This project helped me practice:

-   HTML semantic structure
-   Responsive CSS design
-   JavaScript DOM manipulation
-   Event handling
-   Search and filtering
-   Form validation
-   Modal creation
-   LocalStorage
-   Dynamic rendering
-   Basic UI/UX design

## 🎯 Project Objective

The objective of this project was to create a simple and functional
**Event Registration System** using frontend technologies.

The project demonstrates how HTML, CSS, and JavaScript can be combined
to create an interactive platform where users can **browse events,
search and filter them, view details, register, and manage their
registrations**.

## 👨‍💻 Author

**Daksh Jain**

B.Tech CSE --- AI/ML Student

## 📄 License

This project was created for **educational and learning purposes**.
