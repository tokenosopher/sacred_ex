import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 80001, 31337]
});

const walletconnect = new WalletConnectConnector({
    rpcUrl: `https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true
});

const walletlink = new WalletLinkConnector({
    url: `https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    appName: "SacredEX"
});

export const connectors = {
    injected: injected,
    walletConnect: walletconnect,
    coinbaseWallet: walletlink
};