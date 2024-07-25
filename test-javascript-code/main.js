export let notes = [];

        // Function to add a new note
        export function addNote() {
            const title = document.getElementById('noteTitleInput').value.trim();
            const content = document.getElementById('noteContentInput').value.trim();
            const tags = document.getElementById('noteTagsInput').value.trim().split(',').map(tag => tag.trim()).filter(tag => tag);
            
            if (title && content) {
                const note = {
                    id: Date.now(),
                    title: title,
                    content: content,
                    tags: tags,
                    date: new Date()
                };
                notes.push(note);
                renderNotes();
                updateTagsFilter();
            }
        }

        // Function to edit an existing note
        export function editNote(noteId, newTitle, newContent, newTags) {
            const note = notes.find(note => note.id === noteId);
            if (note) {
                note.title = newTitle;
                note.content = newContent;
                note.tags = newTags.split(',').map(tag => tag.trim()).filter(tag => tag);
                renderNotes();
                updateTagsFilter();
            }
        }

        // Function to delete a note
        export function deleteNote(noteId) {
            notes = notes.filter(note => note.id !== noteId);
            renderNotes();
        }

        // Function to search notes by title
        export function searchNotes(query) {
            renderNotes(notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase())));
        }

        // Function to sort notes by title or date
        export function sortNotes(by) {
            notes.sort((a, b) => {
                if (by === 'title') {
                    // rorame davserchav am metods gamoiyeneba imistvis rom shevadarot sxva titlestan
                    return a.title.localeCompare(b.title);
                } else if (by === 'date') {
                    return new Date(b.date) - new Date(a.date);
                }
            });
            renderNotes();
        }

        // Function to render notes based on filter
        export function renderNotes(filteredNotes = notes) {
            const noteList = document.getElementById('noteList');
            noteList.innerHTML = '';

            filteredNotes.forEach(note => {
                const noteItem = document.createElement('li');
                noteItem.className = 'note';
                noteItem.innerHTML = `
                    <div>
                        <div class="note-title">${note.title}</div>
                        <div class="note-content">${note.content}</div>
                        <div class="note-tags">${note.tags.join(', ')}</div>
                    </div>
                    <div>
                        <button onclick="editNotePrompt(${note.id})">Edit</button>
                        <button onclick="deleteNotePrompt(${note.id})">Delete</button>
                    </div>
                `;
                noteList.appendChild(noteItem);
            });
        }

        // Function to update tags filter buttons
        export function updateTagsFilter() {
            const filterTags = document.getElementById('filterTags');
            filterTags.innerHTML = '';

            const uniqueTags = [...new Set(notes.flatMap(note => note.tags))];
            uniqueTags.forEach(tag => {
                const button = document.createElement('button');
                button.textContent = tag;
                button.onclick = () => renderNotes(notes.filter(note => note.tags.includes(tag)));
                filterTags.appendChild(button);
            });
        }

        // Prompt functions for editing and deleting notes
        export function editNotePrompt(noteId) {
            const note = notes.find(note => note.id === noteId);
            if (note) {
                const newTitle = prompt('Edit title:', note.title);
                const newContent = prompt('Edit content:', note.content);
                const newTags = prompt('Edit tags (comma separated):', note.tags.join(', '));
                if (newTitle !== null && newContent !== null && newTags !== null) {
                    editNote(noteId, newTitle, newContent, newTags);
                }
            }
        }

        export function deleteNotePrompt(noteId) {
            if (confirm('Are you sure you want to delete this note?')) {
                deleteNote(noteId);
            }
        }

        // Event listeners
        document.getElementById('addNoteButton').addEventListener('click', addNote);
        document.getElementById('searchButton').addEventListener('click', () => {
            const query = document.getElementById('searchInput').value.trim();
            searchNotes(query);
        });
        document.getElementById('sortTitleButton').addEventListener('click', () => sortNotes('title'));
        document.getElementById('sortDateButton').addEventListener('click', () => sortNotes('date'));

        // Initial rendering
        renderNotes();
        updateTagsFilter();