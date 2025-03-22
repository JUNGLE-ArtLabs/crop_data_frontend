import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";


const CropList = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    async function fetchCrops() {
      try {
        const response = await axios.get("https://cropdatabackend-production.up.railway.app/crops"); //Railwayのsettingからpublic networkのgenerate domainのアドレスに/cropsを付け加えたもの
        
        console.log("APIから取得したデータ:", response.data); // 受け取ったデータをログに出力
        
        // データが配列かどうか確認
        if (Array.isArray(response.data)) {
          setCrops(response.data);
        } else {
          console.error("エラー: cropsデータが配列ではありません:", response.data);
        }
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    }
    fetchCrops();
  }, []);

  return (
    <div>
      <h1>QRコード</h1>
      {crops.length > 0 ? (
        crops.map((crop, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <QRCodeCanvas value={`https://crop-data.vercel.app/crop/${crop.ipfsHash}`} />
            <p>
              <a href={`https://crop-data.vercel.app/crop/${crop.ipfsHash}`} target="_blank" rel="noopener noreferrer">
                IPFS データを見る
              </a>
            </p>
          </div>
        ))
      ) : (
        <p>データがありません。</p>
      )}
    </div>
  );
};

export default CropList;

// ターミナルで npm start でReactアプリを起動