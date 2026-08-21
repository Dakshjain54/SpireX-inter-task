const events = [
    {
        id: 1,
        title: "Web Development Workshop",
        category: "Workshop",
        date: "2026-09-15",
        time: "10:00 AM",
        location: "Delhi",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
        description: "Hands-on workshop covering HTML5, CSS3 layout techniques, and JavaScript DOM manipulation."
    },
    {
        id: 2,
        title: "AI & Machine Learning Seminar",
        category: "Technology",
        date: "2026-09-20",
        time: "02:00 PM",
        location: "Bengaluru",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
        description: "Overview of neural networks, AI applications, and current machine learning trends."
    },
    {
        id: 3,
        title: "Frontend Development Bootcamp",
        category: "Coding",
        date: "2026-09-28",
        time: "11:00 AM",
        location: "Mumbai",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        description: "Intensive single-day coding session focused on modern UI building and performance."
    },
    {
        id: 4,
        title: "Startup & Business Meetup",
        category: "Business",
        date: "2026-10-05",
        time: "05:00 PM",
        location: "Hyderabad",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
        description: "Connect with student founders, mentors, and learn early-stage startup strategies."
    },
    {
        id: 5,
        title: "UI/UX Design Workshop",
        category: "Design",
        date: "2026-10-12",
        time: "01:00 PM",
        location: "Pune",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
        description: "Learn visual hierarchy, wireframing tools, and user interaction design principles."
    },
    {
        id: 6,
        title: "Coding Hackathon 2026",
        category: "Hackathon",
        date: "2026-10-18",
        time: "09:00 AM",
        location: "Online",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
        description: "24-hour sprint to build creative web applications and win prizes."
    },
    {
        id: 7,
        title: "Cyber Security Conference",
        category: "Conference",
        date: "2026-10-25",
        time: "10:30 AM",
        location: "Gurugram",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        description: "Insights into network defense, ethical hacking techniques, and web security."
    },
    {
        id: 8,
        title: "Career & Placement Seminar",
        category: "Seminar",
        date: "2026-11-02",
        time: "03:00 PM",
        location: "Noida",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
        description: "Resume writing tips, mock interview practice, and campus placement guidance."
    }
];

let myRegistrations = JSON.parse(localStorage.getItem('evently_registrations')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderEvents(events);
    renderRegistrations();
    updateBadge();

    document.getElementById('search-input').addEventListener('input', filterEvents);
    document.getElementById('category-select').addEventListener('change', filterEvents);

    const toggle = document.getElementById('mobile-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.getElementById('nav-links').classList.toggle('active');
        });
    }
});

function renderEvents(list) {
    const grid = document.getElementById('events-grid');
    const noResults = document.getElementById('no-results');
    grid.innerHTML = '';

    if (list.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }
    noResults.classList.add('hidden');

    list.forEach(event => {
        const isAlreadyRegistered = myRegistrations.some(r => r.eventId === event.id);

        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="card-image">
                <img src="${event.image}" alt="${event.title}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';">
                <span class="badge-category">${event.category}</span>
            </div>
            <div class="card-body">
                <h3>${event.title}</h3>
                <div class="meta-row">
                    <span>📅 ${event.date}</span>
                    <span>🕐 ${event.time}</span>
                </div>
                <div class="meta-row">
                    <span>📍 ${event.location}</span>
                </div>
                <p>${event.description}</p>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="openDetailsModal(${event.id})">View Details</button>
                    ${isAlreadyRegistered ?
                `<button class="btn btn-disabled" disabled>Registered</button>` :
                `<button class="btn btn-primary" onclick="openRegistrationModal(${event.id})">Register</button>`
            }
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterEvents() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const category = document.getElementById('category-select').value;

    const filtered = events.filter(e => {
        const matchesQuery = e.title.toLowerCase().includes(query) ||
            e.category.toLowerCase().includes(query) ||
            e.location.toLowerCase().includes(query);
        const matchesCategory = category === 'All' || e.category === category;
        return matchesQuery && matchesCategory;
    });

    renderEvents(filtered);
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-select').value = 'All';
    renderEvents(events);
}

function openDetailsModal(id) {
    const event = events.find(e => e.id === id);
    if (!event) return;

    document.getElementById('modal-details-img').src = event.image;
    document.getElementById('modal-details-title').textContent = event.title;
    document.getElementById('modal-details-category').textContent = event.category;
    document.getElementById('modal-details-date').textContent = event.date;
    document.getElementById('modal-details-time').textContent = event.time;
    document.getElementById('modal-details-location').textContent = event.location;
    document.getElementById('modal-details-desc').textContent = event.description;

    const regBtn = document.getElementById('modal-details-reg-btn');
    const isAlreadyRegistered = myRegistrations.some(r => r.eventId === event.id);

    if (isAlreadyRegistered) {
        regBtn.textContent = 'Already Registered';
        regBtn.className = 'btn btn-disabled';
        regBtn.onclick = null;
    } else {
        regBtn.textContent = 'Register Now';
        regBtn.className = 'btn btn-primary';
        regBtn.onclick = () => {
            closeModal('details-modal');
            openRegistrationModal(event.id);
        };
    }

    openModal('details-modal');
}

function openRegistrationModal(id) {
    const event = events.find(e => e.id === id);
    if (!event) return;

    if (myRegistrations.some(r => r.eventId === id)) {
        alert('You are already registered for this event.');
        return;
    }

    document.getElementById('reg-event-id').value = event.id;
    document.getElementById('reg-event-title').textContent = event.title;
    document.getElementById('reg-form').reset();
    openModal('registration-modal');
}

document.getElementById('reg-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const eventId = parseInt(document.getElementById('reg-event-id').value);
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();

    if (!name || !email || !phone) {
        alert('Please fill all fields.');
        return;
    }

    if (myRegistrations.some(r => r.eventId === eventId)) {
        alert('You are already registered for this event.');
        closeModal('registration-modal');
        return;
    }

    const event = events.find(e => e.id === eventId);
    const newReg = {
        regId: Date.now(),
        eventId: eventId,
        eventTitle: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        name: name,
        email: email,
        phone: phone
    };

    myRegistrations.push(newReg);
    localStorage.setItem('evently_registrations', JSON.stringify(myRegistrations));

    closeModal('registration-modal');
    filterEvents();
    renderRegistrations();
    updateBadge();

    alert('Registration successful!');
});

function renderRegistrations() {
    const grid = document.getElementById('registrations-grid');
    const emptyState = document.getElementById('empty-registrations');
    grid.innerHTML = '';

    if (myRegistrations.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    myRegistrations.forEach(reg => {
        const item = document.createElement('div');
        item.className = 'reg-card';
        item.innerHTML = `
            <div class="reg-info">
                <h3>${reg.eventTitle}</h3>
                <p>📅 ${reg.date} • 🕐 ${reg.time} • 📍 ${reg.location}</p>
                <div class="reg-user-tag">👤 ${reg.name} (${reg.email})</div>
            </div>
            <button class="btn btn-danger-outline" onclick="cancelRegistration(${reg.regId})">Cancel Registration</button>
        `;
        grid.appendChild(item);
    });
}

function cancelRegistration(regId) {
    if (confirm('Cancel this registration?')) {
        myRegistrations = myRegistrations.filter(r => r.regId !== regId);
        localStorage.setItem('evently_registrations', JSON.stringify(myRegistrations));

        filterEvents();
        renderRegistrations();
        updateBadge();

        alert('Registration cancelled.');
    }
}

function updateBadge() {
    document.getElementById('nav-badge').textContent = myRegistrations.length;
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}
