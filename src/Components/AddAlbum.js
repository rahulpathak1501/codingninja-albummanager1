import { useEffect, useState } from "react";

function AddAlbum() {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const id = albums.length !== 0 ? albums[albums.length - 1].id + 1 : "";
  const userId =
    albums.length !== 0 ? albums[albums.length - 1].userId + 1 : "";

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => setAlbums(json));
  }, []);

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch(`https://jsonplaceholder.typicode.com/albums`, {
        method: "POST",
        body: JSON.stringify({
          id: id,
          title: newAlbumTitle,
          userId: userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleAddFormSubmit}>
        {}
        <label>ID</label>
        <input
          type="number"
          value={albums.length !== 0 ? albums[albums.length - 1].id + 1 : ""}
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
          value={
            albums.length !== 0 ? albums[albums.length - 1].userId + 1 : ""
          }
          readOnly
        />
        <button>Submit</button>
      </form>
    </>
  );
}

export default AddAlbum;
