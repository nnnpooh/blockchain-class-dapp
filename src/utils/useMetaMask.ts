import { ethers } from "ethers";
import { useEffect } from "react";
import { useMetaMaskStore } from "@src/utils/stores";
export function useMetaMask() {
  const [
    account,
    setBalance,
    setNetwork,
    isEthereumAvailable,
    chainId,
    provider,
  ] = useMetaMaskStore((state) => [
    state.account,
    state.setBalance,
    state.setNetwork,
    state.isEthereumAvailable,
    state.chainId,
    state.provider,
  ]);

  useEffect(() => {
    async function getInfo() {
      //   Check
      if (!account || !ethers.utils.isAddress(account)) return;
      if (!isEthereumAvailable || !provider) return;

      const balanceRaw = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balanceRaw));

      const nw = await provider.getNetwork();
      setNetwork({ id: nw.chainId, name: nw.name });
    }

    getInfo();
  }, [account, chainId]);
}
