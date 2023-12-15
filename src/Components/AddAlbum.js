import { useEffect, useState } from "react";
import "./AddAlbum.css";

function AddAlbum() {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  // const id = albums.length !== 0 ? albums[albums.length - 1].id + 1 : "";
  // const userId =
  //   albums.length !== 0 ? albums[albums.length - 1].userId + 1 : "";

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => setAlbums(json));
  }, []);

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const lastAlbum = albums[albums.length - 1];
      const newId = lastAlbum ? lastAlbum.id + 1 : 1;
      const newUserId = lastAlbum ? lastAlbum.userId + 1 : 1;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums`,
        {
          method: "POST",
          body: JSON.stringify({
            id: newId,
            title: newAlbumTitle,
            userId: newUserId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        const updatedAlbums = await response.json();
        console.log(updatedAlbums);
        setAlbums([...albums, updatedAlbums]);
        setNewAlbumTitle("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="addAlbumForm" onSubmit={handleAddFormSubmit}>
        <label>ID</label>
        <input
          type="number"
          value={albums.length !== 0 ? albums[albums.length - 1].id + 1 : 1}
          readOnly
        />
        <label>Title</label>
        <input
          type="text"
          defaultValue={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          required
        />
        <label>USERId</label>
        <input
          type="number"
          value={albums.length !== 0 ? albums[albums.length - 1].userId + 1 : 1}
          readOnly
        />
        <button>Submit</button>
      </form>
    </>
  );
}

export default AddAlbum;
