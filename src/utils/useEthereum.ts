import { ethers } from "ethers";
import { useEffect } from "react";
import { useMetaMaskStore } from "./stores";
export function useEthereum() {
  const [
    setAccount,
    isEthereumAvailable,
    setIsEthereumAvailable,
    setChainId,
    setProvider,
  ] = useMetaMaskStore((state) => [
    state.setAccount,
    state.isEthereumAvailable,
    state.setIsEthereumAvailable,
    state.setChainId,
    state.setProvider,
  ]);

  // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
  useEffect(() => {
    if (typeof window !== "undefined" && "ethereum" in window) {
      setIsEthereumAvailable(true);
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      setProvider(provider);
    }
  }, []);

  // Setup listener
  useEffect(() => {
    if (!window.ethereum || !isEthereumAvailable) return;
    const accountWasChanged = (accounts: any) => {
      setAccount(accounts[0]);
      console.log("accountWasChanged");
    };
    const metaMaskConnect = () => {
      console.log("metaMaskConnected");
    };
    const metaMaskChainChanged = (id: any) => {
      setChainId(id);
      //  Need to create new provider every time network changes.
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      setProvider(provider);
    };
    const clearAccount = () => {
      setAccount("");
      console.log("clearAccount");
    };

    window.ethereum.on("accountsChanged", accountWasChanged);
    window.ethereum.on("connect", metaMaskConnect);
    window.ethereum.on("chainChanged", metaMaskChainChanged);
    window.ethereum.on("disconnect", clearAccount);
    window.ethereum.request({ method: "eth_requestAccounts" }).then(
      (accounts: any) => {
        // When the browser is refreshed, you need to set the account from this action.
        console.log("accounts", accounts);
        if (accounts && Array.isArray(accounts)) setAccount(accounts[0] || "");
      },
      (error: any) => {}
    );

    return () => {
      // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
      window.ethereum?.removeListener("accountsChanged", accountWasChanged);
      window.ethereum?.removeListener("connect", metaMaskConnect);
      window.ethereum?.removeListener("disconnect", clearAccount);
    };
  }, [isEthereumAvailable]);
}
