import { useState } from 'react';

const CreatePostForm = ({ userId }) => {
    const [postType, setPostType] = useState('standard');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
    const [tags, setTags] = useState('');
    const [eventInfo, setEventInfo] = useState({
        title: '',
        startDate: '',
        venue: '',
        eventType: 'concierto'
    });
    const [songInfo, setSongInfo] = useState({
        title: '',
        genre: '',
        instruments: '',
        isOriginal: true,
        originalArtist: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            user_id: userId,
            postType,
            content,
            media,
            tags: tags.split(',').map(tag => tag.trim())
        };

        if (postType === 'event') {
            postData.eventInfo = eventInfo;
        } else if (postType === 'song') {
            postData.songInfo = songInfo;
        }

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                console.log('Post creado con éxito');
                setTitle('');
                setContent('');
                setMedia([]);
                setTags('');
                setEventInfo({ title: '', startDate: '', venue: '', eventType: 'concierto' });
                setSongInfo({ title: '', genre: '', instruments: '', isOriginal: true, originalArtist: '' });
            } else {
                console.error('Error al crear el post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
            <div>
                <label htmlFor="postType" className="block text-gray-700">Tipo de Publicación</label>
                <select
                    id="postType"
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="mt-2 block w-full p-2 border border-gray-300 rounded"
                >
                    <option value="standard">Publicación estándar</option>
                    <option value="song">Canción</option>
                    <option value="event">Evento</option>
                </select>
            </div>

            <div>
                <label htmlFor="title" className="block text-gray-700">Título</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 block w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-gray-700">Contenido</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-2 block w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    required
                />
            </div>

            <div>
                <label htmlFor="tags" className="block text-gray-700">Etiquetas</label>
                <input
                    id="tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="mt-2 block w-full p-2 border border-gray-300 rounded"
                    placeholder="Ej: Música, Concierto, etc."
                />
            </div>

            {postType === 'song' && (
                <>
                    <div>
                        <label htmlFor="songTitle" className="block text-gray-700">Título de la canción</label>
                        <input
                            id="songTitle"
                            type="text"
                            value={songInfo.title}
                            onChange={(e) => setSongInfo({ ...songInfo, title: e.target.value })}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="genre" className="block text-gray-700">Género</label>
                        <input
                            id="genre"
                            type="text"
                            value={songInfo.genre}
                            onChange={(e) => setSongInfo({ ...songInfo, genre: e.target.value })}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="instruments" className="block text-gray-700">Instrumentos</label>
                        <input
                            id="instruments"
                            type="text"
                            value={songInfo.instruments}
                            onChange={(e) => setSongInfo({ ...songInfo, instruments: e.target.value })}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="isOriginal" className="block text-gray-700">¿Es una canción original?</label>
                        <input
                            id="isOriginal"
                            type="checkbox"
                            checked={songInfo.isOriginal}
                            onChange={() => setSongInfo({ ...songInfo, isOriginal: !songInfo.isOriginal })}
                            className="mt-2"
                        />
                    </div>
                </>
            )}

            {postType === 'event' && (
                <>
                    <div>
                        <label htmlFor="eventTitle" className="block text-gray-700">Título del evento</label>
                        <input
                            id="eventTitle"
                            type="text"
                            value={eventInfo.title}
                            onChange={(e) => setEventInfo({ ...eventInfo, title: e.target.value })}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-gray-700">Fecha de inicio</label>
                        <input
                            id="startDate"
                            type="datetime-local"
                            value={eventInfo.startDate}
                            onChange={(e) => setEventInfo({ ...eventInfo, startDate: e.target.value })}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="venue" className="block text-gray-700">Lugar del evento</label>
                        <input
                            id="venue"
                            type="text"
                            value={eventInfo.venue}
                            onChange={(e) => setEventInfo({ ...eventInfo, venue: e.target.value })}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="eventType" className="block text-gray-700">Tipo de evento</label>
                        <select
                            id="eventType"
                            value={eventInfo.eventType}
                            onChange={(e) => setEventInfo({ ...eventInfo, eventType: e.target.value })}
                            className="mt-2 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="concierto">Concierto</option>
                            <option value="jam_session">Jam Session</option>
                            <option value="taller">Taller</option>
                            <option value="festival">Festival</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </>
            )}

            <div className="flex justify-end">
                <button type="submit" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Crear Publicación
                </button>
            </div>
        </form>
    );
};

export default CreatePostForm;
