/**
 * French Residence Permit Tracker - Offline Mobile Version
 * Enhanced with profile selection, notes, and due dates.
 * Stores all data in localStorage.
 */

// State
let currentPermitType = null;
let documents = []; // This will hold the filtered list for the current view
let categories = {};
let profiles = {};
let selectedProfiles = ['common'];
let allDocuments = {}; // Holds definitions from config
let permitTypes = [];
let userSettings = {};
let documentStatus = {}; // { docId: { is_complete: bool, notes: str, due_date: str, completed_at: str } }
let currentEditingDocId = null;

// DOM Elements
const permitTypeSelect = document.getElementById('permitTypeSelect');
const permitDescription = document.getElementById('permitDescription');
const profileSection = document.getElementById('profileSection');
const profileList = document.getElementById('profileList');
const progressSection = document.getElementById('progressSection');
const progressBar = document.getElementById('progressBar');
const progressPercentage = document.getElementById('progressPercentage');
const progressStats = document.getElementById('progressStats');
const resetButton = document.getElementById('resetButton');
const documentsSection = document.getElementById('documentsSection');
const documentsList = document.getElementById('documentsList');
const linksSection = document.getElementById('linksSection');
const importantLinks = document.getElementById('importantLinks');
const lastVerified = document.getElementById('lastVerified');
const notesModal = document.getElementById('notesModal');
const notesInput = document.getElementById('notesInput');
const notesDocName = document.getElementById('notesDocName');
const dueDateInput = document.getElementById('dueDateInput');
const clearDueDateBtn = document.getElementById('clearDueDate');

// Initialize the application
function init() {
    try {
        console.log("Initializing Offline App...");

        // Load data from window.APP_CONFIG
        if (!window.APP_CONFIG) {
            throw new Error("Configuration not found!");
        }

        const config = window.APP_CONFIG;
        categories = config.categories;
        profiles = config.profiles;
        permitTypes = config.permit_types;
        allDocuments = config.documents;

        // Load persisted data
        loadPersistedData();

        // Render initial UI
        renderPermitTypes();
        renderImportantLinks(config.important_links);
        renderMetadata(config.metadata);

        // Set up event listeners
        setupEventListeners();

        // Check if we have a saved state to restore
        if (userSettings.selected_permit_type) {
            permitTypeSelect.value = userSettings.selected_permit_type;
            // Trigger change manually
            handlePermitTypeChange({ target: permitTypeSelect });
        }

    } catch (error) {
        console.error('Failed to initialize application:', error);
        showError('Failed to load application. Please refresh the page.');
    }
}

// Persistence Management
function loadPersistedData() {
    try {
        const storedSettings = localStorage.getItem('residence_user_settings');
        if (storedSettings) {
            userSettings = JSON.parse(storedSettings);
            selectedProfiles = userSettings.selected_profiles || ['common'];
        }

        const storedStatus = localStorage.getItem('residence_document_status');
        if (storedStatus) {
            documentStatus = JSON.parse(storedStatus);
        }
    } catch (e) {
        console.error("Error loading local storage", e);
        // Fallback to defaults
        selectedProfiles = ['common'];
        documentStatus = {};
    }
}

function savePersistedData() {
    try {
        localStorage.setItem('residence_user_settings', JSON.stringify({
            selected_profiles: selectedProfiles,
            selected_permit_type: currentPermitType
        }));

        localStorage.setItem('residence_document_status', JSON.stringify(documentStatus));
    } catch (e) {
        console.error("Error saving to local storage", e);
    }
}

// UI Renderers
function renderMetadata(metadata) {
    if (metadata && metadata.last_verified) {
        lastVerified.textContent = `Requirements last verified: ${metadata.last_verified}`;
        lastVerified.style.display = 'block';
    }
}

