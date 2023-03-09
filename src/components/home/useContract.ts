import { useEffect, useState } from "react";
import { SecretContract, contractAddress } from "@src/abi/secret";
import { useMetaMaskStore, useWorkingStore } from "@src/utils/stores";
import { ethers } from "ethers";
import { showNotification } from "@mantine/notifications";

export function useContract() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [account, isEthereumAvailable, provider, network] = useMetaMaskStore(
    (state) => [
      state.account,
      state.isEthereumAvailable,
      state.provider,
      state.network,
    ]
  );
  const [setSecret] = useWorkingStore((state) => [state.setSecret]);

  function getContract() {
    if (!isEthereumAvailable || !provider) return null;
    const signer = provider.getSigner();
    const secret = new ethers.Contract(
      contractAddress,
      SecretContract.abi,
      signer
    );
    return secret;
  }

  function fetchSecret() {
    const secret = getContract();
    setIsLoading(true);
    if (secret) {
      secret
        .secret()
        .then((data: string) => {
          if (data && typeof data === "string") {
            setSecret(data);
            setIsError(false);
          }
        })
        .catch((err: any) => {
          setSecret("");
          setIsError(true);
          console.log(err);
          showNotification({
            color: "red",
            title: "Error getting secret",
            message:
              "There is an error getting secret. Are you sure you are on the Goerli network?",
          });
        })
        .finally(() => setIsLoading(false));
    }
  }

  useEffect(() => {
    if (!account || !isEthereumAvailable) {
      setIsError(true);
      return;
    }
    fetchSecret();
  }, [account, network, isEthereumAvailable]);

  async function writeSecret(_secret: string) {
    const secret = getContract();
    if (!secret) return null;
    setIsLoading(true);
    const tx = await secret.changeSecret(_secret);
    await tx.wait();
    fetchSecret();
  }

  return { writeSecret, isLoading, isError };
}
