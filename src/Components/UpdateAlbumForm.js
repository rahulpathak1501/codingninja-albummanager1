import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        //console.log(json[id].title);
      } catch (error) {
        console.error("Error fetching albums:", error.message);
      }
    };
    fetchData();
    //console.log(albums[1].title);
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onUpdate(albumId, title);
  // };

  return (
    <>
      <form>
        <input
          value={albums[id].title}
          onChange={(titles) => setTitle(titles.target.value)}
        ></input>
        <button> Submit</button>
      </form>
    </>
  );
}
export default UpdateAlbumForm;
