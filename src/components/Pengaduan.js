import React, { useState } from "react";
import moment from "moment";
import { db, storage } from "../firebase";

const Pengaduan = () => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  const [pengaduan, setPengaduan] = useState({
    description: "",
    sender: "",
    title: "",
  });

  console.log("file", file);
  console.log("url", url);
  console.log(pengaduan);
  const { description, sender, title } = pengaduan;

  const handleChange = (e) => {
    setPengaduan({ ...pengaduan, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    const uploadTask = storage.ref(file && `/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPengaduan({ ...pengaduan });

    db.collection("pengaduan").add({
      created: moment().format("MMMM Do YYYY, h:mm:ss a"),
      approved: false,
      description: description,
      image: url,
      likes: 0,
      sender: sender,
      title: title,
    });
    setPengaduan({ description: "", sender: "", title: "" });
  };

  return (
    <div>
      <h1>Firestore</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          placeholder="image"
          onChange={handleImageChange}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sender"
          placeholder="sender"
          value={sender}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Pengaduan;
