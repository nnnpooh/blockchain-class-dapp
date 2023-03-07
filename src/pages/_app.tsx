import { type AppType } from "next/dist/shared/lib/utils";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Head from "next/head";
import "@src/styles/globals.css";
import NavBar from "@src/components/layout/Navbar";
import { useEthereum } from "@src/utils/useEthereum";
import { useMetaMask } from "@src/utils/useMetaMask";
import { useEffect } from "react";
import { useMetaMaskStore } from "@src/utils/stores";
import { ethers } from "ethers";
const MyApp: AppType = ({ Component, pageProps }) => {
  useEthereum();
  useMetaMask();
  // --------------------------  Demo of UseEffect --------------------
  // useEffect(() => {
  //   window.ethereum.request({ method: "eth_requestAccounts" }).then(
  //     (accounts: any) => {
  //       console.log(accounts);
  //     },
  //     (error: any) => {}
  //   );
  // }, []);

  // --------------------------  Demo of UseEffect with Dependency ------
  // const [account, provider, chainId, balance, setBalance] = useMetaMaskStore(
  //   (state) => [
  //     state.account,
  //     state.provider,
  //     state.chainId,
  //     state.balance,
  //     state.setBalance,
  //   ]
  // );
  // useEffect(() => {
  //   async function getInfo() {
  //     if (!provider) return;
  //     const balanceRaw = await provider.getBalance(account);
  //     setBalance(ethers.utils.formatEther(balanceRaw));
  //   }
  //   getInfo();
  // }, [account, chainId]);
  // console.log({ balance });

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
        fontFamily: "Prompt",
        headings: { fontFamily: "Prompt" },
      }}
    >
      <Notifications />
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {balance} */}
      <NavBar />
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default MyApp;
