import React from "react";
import Auth from "./Auth";
import Pengaduan from "./Pengaduan";
import PengaduanButton from "./PengaduanButton";
import Populer from "./Populer";
import Terbaru from "./Terbaru";

const Layout = () => {
  return (
    <div>
      <PengaduanButton />
      <Pengaduan />
      <div className="flex justify-between">
        <div className="w-2/5 m-2">
          <Terbaru />
        </div>
        <div className="w-2/5 m-2">
          <Populer />
        </div>
        <div className="w-1/5 m-2">
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default Layout;
