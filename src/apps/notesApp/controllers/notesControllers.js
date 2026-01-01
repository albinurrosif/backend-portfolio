import { notesDTO, noteDTO } from '../dto/noteDto.js';
import Note from '../models/Note.js';

// use noteDTO and notesDTO to format the responses
// noteDTO: single note
// notesDTO: array of notes

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notesDTO(notes));

    return;
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json('Internal Server Error');
    return;
  }
}

export async function getNotesById(req, res) {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    // validate if note exists
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(noteDTO(note));
  } catch (error) {
    console.error('Error fetching note by ID:', error);
    res.status(500).json('Internal Server Error');
    return;
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and Content are required' });
    }

    const MAX_TITLE_LENGTH = 80;
    const MAX_CONTENT_LENGTH = 5000;

    if (title.length > MAX_TITLE_LENGTH || content.length > MAX_CONTENT_LENGTH) {
      return res.status(400).json({ message: 'Title or Content exceeds maximum length' });
    }

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    res.status(201).json(noteDTO(savedNote));
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json('Internal Server Error');
    return;
  }
}

export async function updateNote(req, res) {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });

    // validate if note exists
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(noteDTO(updatedNote));
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json('Internal Server Error');
    return;
  }
}

export async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    // validate if note exists
    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json('Internal Server Error');
    return;
  }
}
