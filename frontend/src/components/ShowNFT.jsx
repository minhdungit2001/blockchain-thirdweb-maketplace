import Identicon from "react-identicons";
import { FaTimes } from "react-icons/fa";
import { useStateContext } from "../Blockchain.Services";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { truncate } from "../helper/truncate";

export default function ShowNFT() {
  const address = useAddress();
  const connect = useMetamask();
  const { showModal, nft, setGlobalState, buyNFT, updateSaleNFT } =
    useStateContext();

  const onChangePrice = () => {
    setGlobalState("showModal", "scale-0");
    setGlobalState("updateModal", "scale-100");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 ${showModal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-400">Buy NFT</p>
            <button
              type="button"
              onClick={() => setGlobalState("showModal", "scale-0")}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-40 w-40">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={nft?.metadataURI}
                alt={nft?.title}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start rounded-xl mt-5">
            <h4 className="text-white font-semibold">{nft?.title}</h4>
            <p className="text-gray-400 text-xs my-1">{nft?.description}</p>

            <div className="flex justify-between items-center mt-3 text-white">
              <div className="flex justify-start items-center">
                <Identicon
                  string={nft?.owner}
                  size={50}
                  className="h-10 w-10 object-contain rounded-full mr-3"
                />
                <div className="flex flex-col justify-center items-start">
                  <small className="text-white font-bold">@owner</small>
                  <small className="text-pink-800 font-semibold">
                    {nft?.owner ? truncate(nft.owner, 4, 4, 11) : "..."}
                  </small>
                </div>
              </div>

              <div className="flex flex-col">
                <small className="text-xs">Current Price</small>
                <p className="text-sm font-semibold max-w-24 break-words">
                  {nft?.cost} ETH
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-2">
            {address?.toLowerCase() == nft?.owner?.toLowerCase() ? (
              <>
                <button
                  className="flex flex-row justify-center items-center
                w-full text-[#e32970] text-md border-[#e32970]
                py-2 px-5 rounded-full bg-transparent 
                drop-shadow-xl border hover:bg-[#bd255f]
                hover:bg-transparent hover:text-white
                hover:border hover:border-[#bd255f]
                focus:outline-none focus:ring mt-5"
                  onClick={onChangePrice}
                >
                  Change Price
                </button>

                <button
                  className="flex flex-row justify-center items-center
                  w-full text-[#e32970] text-md border-[#e32970]
                  py-2 px-5 rounded-full bg-transparent 
                  drop-shadow-xl border hover:bg-[#bd255f]
                  hover:bg-transparent hover:text-white
                  hover:border hover:border-[#bd255f]
                  focus:outline-none focus:ring mt-5"
                  onClick={() => updateSaleNFT(nft)}
                >
                  {nft?.sale ? "Unsale" : "Sale"}
                </button>
              </>
            ) : (
              <button
                className="flex flex-row justify-center items-center
                w-full text-white text-md bg-[#e32970]
                hover:bg-[#bd255f] py-2 px-5 rounded-full
                drop-shadow-xl border border-transparent
                hover:bg-transparent hover:text-[#e32970]
                hover:border hover:border-[#bd255f]
                focus:outline-none focus:ring mt-5"
                onClick={() => buyNFT(nft)}
              >
                Purchase Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
