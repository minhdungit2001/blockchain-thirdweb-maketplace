import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { StateContextProvider } from "./Blockchain.Services";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <ThirdwebProvider activeChain={Sepolia}>
    <BrowserRouter>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </BrowserRouter>
  </ThirdwebProvider>
);
