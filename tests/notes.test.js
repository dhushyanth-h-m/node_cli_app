import {jest} from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
    insertDB: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn(),
}));

const {insertDB, getDB, saveDB} = await import('../src/db.js');
const {newNote, getAllNotes, removeNote} = await import('../src/notes.js');

beforeEach(() => {
    insertDB.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
})

describe('cli notes', () => {

test('newNote inserts a note', async () => {
    const note = {
        content: "This note is for testing purposes",
        tags: ['test', 'unit-test'],
        id: 1,
    }

    insertDB.mockResolvedValue(note)

    const result = await newNote(note.content, note.tags)

    expect(result.content).toEqual(note.content) 
    expect(result.tags).toEqual(note.tags) 
})

test('getAllNotes gets all notes', async () => {
    const db = {
        notes: ['note1', 'note2', 'note3']
    };
    getDB.mockResolvedValue(db);

    const result = await getAllNotes();
    expect(result).toEqual(db.notes);
});

test('removeNote deletes a note', async () => {
    const notes = [
        {id: 1, content: 'note1'},
        {id: 2, content: 'note2'},
        {id: 3, content: 'note3'},
    ];

    saveDB.mockResolvedValue(notes);

    const idToRemove = 6;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
});
});