export function noteDTO(note) {
  return {
    id: note._id.toString(),
    title: note.title,
    content: note.content,
    createdAt: note.createdAt,
  };
}

export function notesDTO(notes) {
  return notes.map(noteDTO);
}
