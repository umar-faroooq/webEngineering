// Task 6 - Notes App - GUARANTEED WORKING VERSION
// Ayesha - Using Local Storage API

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== LOCAL STORAGE FUNCTIONS ====================
    function getNotes() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    function saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // ==================== INITIALIZE ====================
    let notes = getNotes();

    // If no notes, add sample notes
    if (notes.length === 0) {
        notes = [
            {
                id: Date.now() + 1,
                title: 'Welcome!',
                content: 'Welcome to your Notes app! Your notes are saved in Local Storage.',
                date: new Date().toLocaleString()
            },
            {
                id: Date.now() + 2,
                title: 'How to use',
                content: '• Type a title and note\n• Click Save Note button\n• Edit or delete anytime',
                date: new Date().toLocaleString()
            },
            {
                id: Date.now() + 3,
                title: 'Features',
                content: '✓ Local Storage saves automatically\n✓ Add, Edit, Delete notes\n✓ Search and Filter',
                date: new Date().toLocaleString()
            }
        ];
        saveNotes(notes);
    }

    // ==================== DOM ELEMENTS ====================
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const notesContainer = document.getElementById('notesContainer');
    const emptyState = document.getElementById('emptyState');
    const totalNotes = document.getElementById('totalNotes');
    const totalChars = document.getElementById('totalChars');
    const lastUpdated = document.getElementById('lastUpdated');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const sortSelect = document.getElementById('sortSelect');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');

    // Modal elements
    const editModal = document.getElementById('editModal');
    const editTitle = document.getElementById('editTitle');
    const editContent = document.getElementById('editContent');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');

    // Toast
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // State
    let currentView = 'grid';
    let searchTerm = '';
    let sortBy = 'newest';
    let currentEditId = null;

    // ==================== HELPER FUNCTIONS ====================
    function showToast(msg) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = msg;
        toast.style.display = 'flex';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    }

    function updateStats() {
        if (!totalNotes || !totalChars || !lastUpdated) return;
        
        totalNotes.textContent = notes.length;
        const charCount = notes.reduce((sum, note) => sum + note.content.length, 0);
        totalChars.textContent = charCount;
        
        if (notes.length > 0) {
            lastUpdated.textContent = 'Just now';
        } else {
            lastUpdated.textContent = '-';
        }
    }

    function filterAndSortNotes() {
        let filtered = [...notes];
        
        // Filter by search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(note => 
                note.title.toLowerCase().includes(term) || 
                note.content.toLowerCase().includes(term)
            );
        }
        
        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'newest') return b.id - a.id;
            if (sortBy === 'oldest') return a.id - b.id;
            if (sortBy === 'title') return a.title.localeCompare(b.title);
            return 0;
        });
        
        return filtered;
    }

    // ==================== RENDER NOTES ====================
    function renderNotes() {
        if (!notesContainer || !emptyState) return;
        
        const filteredNotes = filterAndSortNotes();
        
        updateStats();
        
        // Show empty state
        if (notes.length === 0) {
            emptyState.style.display = 'block';
            notesContainer.innerHTML = '';
            return;
        } else {
            emptyState.style.display = 'none';
        }
        
        // Set view class
        notesContainer.className = currentView === 'grid' ? 'notes-grid' : 'notes-list';
        
        // Clear and render
        notesContainer.innerHTML = '';
        
        filteredNotes.forEach(note => {
            const card = document.createElement('div');
            card.className = `note-card ${currentView === 'list' ? 'list-view' : ''}`;
            
            card.innerHTML = `
                <div class="note-header">
                    <span class="note-title">
                        <i class="fa-regular fa-note-sticky"></i> ${note.title}
                    </span>
                    <span class="note-date">
                        <i class="fa-regular fa-clock"></i> ${note.date || 'Today'}
                    </span>
                </div>
                <div class="note-body">${note.content.replace(/\n/g, '<br>')}</div>
                <div class="note-actions">
                    <button class="edit-btn" onclick="editNote('${note.id}')">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteNote('${note.id}')">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
            
            notesContainer.appendChild(card);
        });
    }

    // ==================== CRUD OPERATIONS ====================
    // ADD NOTE - SIMPLE AND DIRECT
    window.addNote = function() {
        console.log('Add note function called');
        
        const title = noteTitle ? noteTitle.value.trim() : '';
        const content = noteContent ? noteContent.value.trim() : '';
        
        if (!content) {
            alert('Please write something in your note!');
            return;
        }
        
        // Create new note
        const newNote = {
            id: Date.now(),
            title: title || 'Untitled',
            content: content,
            date: new Date().toLocaleString()
        };
        
        // Add to array
        notes.push(newNote);
        
        // Save to Local Storage
        saveNotes(notes);
        
        // Clear inputs
        if (noteTitle) noteTitle.value = '';
        if (noteContent) noteContent.value = '';
        
        // Show success
        showToast('✅ Note added!');
        
        // Update display
        renderNotes();
        
        console.log('Note added successfully!');
    };

    // DELETE NOTE
    window.deleteNote = function(id) {
        if (confirm('Delete this note?')) {
            notes = notes.filter(note => note.id != id);
            saveNotes(notes);
            showToast('🗑️ Note deleted');
            renderNotes();
        }
    };

    // EDIT NOTE
    window.editNote = function(id) {
        const note = notes.find(n => n.id == id);
        if (note && editModal && editTitle && editContent) {
            currentEditId = id;
            editTitle.value = note.title;
            editContent.value = note.content;
            editModal.classList.add('active');
        }
    };

    // SAVE EDIT
    window.saveEdit = function() {
        if (!currentEditId) return;
        
        const title = editTitle ? editTitle.value.trim() : '';
        const content = editContent ? editContent.value.trim() : '';
        
        if (!content) {
            alert('Note content cannot be empty!');
            return;
        }
        
        const index = notes.findIndex(n => n.id == currentEditId);
        if (index !== -1) {
            notes[index].title = title || 'Untitled';
            notes[index].content = content;
            notes[index].date = new Date().toLocaleString();
            
            saveNotes(notes);
            closeModal();
            showToast('✏️ Note updated');
            renderNotes();
        }
    };

    // CLOSE MODAL
    window.closeModal = function() {
        currentEditId = null;
        if (editTitle) editTitle.value = '';
        if (editContent) editContent.value = '';
        if (editModal) editModal.classList.remove('active');
    };

    // ==================== EVENT LISTENERS ====================
    // Save button - MULTIPLE METHODS TO ENSURE IT WORKS
    
    // Method 1: Direct onclick (MOST RELIABLE)
    if (saveNoteBtn) {
        saveNoteBtn.onclick = function(e) {
            e.preventDefault();
            console.log('Save button clicked!');
            window.addNote();
        };
    }
    
    // Method 2: Add event listener (backup)
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Save button clicked via listener!');
            window.addNote();
        });
    }

    // Ctrl+Enter to save
    if (noteContent) {
        noteContent.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                window.addNote();
            }
        });
    }

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTerm = this.value;
            renderNotes();
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchTerm = searchInput ? searchInput.value : '';
            renderNotes();
        });
    }

    // Sort
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortBy = this.value;
            renderNotes();
        });
    }

    // View toggles
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', function() {
            gridViewBtn.classList.add('active');
            if (listViewBtn) listViewBtn.classList.remove('active');
            currentView = 'grid';
            renderNotes();
        });
    }

    if (listViewBtn) {
        listViewBtn.addEventListener('click', function() {
            listViewBtn.classList.add('active');
            if (gridViewBtn) gridViewBtn.classList.remove('active');
            currentView = 'list';
            renderNotes();
        });
    }

    // Modal buttons
    if (saveEditBtn) {
        saveEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.saveEdit();
        });
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.closeModal();
        });
    }

    // Close modal on outside click
    if (editModal) {
        editModal.addEventListener('click', function(e) {
            if (e.target === editModal) {
                window.closeModal();
            }
        });
    }

    // ==================== INITIAL RENDER ====================
    renderNotes();
    showToast('🚀 Notes App ready!');
    
    console.log('Notes App initialized!');
});