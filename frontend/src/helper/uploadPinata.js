import axios from "axios";

export const sendFileToIPFS = async (fileImg) => {
  if (fileImg) {
    try {
      const formData = new FormData();
      formData.append("file", fileImg);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `619344ca2dd28310dfbe`,
          pinata_secret_api_key: `1814464a1edcf0a59e3e693e99461c015e3f0a5ee4d38b8931c5a2fe4cd90042`,
          "Content-Type": "multipart/form-data",
        },
      });

      const ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
      console.log(ImgHash);

      return ImgHash;
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  }
};
