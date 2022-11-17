import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";

interface SerachCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SerachCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  //json形式
  const result = await res.json();
  // console.log(result[0]);
  return result[0];
};

export default function Home({ initialCatImageUrl }: IndexPageProps) {
  //ImageUrlは毎回ランダムで変わるので状態変数を保持
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  //Loading
  const [isLoading, setIsLoading] = useState(false);
  //The catImageAPI を非同期処理で
  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false);
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
      {isLoading ? (
        <Loader active />
      ) : (
        // <img src={catImageUrl} width={500} height="auto" />
        <Image src={catImageUrl} width={500} height={500} alt="cat" />
      )}

      <button style={{ marginTop: 18 }} onClick={handleClick}>
        CatButton
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
