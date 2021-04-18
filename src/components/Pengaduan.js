import React, { useState } from "react";
import moment from "moment";
import { db, storage } from "../firebase";

const Pengaduan = () => {
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const [pengaduan, setPengaduan] = useState({
    description: "",
    sender: "",
    title: "",
  });

  console.log("file", imageAsFile);
  console.log("url", imageAsUrl);

  const { description, sender, title } = pengaduan;

  const handleChange = (e) => {
    setPengaduan({ ...pengaduan, [e.target.name]: e.target.value });

    setImageAsFile(e.target.files && e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPengaduan({ ...pengaduan });

    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }

    const uploadTask = storage
      .ref(imageAsFile && `/images/${imageAsFile.name}`)
      .put(imageAsFile);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );

    db.collection("pengaduan").add({
      created: moment().format("MMMM Do YYYY, h:mm:ss a"),
      approved: false,
      description: description,
      image: imageAsUrl.imgUrl,
      likes: 0,
      sender: sender,
      title: title,
    });
    setPengaduan({ description: "", sender: "", title: "" });
    setImageAsFile("");
  };

  return (
    <div>
      <h1>Firestore</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          placeholder="image"
          onChange={handleChange}
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
