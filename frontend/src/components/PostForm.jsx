import { useState } from "react";
import { usePostStore } from "../store/postStore";

const PostForm = ({ onPostCreated }) => {
  const { createPost, error, isLoading } = usePostStore();
  const [postType, setPostType] = useState("standard");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  // Song-specific fields
  const [songInfo, setSongInfo] = useState({
    title: "",
    genre: "",
    isOriginal: true,
    originalArtist: "",
    duration: "",
  });

  // Event-specific fields
  const [eventInfo, setEventInfo] = useState({
    title: "",
    startDate: "",
    endDate: "",
    venue: { name: "", address: "", city: "" },
    isVirtual: false,
    meetLink: "",
    eventType: "concierto",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = {
      postType,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      ...(postType === "song" && { songInfo }),
      ...(postType === "event" && { eventInfo }),
    };

    try {
      const newPost = await createPost(data);
      setMessage("¡Publicación creada con éxito!");
      onPostCreated(newPost);
      setContent("");
      setTags("");
      setSongInfo({
        title: "",
        genre: "",
        isOriginal: true,
        originalArtist: "",
        duration: "",
      });
      setEventInfo({
        title: "",
        startDate: "",
        endDate: "",
        venue: { name: "", address: "", city: "" },
        isVirtual: false,
        meetLink: "",
        eventType: "concierto",
      });
    } catch {
      setMessage("Error al crear la publicación. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg w-full"
    >
      <h2 className="text-xl font-bold text-rose-400 mb-4">Crear Publicación</h2>

      {/* Post Type Selector */}
      <div className="mb-4">
        <label htmlFor="postType" className="block text-gray-300 mb-2">
          Tipo de Publicación
        </label>
        <select
          id="postType"
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg p-2"
        >
          <option value="standard">Estándar</option>
          <option value="song">Canción</option>
          <option value="event">Evento</option>
        </select>
      </div>

      {/* Common Fields */}
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-300 mb-2">Contenido</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg p-2"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-300 mb-2">Etiquetas (separadas por comas)</label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg p-2"
        />
      </div>

      {/* Song-Specific Fields */}
      {postType === "song" && (
        <>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Título de la Canción</label>
            <input
              type="text"
              value={songInfo.title}
              onChange={(e) => setSongInfo({ ...songInfo, title: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Género</label>
            <input
              type="text"
              value={songInfo.genre}
              onChange={(e) => setSongInfo({ ...songInfo, genre: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">¿Es original?</label>
            <input
              type="checkbox"
              checked={songInfo.isOriginal}
              onChange={(e) => setSongInfo({ ...songInfo, isOriginal: e.target.checked })}
            />
          </div>
          {!songInfo.isOriginal && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Artista Original</label>
              <input
                type="text"
                value={songInfo.originalArtist}
                onChange={(e) => setSongInfo({ ...songInfo, originalArtist: e.target.value })}
                className="w-full bg-gray-700 text-white rounded-lg p-2"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Duración</label>
            <input
              type="number"
              value={songInfo.duration}
              onChange={(e) => setSongInfo({ ...songInfo, duration: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg p-2"
            />
          </div>
        </>
      )}

      {/* Event-Specific Fields */}
      {postType === "event" && (
        <>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Título del Evento</label>
            <input
              type="text"
              value={eventInfo.title}
              onChange={(e) => setEventInfo({ ...eventInfo, title: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Fecha de Inicio</label>
            <input
              type="date"
              value={eventInfo.startDate}
              onChange={(e) => setEventInfo({ ...eventInfo, startDate: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Lugar</label>
            <input
              type="text"
              placeholder="Nombre del lugar"
              value={eventInfo.venue.name}
              onChange={(e) => setEventInfo({ ...eventInfo, venue: { ...eventInfo.venue, name: e.target.value } })}
              className="w-full bg-gray-700 text-white rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Tipo de Evento</label>
            <select
              value={eventInfo.eventType}
              onChange={(e) => setEventInfo({ ...eventInfo, eventType: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg p-2"
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-rose-600 hover:to-red-700"
      >
        {isLoading ? "Enviando..." : "Crear Publicación"}
      </button>
      {message && <p className="text-center mt-2 text-fuchsia-500">{message}</p>}
      {error && <p className="text-center mt-2 text-red-500">{error}</p>}
    </form>
  );
};

export default PostForm;
