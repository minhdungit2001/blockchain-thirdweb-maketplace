import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useStateContext } from "../Blockchain.Services";

const UpdateNFT = () => {
  const { setGlobalState, updateNFT, updateModal, nft } = useStateContext();

  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price || price <= 0) return;
    await updateNFT({ ...nft, cost: price });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black bg-opacity-50 transform
      transition-transform duration-300 ${updateModal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-400">{nft?.title}</p>
            <button
              type="button"
              onClick={() => setGlobalState("updateModal", "scale-0")}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt={nft?.title}
                src={nft?.metadataURI}
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-sm
              text-slate-500 bg-transparent border-0
              focus:outline-none focus:ring-0 py-3 px-5"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (Eth)"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="flex flex-row justify-center items-center
            w-full text-white text-md bg-[#e32970]
            hover:bg-[#bd255f] py-2 px-5 rounded-full
            drop-shadow-xl border border-transparent
            hover:bg-transparent hover:text-[#e32970]
            hover:border hover:border-[#bd255f]
            focus:outline-none focus:ring mt-5 "
          >
            Update Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNFT;
