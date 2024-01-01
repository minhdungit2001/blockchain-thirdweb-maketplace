import React, { useContext, createContext, useState } from "react";
import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { sendFileToIPFS } from "./helper/uploadPinata";
import { strucuredNft } from "./helper/formatNft";

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xf85579F288F9c631a652a5E45D1AA6a68896114F"
  );
  const address = useAddress();
  const connect = useMetamask();
  const [loading, setLoading] = useState({ show: false, msg: "" });
  const [alert, _setAlert] = useState({ show: false, msg: "", color: "" });
  const [modal, setModal] = useState("scale-0");
  const [updateModal, setUpdateModal] = useState("scale-0");
  const [showModal, setShowModal] = useState("scale-0");
  const [nft, setNft] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [myNfts, setMyNfts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isMyNfts, setIsMyNfts] = useState(false);

  const reportError = (error) => {
    setAlert(JSON.stringify(error), "red");
    console.log(error);
  };
  const setAlert = (msg, color = "green") => {
    setLoading(false);
    _setAlert({ show: true, msg, color });
    setTimeout(() => {
      _setAlert({ show: false, msg: "", color });
    }, 2000);
  };

  const setGlobalState = (state, payload) => {
    switch (state) {
      case "loading":
        return setLoading(payload);
      case "modal":
        return setModal(payload);
      case "updateModal":
        return setUpdateModal(payload);
      case "showModal":
        return setShowModal(payload);
      case "nft":
        return setNft(payload);
      case "alert":
        return _setAlert(payload);
      case "nfts":
        return setNfts(payload);
      case "myNfts":
        return setMyNfts(payload);
      case "transactions":
        return setTransactions(payload);
      case "isMyNfts":
        return setIsMyNfts(payload);
      default:
        return null;
    }
  };

  const mintNFT = async ({ title, description, fileUrl, price }) => {
    try {
      if (!contract && !address) {
        setAlert("Please connect Metamask before creating!", "red");
        return;
      }
      setLoading(() => ({
        show: true,
        msg: "Uploading IPFS data...",
      }));
      const metadataURI = await sendFileToIPFS(fileUrl);
      setLoading(() => ({
        show: true,
        msg: "Intializing transaction...",
      }));
      const resp = await contract.call(
        "payToMint",
        [title, description, metadataURI, ethers.utils.parseEther(price)],
        { from: address, value: ethers.utils.parseEther("0.01") }
      );
      console.log(resp);
      setAlert("Minting completed...", "green");
      await getAllNFTs();
    } catch (error) {
      reportError(error);
    }
  };

  const getAllNFTs = async () => {
    try {
      if (!contract) return;

      const [respNfts, respTransactions] = await Promise.all([
        contract.call("getAllNFTs"),
        contract.call("getAllTransactions"),
      ]);

      const nftsFormat = respNfts.map((nft) => strucuredNft(nft));
      const transactionsFromat = respTransactions.map((transaction) =>
        strucuredNft(transaction)
      );
      const saleNfts = nftsFormat.filter((nft) => nft.sale);
      const myOwnerNfts = nftsFormat.filter(
        (nft) => nft.owner?.toLowerCase() === address?.toLowerCase()
      );

      setNfts(() => saleNfts);
      setMyNfts(() => myOwnerNfts);
      setTransactions(() => transactionsFromat);
    } catch (error) {
      reportError(error);
    }
  };

  const buyNFT = async ({ id, cost }) => {
    try {
      if (!contract && !address) {
        setAlert("Please connect Metamask before buying!", "red");
        return;
      }

      setShowModal(() => "scale-0");
      setLoading(() => ({
        show: true,
        msg: "Initializing NFT transfer...",
      }));

      const resp = await contract.call("payToBuy", [Number(id)], {
        from: address,
        value: ethers.utils.parseEther(cost.toString()),
      });
      console.log(resp);

      setAlert("Purchase...", "green");
      await getAllNFTs();
    } catch (error) {
      reportError(error);
    }
  };

  const updateNFT = async ({ id, cost }) => {
    try {
      if (!contract && !address) {
        setAlert("Please connect Metamask before updating!", "red");
        return;
      }

      setModal("scale-0");
      setLoading(() => ({
        show: true,
        msg: "Price updating...",
      }));

      const resp = await contract.call("changePrice", [
        Number(id),
        ethers.utils.parseUnits(cost.toString(), 18),
      ]);
      console.log(resp);

      setAlert("Price updated...", "green");
      await getAllNFTs();
    } catch (error) {
      reportError(error);
    }
  };

  const updateSaleNFT = async ({ id, sale }) => {
    try {
      if (!contract && !address) {
        setAlert("Please connect Metamask before sale!", "red");
        return;
      }
      setShowModal("scale-0");
      setLoading(() => ({
        show: true,
        msg: "Initializing NFT transfer...",
      }));

      const resp = await contract.call("toggleStatusSale", [Number(id), !sale]);
      console.log(resp);

      setAlert("Update sale...", "green");
      await getAllNFTs();
    } catch (error) {
      reportError(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        contract,
        setGlobalState,
        setAlert,

        mintNFT,
        getAllNFTs,
        buyNFT,
        updateNFT,
        updateSaleNFT,

        loading,
        alert,
        modal,
        updateModal,
        showModal,
        nft,
        nfts,
        myNfts,
        transactions,
        isMyNfts,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
