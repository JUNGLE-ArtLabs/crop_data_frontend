import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";


const CropList = () => {
  const [crops, setCrops] = useState([]);
  const qrRefs = useRef({});

  useEffect(() => {
    async function fetchCrops() {
      try {
        const response = await axios.get("https://organiccertificationbackend-production.up.railway.app/crops");
        setCrops(response.data);
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    }
    fetchCrops();
  }, []);

  // QRコード画像をダウンロード
  const downloadQRCode = (ipfsHash) => {
    const canvas = qrRefs.current[ipfsHash];
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode_${ipfsHash}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div>
      <h1>QRコード</h1>
      {crops.map((crop, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <QRCodeCanvas value={`https://organic-certification-frontend.vercel.app/crop/${crop.ipfsHash}`} />
          size={256}
          ref={(el) => (qrRefs.current[crop.ipfsHash] = el)}
          <p>
            <a href={`https://organic-certification-frontend.vercel.app//crop/${crop.ipfsHash}`} target="_blank" rel="noopener noreferrer">
              IPFS データを見る
            </a>
          </p>
          <button onClick={() => downloadQRCode(crop.ipfsHash)}>QRコードをダウンロード</button>
        </div>
      ))}
    </div>
  );
};

export default CropList;

// ターミナルで npm start でReactアプリを起動