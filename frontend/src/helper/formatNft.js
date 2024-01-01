import { ethers } from "ethers";

export const strucuredNft = (nft) => ({
  id: Number(nft.id),
  owner: nft.owner.toLowerCase(),
  cost: ethers.utils.formatEther(nft.cost.toString()),
  title: nft.title,
  description: nft.description,
  metadataURI: nft.metadataURI,
  timestamp: ethers.utils.formatEther(nft.timestamp.toString()),
  sale: nft.sale,
});
