import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./UpdateAlbumForm.css";

function UpdateAlbumForm() {
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);

  const [titles, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch albums");
        }

        const json = await response.json();
        setAlbums(json);
      } catch (error) {
        console.error("Error fetching albums:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titles === "") {
      alert("Please type a title");
    }
    try {
      fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          title: titles,
          userId: albums[id].userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="updateForm" onSubmit={handleSubmit}>
        <input
          defaultValue={albums[id]?.title || ""}
          onChange={(titles) => setTitle(titles.target.value)}
        ></input>
        <button> Submit</button>
      </form>
    </>
  );
}
export default UpdateAlbumForm;
