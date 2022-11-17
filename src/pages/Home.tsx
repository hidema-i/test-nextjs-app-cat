import { useState } from "react";
import { fetchCatImage } from "./index";

export default function Home({ initialCatImageUrl }) {
  //ImageUrlは毎回ランダムで変わるので状態変数を保持
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  //The catImageAPI を非同期処理で
  const handleClick = async () => {
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>CatImagesAPP</h1>
      <img src={catImageUrl} width={500} height="auto" />
      <button style={{ marginTop: 18 }} onClick={handleClick}>
        CatButton
      </button>
    </div>
  );
}
