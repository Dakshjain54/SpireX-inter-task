# 💼 JobTrack - Personal Job Application Tracker

A clean, practical, and responsive personal **Job Application Tracker** web application built using standard modern web technologies. Designed specifically as a student/personal portfolio mini-project.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🎯 Features

* **➕ Add Job Application**: Simple form with validation for Company, Job Title, Applied Date, Status, Link, and Notes.
* **📋 Application Table & Cards**: Clean table view for desktop and responsive cards layout for mobile screens.
* **📊 Dynamic Statistics**: Auto-updating statistics counter cards (`Total`, `Applied`, `Interview`, `Selected`, `Rejected`).
* **🔍 Instant Search**: Real-time filtering by company name or job title while typing.
* **🎛️ Status Filter**: Filter applications by status (`Applied`, `Interview`, `Selected`, `Rejected`). Combined with search query.
* **✏️ Edit Application**: Update company, title, date, status, link, and notes.
* **🗑️ Delete Application**: Quick modal confirmation before permanently removing an application entry.
* **💾 Local Storage Persistence**: All data is automatically saved in `localStorage` in your browser.
* **🔔 User Toast Feedback**: Natural notifications for adding, updating, and deleting applications.

---

## 🎨 Tech Stack

* **HTML5**: Semantic tags (`<header>`, `<main>`, `<section>`, `<table>`, `<form>`).
* **CSS3**: Custom CSS variables, Flexbox & CSS Grid, custom badge styles, media queries for responsiveness. No frameworks used.
* **Vanilla JavaScript (ES6)**: Clean DOM manipulation, event handlers, Array filtering, objects, and LocalStorage API.

---

## 🚀 How to Run

1. Clone or download this project folder.
2. Open `index.html` directly in any web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.).
3. No build tools, Node.js, or server setup required!

---

## 📁 Project Structure

```text
job-application-tracker/
│
├── index.html       # Semantic HTML layout and modals
├── style.css        # Clean responsive styles and theme design
├── script.js        # Core logic, state management, LocalStorage, and DOM rendering
└── README.md        # Documentation
```

---

## 📝 Data Structure

Applications are stored in browser `localStorage` as JSON objects:

```javascript
{
    "id": 1723450000001,
    "company": "Google",
    "title": "Software Engineer Intern",
    "date": "2026-08-12",
    "status": "Interview",
    "link": "https://careers.google.com",
    "notes": "Technical interview scheduled for next week"
}
```
