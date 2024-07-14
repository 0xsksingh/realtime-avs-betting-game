import React from "react";
import ReactDOM from "react-dom/client";

//wallet import
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

//routes import
import App from "./App";

//style import
import "@rainbow-me/rainbowkit/styles.css";
import "./styles/site.css";


const holesky = {
  id: 17000,
  name: 'Holesky',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://ethereum-holesky-rpc.publicnode.com'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
}

//wagmi
const { chains, provider } = configureChains(
  [holesky],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Betting on the wheels of fortune",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider coolMode theme={midnightTheme()} chains={chains}>
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
);
