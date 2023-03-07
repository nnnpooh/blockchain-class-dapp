import { create } from "zustand";
import { ethers } from "ethers";

interface NetworkType {
  id: number | null;
  name: string | null;
}

interface MetaMaskStoreType {
  account: string;
  setAccount: (acc: string) => void;
  balance: string;
  setBalance: (bal: string) => void;
  network: NetworkType;
  setNetwork: (net: NetworkType) => void;
  chainId: string;
  setChainId: (id: string) => void;
  isEthereumAvailable: boolean;
  setIsEthereumAvailable: (b: boolean) => void;
  provider: ethers.providers.Web3Provider | null;
  setProvider: (p: ethers.providers.Web3Provider) => void;
}

export const useMetaMaskStore = create<MetaMaskStoreType>((set) => ({
  account: "",
  setAccount: (acc) => set(() => ({ account: acc })),
  balance: "",
  setBalance: (bal) => set(() => ({ balance: bal })),
  network: {
    id: null,
    name: null,
  },
  setNetwork: (net) => set(() => ({ network: net })),
  chainId: "",
  setChainId: (id) => set(() => ({ chainId: id })),
  isEthereumAvailable: false,
  setIsEthereumAvailable: (b) => set(() => ({ isEthereumAvailable: b })),
  provider: null,
  setProvider: (p) => set(() => ({ provider: p })),
}));

interface WorkingStoreType {
  secret: string;
  setSecret: (msg: string) => void;
}

export const useWorkingStore = create<WorkingStoreType>((set) => ({
  secret: "",
  setSecret: (msg) => set(() => ({ secret: msg })),
}));
