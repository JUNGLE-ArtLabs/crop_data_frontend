import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CropDetail = () => {
  const { ipfsHash } = useParams();
  const [cropData, setCropData] = useState(null);

  useEffect(() => {
    async function fetchCropData() {
      try {
        const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
        setCropData(response.data);
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    }
    fetchCropData();
  }, [ipfsHash]);

  if (!cropData) {
    return <p>データを読み込み中...</p>;
  }

  return (
    <div>
      <h1>{cropData.crop}</h1>
      <p>品種: {cropData.varieties}</p>
      <p>生産者: {cropData.producer}</p>
      <p>栽培方法: {cropData.farming_method}</p>
      <p>播種日: {cropData.sowing_date}</p>
      <p>収穫日: {cropData.harvest_date}</p>
      <p>生産地: {cropData.location}</p>
      {cropData.image && (
        <img
            src={cropData.image}
            style={{ width: "300px", borderRadius: "10px", marginTop: "10px"}}
        />
      )}
    </div>
  );
};

export default CropDetail;
