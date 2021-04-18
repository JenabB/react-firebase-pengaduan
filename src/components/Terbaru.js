import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const Terbaru = () => {
  const [pengaduan, setPengaduan] = useState([]);

  useEffect(() => {
    db.collection("pengaduan")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());

        setPengaduan(data);
      });
  });

  return (
    <div>
      <h1 className="bg-green-400 text-white p-2 rounded">Terbaru</h1>
      <div className=" shadow m-2">
        {pengaduan?.map((item, index) => (
          <div className=" shadow m-2 p-5" key={index}>
            <img src={item.image} alt="gambar" />
            <h1 className="text-xl">{item.title}</h1>
            <h2 className="text-gray-600">{item.sender}</h2>
            <h3 className="text-gray-600">{item.created}</h3>
            <h3>{item.likes}</h3>
            <br />
            <p className="truncate">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terbaru;
