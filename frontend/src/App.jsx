import { useEffect, useState } from "react";
import { useStateContext } from "./Blockchain.Services";
import Hero from "./components/Hero";
import Alert from "./components/Alert";
import Artworks from "./components/Artworks";
import MyArkworks from "./components/MyArkworks";
import CreateNFT from "./components/CreateNFT";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import ShowNFT from "./components/ShowNFT";
import Transactions from "./components/Transactions";
import UpdateNFT from "./components/UpdateNFT";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

export default function App() {
  const address = useAddress();
  const connect = useMetamask();
  const { getAllNFTs, contract, isMyNfts } = useStateContext();

  useEffect(() => {
    if (address) connect();
    getAllNFTs();
  }, [contract]);
  return (
    <div className="min-h-screen app-timeless">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      {!isMyNfts ? <Artworks /> : <MyArkworks />}
      <Transactions />
      <CreateNFT />
      <ShowNFT />
      <UpdateNFT />
      <Footer />
      <Alert />
      <Loading />
    </div>
  );
}
