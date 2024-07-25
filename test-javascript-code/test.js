import { notes, addNote, deleteNote, editNote, searchNotes, sortNotes } from "./main.js";

describe('Advanced Note-Taking Application TEST', ()=> {
    const titleInp = document.getElementById('noteTitleInput')
    const contentInp = document.getElementById('noteContentInput')
    const tagsInp = document.getElementById('noteTagsInput')
    const noteList = document.getElementById('noteList');

    beforeEach(()=> {
        noteList.childNodes.forEach((El)=> {
            El.remove()
        })

        while (notes.length > 0) {
            notes.pop();
        }

        titleInp.value = 'First Note'
        contentInp.value = "Note Content"
        tagsInp.value = '#erti, #ori, #sami'
          
    })

    describe('add notes', ()=> {
        it('should add new notes and render page correctly', ()=> {
            // test if function adds notes with all truthy values

            addNote()

            titleInp.value = ''
            contentInp.value = ''
            tagsInp.value = '#erti'

            addNote()

            expect(notes.length).toBe(1)
            expect(noteList.children.length).toBe(1)
        })
    })

    describe('update notes', ()=> {
        it('should update notes and render page correctly', ()=> {
            addNote()

            let note1 = notes[0]

            editNote(note1.id, note1.title, 'New Content', '#erti, #ori, #sami')

            expect(note1.content).toBe('New Content')
        })
    })

    describe('delete note', ()=> {
        it('should delete note', ()=> {
            addNote()
    
            deleteNote(notes[0].id)
    
            expect(notes.length).toBe(0)
        })
    })

    describe('search notes', ()=> {
        it('should search notes', ()=> {
            addNote()

            titleInp.value = 'Second Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#erti2, #ori2, #sami2'

            addNote()

            searchNotes('First Note')

            expect(noteList.childNodes.length).toBe(1)
        })
    })

    describe('sort notes', ()=> {
        it('sort with titles', ()=> {

            titleInp.value = 'Bbecond Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#erti2, #ori2, #sami2'

            addNote()

            titleInp.value = 'Ccecond Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#erti2, #ori2, #sami2'

            addNote()

            titleInp.value = 'Aaecond Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#erti2, #ori2, #sami2'

            addNote()

            sortNotes('title')

            expect(notes[0].title).toBe('Aaecond Note')
        })

        it('sort with dates', ()=> {

            titleInp.value = 'Bbecond Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#erti2, #ori2, #sami2'

            addNote()

            titleInp.value = 'Ccecond Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#erti2, #ori2, #sami2'

            addNote()

            titleInp.value = 'Aaecond Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#erti2, #ori2, #sami2'

            addNote()

            notes[0].date = '2024-07-25T08:00:00Z'
            notes[1].date = '2024-08-25T08:00:00Z'

            sortNotes('date')

            expect(notes[0].title).toBe('Ccecond Note')
        })
    })

    describe('sort with tags', ()=> {
        it('should sort with tags', ()=> {
            const filterTags = document.getElementById('filterTags');

            titleInp.value = 'Bbecond Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#erti2, #ori2, #sami2'

            addNote()

            titleInp.value = 'Ccecond Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#sami2'

            addNote()

            titleInp.value = 'Aaecond Note'
            contentInp.value = "Note Content2"
            tagsInp.value = '#erti2, #ori2, #sami2'

            addNote()

            const button = filterTags.children[1]

            button.click()

            expect(noteList.children[0].children[0].children[2].textContent).toContain('#erti2')
            expect(noteList.children[1].children[0].children[2].textContent).toContain('#erti2')
        })
    })
})