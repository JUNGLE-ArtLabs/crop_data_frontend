import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const CropList = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    async function fetchCrops() {
      try {
        const response = await axios.get("organiccertificationbackend-production.up.railway.app/crops");
        setCrops(response.data);
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    }
    fetchCrops();
  }, []);

  return (
    <div>
      <h1>QRコード</h1>
      {crops.map((crop, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <QRCodeCanvas value={`https://localhost:3000/crop/${crop.ipfsHash}`} />
          <p>
            <a href={`https://localhost:3000/crop/${crop.ipfsHash}`} target="_blank" rel="noopener noreferrer">
              IPFS データを見る
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CropList;

// ターミナルで npm start でReactアプリを起動