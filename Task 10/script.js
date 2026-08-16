let applications = [];

const STORAGE_KEY = 'jobtrack_applications_data';

const sampleApplications = [
    {
        id: 1723450000001,
        company: "Google",
        title: "Software Engineer Intern",
        date: "2026-08-12",
        status: "Interview",
        link: "https://careers.google.com",
        notes: "Technical interview scheduled for next week"
    },
    {
        id: 1723450000002,
        company: "Microsoft",
        title: "Web Development Intern",
        date: "2026-08-10",
        status: "Applied",
        link: "https://careers.microsoft.com",
        notes: "Referred by senior alumnus"
    },
    {
        id: 1723450000003,
        company: "Amazon",
        title: "Frontend Engineer Intern",
        date: "2026-08-05",
        status: "Selected",
        link: "https://amazon.jobs",
        notes: "Offer letter received via email!"
    },
    {
        id: 1723450000004,
        company: "Netflix",
        title: "UI/UX Designer Intern",
        date: "2026-07-28",
        status: "Rejected",
        link: "",
        notes: "Position filled internally"
    }
];

const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelFormBtn = document.getElementById('cancelFormBtn');
const appModal = document.getElementById('appModal');
const modalTitle = document.getElementById('modalTitle');
const saveFormBtn = document.getElementById('saveFormBtn');

const applicationForm = document.getElementById('applicationForm');
const appIdInput = document.getElementById('appId');
const companyInput = document.getElementById('companyInput');
const titleInput = document.getElementById('titleInput');
const dateInput = document.getElementById('dateInput');
const statusInput = document.getElementById('statusInput');
const linkInput = document.getElementById('linkInput');
const notesInput = document.getElementById('notesInput');
const formErrorMessage = document.getElementById('formErrorMessage');

const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

const appTableBody = document.getElementById('appTableBody');
const emptyState = document.getElementById('emptyState');

const statTotal = document.getElementById('statTotal');
const statApplied = document.getElementById('statApplied');
const statInterview = document.getElementById('statInterview');
const statSelected = document.getElementById('statSelected');
const statRejected = document.getElementById('statRejected');

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    setupEventListeners();
    render();
});

function setupEventListeners() {
    openModalBtn.addEventListener('click', () => openFormModal());
    closeModalBtn.addEventListener('click', () => closeFormModal());
    cancelFormBtn.addEventListener('click', () => closeFormModal());

    applicationForm.addEventListener('submit', handleFormSubmit);

    searchInput.addEventListener('input', render);
    statusFilter.addEventListener('change', render);

    window.addEventListener('click', (e) => {
        if (e.target === appModal) closeFormModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeFormModal();
    });
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            applications = JSON.parse(savedData);
        } catch (e) {
            console.error("Failed to parse stored data", e);
            applications = [...sampleApplications];
        }
    } else {
        applications = [...sampleApplications];
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

function getFilteredApplications() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;

    return applications.filter(app => {
        const matchesSearch = app.company.toLowerCase().includes(query) ||
            app.title.toLowerCase().includes(query);
        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });
}

function render() {
    const filteredList = getFilteredApplications();
    displayApplications(filteredList);
    updateStats(filteredList);
}

function displayApplications(filteredList) {
    appTableBody.innerHTML = '';

    if (filteredList.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    const sortedList = [...filteredList].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedList.forEach(app => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <strong>${escapeHTML(app.company)}</strong>
                ${app.link ? `<a href="${escapeHTML(app.link)}" target="_blank" rel="noopener" class="link-icon">🔗</a>` : ''}
            </td>
            <td>${escapeHTML(app.title)}</td>
            <td>${formatDate(app.date)}</td>
            <td><span class="badge badge-${app.status.toLowerCase()}">${escapeHTML(app.status)}</span></td>
            <td class="notes-cell">${escapeHTML(app.notes || '-')}</td>
            <td class="actions-cell text-right">
                <button class="btn-action edit-btn" onclick="editApplication(${app.id})">Edit</button>
                <button class="btn-action delete-btn" onclick="deleteApplication(${app.id})">Delete</button>
            </td>
        `;
        appTableBody.appendChild(tr);
    });
}

function updateStats(filteredList) {
    statTotal.textContent = filteredList.length;
    statApplied.textContent = filteredList.filter(a => a.status === 'Applied').length;
    statInterview.textContent = filteredList.filter(a => a.status === 'Interview').length;
    statSelected.textContent = filteredList.filter(a => a.status === 'Selected').length;
    statRejected.textContent = filteredList.filter(a => a.status === 'Rejected').length;
}

function openFormModal(appToEdit = null) {
    formErrorMessage.style.display = 'none';

    if (appToEdit) {
        modalTitle.textContent = 'Edit Application';
        saveFormBtn.textContent = 'Update Application';

        appIdInput.value = appToEdit.id;
        companyInput.value = appToEdit.company;
        titleInput.value = appToEdit.title;
        dateInput.value = appToEdit.date;
        statusInput.value = appToEdit.status;
        linkInput.value = appToEdit.link || '';
        notesInput.value = appToEdit.notes || '';
    } else {
        modalTitle.textContent = 'Add Application';
        saveFormBtn.textContent = 'Save Application';

        applicationForm.reset();
        appIdInput.value = '';
        dateInput.value = new Date().toISOString().split('T')[0];
        statusInput.value = 'Applied';
    }

    appModal.style.display = 'flex';
    companyInput.focus();
}

function closeFormModal() {
    appModal.style.display = 'none';
    applicationForm.reset();
    formErrorMessage.style.display = 'none';
}

function handleFormSubmit(e) {
    e.preventDefault();

    const company = companyInput.value.trim();
    const title = titleInput.value.trim();
    const date = dateInput.value;
    const status = statusInput.value;
    const link = linkInput.value.trim();
    const notes = notesInput.value.trim();

    if (!company || !title || !date || !status) {
        formErrorMessage.style.display = 'block';
        return;
    }

    const editId = appIdInput.value;

    if (editId) {
        const index = applications.findIndex(a => a.id == editId);
        if (index !== -1) {
            applications[index] = { id: Number(editId), company, title, date, status, link, notes };
        }
    } else {
        const newApp = { id: Date.now(), company, title, date, status, link, notes };
        applications.push(newApp);
    }

    saveToLocalStorage();
    render();
    closeFormModal();
}

function editApplication(id) {
    const appToEdit = applications.find(a => a.id === id);
    if (appToEdit) {
        openFormModal(appToEdit);
    }
}

function deleteApplication(id) {
    const appToDelete = applications.find(a => a.id === id);
    if (appToDelete && confirm(`Are you sure you want to delete the application for "${appToDelete.company}"?`)) {
        applications = applications.filter(a => a.id !== id);
        saveToLocalStorage();
        render();
    }
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const dateObj = new Date(dateString + 'T00:00:00');
    return dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