function renderImportantLinks(links) {
    if (links) {
        importantLinks.innerHTML = links.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener" class="link-item">
                <div class="link-title">
                    <span class="link-name-fr">${link.name_fr}</span>
                    <span class="link-name-en">${link.name_en}</span>
                </div>
                <p class="link-description">${link.description}</p>
            </a>
        `).join('');
    }
}

function renderPermitTypes() {
    permitTypes.forEach(permit => {
        const option = document.createElement('option');
        option.value = permit.id;
        option.textContent = `${permit.name_en} (${permit.name_fr})`;
        option.dataset.description = permit.description;
        option.dataset.url = permit.official_url;
        permitTypeSelect.appendChild(option);
    });
}

function renderProfiles() {
    const profileEntries = Object.entries(profiles).filter(([key]) => key !== 'common');

    profileList.innerHTML = profileEntries.map(([key, profile]) => {
        const isSelected = selectedProfiles.includes(key);
        return `
            <label class="profile-chip ${isSelected ? 'selected' : ''}" data-profile="${key}">
                <input type="checkbox" ${isSelected ? 'checked' : ''}>
                <span class="profile-icon">${profile.icon || '📋'}</span>
                <span class="profile-name">${profile.name_en}</span>
            </label>
        `;
    }).join('');

    document.querySelectorAll('.profile-chip').forEach(chip => {
        chip.addEventListener('click', handleProfileToggle);
    });
}

// Logic Handlers
async function handlePermitTypeChange(event) {
    const permitType = event.target.value;

    if (!permitType) {
        hideApplication();
        return;
    }

    currentPermitType = permitType;

    // Save selection
    userSettings.selected_permit_type = permitType;
    savePersistedData();

    // Show description
    const selectedOption = event.target.selectedOptions[0];
    const description = selectedOption.dataset.description;
    const url = selectedOption.dataset.url;

    permitDescription.innerHTML = `
        ${description}
        <br><br>
        <a href="${url}" target="_blank" rel="noopener">📖 View official requirements on service-public.fr</a>
    `;
    permitDescription.classList.remove('hidden');

    // Show and render profile selector
    renderProfiles();
    profileSection.classList.remove('hidden');

    // Load documents and show sections
    filterAndLoadDocuments();
    updateProgress();

    progressSection.classList.remove('hidden');
    documentsSection.classList.remove('hidden');
    linksSection.classList.remove('hidden');
}

function handleProfileToggle(event) {
    // Prevent double triggering if clicking input specifically
    if (event.target.tagName === 'INPUT') return;

    event.preventDefault(); // Handle manually

    const chip = event.currentTarget;
    const profileId = chip.dataset.profile;
    const checkbox = chip.querySelector('input[type="checkbox"]');

    // Toggle selection
    if (selectedProfiles.includes(profileId)) {
        selectedProfiles = selectedProfiles.filter(p => p !== profileId);
        chip.classList.remove('selected');
        checkbox.checked = false;
    } else {
        selectedProfiles.push(profileId);
        chip.classList.add('selected');
        checkbox.checked = true;
    }

    // Always include 'common'
    if (!selectedProfiles.includes('common')) {
        selectedProfiles.push('common');
    }

    savePersistedData();

    // Reload documents with new profile filter
    if (currentPermitType) {
        filterAndLoadDocuments();
        updateProgress();
    }
}

function filterAndLoadDocuments() {
    const rawDocs = allDocuments[currentPermitType] || [];

    // Filter by profile
    const profilesSet = new Set(selectedProfiles);

    documents = rawDocs.filter(doc => {
        const docProfiles = doc.profiles || ['common'];
        // Check intersection
        return docProfiles.some(p => profilesSet.has(p));
    }).map(doc => {
        // Enriched with status
        const status = documentStatus[doc.id] || { is_complete: false };
        return {
            ...doc,
            ...status
        };
    });

    // Sort (if needed, but config usually is ordered)
    // Render
    renderDocuments();
}

function renderDocuments() {
    // Group documents by category
    const grouped = {};
    documents.forEach(doc => {
        const cat = doc.category || 'other';
        if (!grouped[cat]) {
            grouped[cat] = [];
        }
        grouped[cat].push(doc);
    });

    const categoryOrder = ['identity', 'family', 'residence', 'financial', 'administrative', 'integration', 'payment'];

    documentsList.innerHTML = categoryOrder
        .filter(cat => grouped[cat])
        .map(cat => {
            const categoryInfo = categories[cat] || { name_en: cat, icon: '📄' };
            const docs = grouped[cat];
            const completedCount = docs.filter(d => d.is_complete).length;

            return `
                <div class="document-category">
                    <div class="category-header">
                        <span class="category-icon">${categoryInfo.icon}</span>
                        <span class="category-title">${categoryInfo.name_en}</span>
                        <span class="category-subtitle">${completedCount}/${docs.length}</span>
                    </div>
                    <div class="category-documents">
                        ${docs.map(doc => renderDocumentItem(doc)).join('')}
                    </div>
                </div>
            `;
        }).join('');

    // Add handlers
    document.querySelectorAll('.document-checkbox-area').forEach(item => {
        item.addEventListener('click', handleDocumentClick);
    });

    document.querySelectorAll('.notes-btn').forEach(btn => {
        btn.addEventListener('click', handleNotesClick);
    });

    document.querySelectorAll('.document-link').forEach(link => {
        link.addEventListener('click', (e) => e.stopPropagation());
    });
}

function renderDocumentItem(doc) {
    const completedClass = doc.is_complete ? 'completed' : '';
    const hasNotes = doc.notes && doc.notes.trim().length > 0;
    const hasDueDate = doc.due_date;
    const isOverdue = hasDueDate && new Date(doc.due_date) < new Date();
    const isDueSoon = hasDueDate && !isOverdue &&
        (new Date(doc.due_date) - new Date()) / (1000 * 60 * 60 * 24) <= 7;

    const dueDateClass = isOverdue ? 'overdue' : (isDueSoon ? 'due-soon' : '');

    const linkHtml = doc.link
        ? `<a href="${doc.link}" target="_blank" rel="noopener" class="document-link">
               <span class="document-link-icon">🔗</span>
               ${doc.link_text}
           </a>`
        : `<span class="document-link no-link">
               <span class="document-link-icon">ℹ️</span>
               ${doc.link_text}
           </span>`;

    const dueDateHtml = hasDueDate
        ? `<span class="due-date-badge ${dueDateClass}">📅 ${formatDate(doc.due_date)}</span>`
        : '';

    const validityHint = doc.validity_days
        ? `<span class="validity-hint">Valid for ${doc.validity_days} days</span>`
        : '';

    return `
        <div class="document-item ${completedClass}" data-id="${doc.id}">
            <div class="document-header">
                <div class="document-checkbox-area" data-id="${doc.id}">
                    <div class="document-checkbox"></div>
                </div>
                <div class="document-content">
                    <div class="document-title">
                        <span class="document-name-fr">${doc.name_fr}</span>
                        <span class="document-name-en">${doc.name_en}</span>
                    </div>
                    <p class="document-description">${doc.description}</p>
                    <div class="document-meta">
                        ${linkHtml}
                        ${validityHint}
                        ${dueDateHtml}
                    </div>
                    ${hasNotes ? `<div class="document-notes-preview">📝 ${truncate(doc.notes, 50)}</div>` : ''}
                </div>
                <button class="notes-btn ${hasNotes ? 'has-notes' : ''}" data-id="${doc.id}" title="Add notes">
                    📝
                </button>
            </div>
        </div>
    `;
}

function handleDocumentClick(event) {
    event.stopPropagation();
    const area = event.currentTarget;
    const docId = area.dataset.id;
    const item = area.closest('.document-item');

    // Toggle state logic
    if (!documentStatus[docId]) documentStatus[docId] = {};
    const newState = !documentStatus[docId].is_complete;

    documentStatus[docId].is_complete = newState;
    if (newState) {
        documentStatus[docId].completed_at = new Date().toISOString();
    } else {
        documentStatus[docId].completed_at = null;
    }

    savePersistedData();

    // Update UI locally without full reload for smoothness
    item.classList.toggle('completed');

    // Update backing array
    const doc = documents.find(d => d.id === docId);
    if (doc) doc.is_complete = newState;

    updateProgress();
    // Re-render header numbers? simpler to just re-render all for now to keep counts correct
    renderDocuments();
}

function handleNotesClick(event) {
    event.stopPropagation();
    const docId = event.currentTarget.dataset.id;
    const doc = documents.find(d => d.id === docId);

    if (!doc) return;

    currentEditingDocId = docId;
    notesDocName.textContent = `${doc.name_en} (${doc.name_fr})`;
    notesInput.value = doc.notes || '';
    dueDateInput.value = doc.due_date || '';

    notesModal.classList.remove('hidden');
    notesInput.focus();
}

function closeNotesModal() {
    notesModal.classList.add('hidden');
    currentEditingDocId = null;
}

function saveNotes() {
    if (!currentEditingDocId) return;

    const notes = notesInput.value.trim();
    const dueDate = dueDateInput.value || null;

    if (!documentStatus[currentEditingDocId]) documentStatus[currentEditingDocId] = {};
    documentStatus[currentEditingDocId].notes = notes;
    documentStatus[currentEditingDocId].due_date = dueDate;

    savePersistedData();

    // Update memory
    const doc = documents.find(d => d.id === currentEditingDocId);
    if (doc) {
        doc.notes = notes;
        doc.due_date = dueDate;
    }

    closeNotesModal();
    renderDocuments();
}

function updateProgress() {
    if (!documents.length) return;

    const total = documents.length;
    const completed = documents.filter(doc => doc.is_complete).length;
    let percentage = (total > 0) ? Math.round((completed / total) * 100) : 0;

    progressBar.style.width = `${percentage}%`;
    progressPercentage.textContent = `${percentage}%`;
    progressStats.textContent = `${completed} of ${total} documents completed`;

    if (percentage === 100) {
        progressPercentage.style.color = '#3fb950';
    } else if (percentage >= 50) {
        progressPercentage.style.color = '#58a6ff';
    } else {
        progressPercentage.style.color = '#d29922';
    }
}

function handleResetProgress() {
    if (!currentPermitType) return;
    const confirmed = confirm(
        'Are you sure you want to reset all progress? This will clear all checkmarks, notes, and due dates. This cannot be undone.'
    );
    if (!confirmed) return;

    // Filter current documents and clear their status
    documents.forEach(doc => {
        if (documentStatus[doc.id]) {
            documentStatus[doc.id] = {
                is_complete: false,
                notes: "",
                due_date: null,
                completed_at: null
            };
        }
    });

    savePersistedData();
    filterAndLoadDocuments();
    updateProgress();
}

function hideApplication() {
    currentPermitType = null;
    documents = [];
    permitDescription.classList.add('hidden');
    profileSection.classList.add('hidden');
    progressSection.classList.add('hidden');
    documentsSection.classList.add('hidden');
    linksSection.classList.add('hidden');
}

function setupEventListeners() {
    permitTypeSelect.addEventListener('change', handlePermitTypeChange);
    resetButton.addEventListener('click', handleResetProgress);
    clearDueDateBtn.addEventListener('click', () => {
        dueDateInput.value = '';
    });

    notesModal.addEventListener('click', (e) => {
        if (e.target === notesModal) {
            closeNotesModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !notesModal.classList.contains('hidden')) {
            closeNotesModal();
        }
    });
}

function showError(message) {
    alert(message);
}

function truncate(str, length) {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Data Management
function exportData() {
    const data = {
        settings: userSettings,
        status: documentStatus,
        timestamp: new Date().toISOString(),
        version: 1
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "residence_tracker_backup_" + new Date().toISOString().slice(0, 10) + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importData(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.settings && data.status) {
                userSettings = data.settings;
                documentStatus = data.status;
                selectedProfiles = userSettings.selected_profiles || ['common'];

                // Save to local storage
                savePersistedData();

                // Refresh UI
                if (userSettings.selected_permit_type) {
                    permitTypeSelect.value = userSettings.selected_permit_type;
                    handlePermitTypeChange({ target: permitTypeSelect });
                } else {
                    location.reload();
                }

                alert('Backup restored successfully!');
            } else {
                throw new Error('Invalid backup file format');
            }
        } catch (error) {
            console.error('Import failed:', error);
            alert('Failed to restore backup: ' + error.message);
        }
        // Reset input
        inputElement.value = '';
    };
    reader.readAsText(file);
}

// Global Exports
window.closeNotesModal = closeNotesModal;
window.saveNotes = saveNotes;
window.exportData = exportData;
window.importData = importData;

// Start
document.addEventListener('DOMContentLoaded', init);
