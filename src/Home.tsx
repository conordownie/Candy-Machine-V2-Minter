import { useEffect, useState } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { GatewayProvider } from '@civic/solana-gateway-react';
import { MintButton } from './CandyMachine/MintButton';

import RoadmapSegment from "./components/Roadmap/RoadmapSegment";
import Footer from "./components/Footer/Footer";
import Team from "./components/Team/Team";
import { Nav, NavbarContainer, WalletText } from "./components/Nav/NavbarElements";
import { HeroContainer, HeroImage, HeroSupply, HeroText, SocialBtn, TwitterBtn, DiscordBtn, ConnectContainer, AboutArea } from "./components/Hero/HeroElements";
import AboutSection from "./components/About/About";
import { pink } from "@material-ui/core/colors";
import ConnectBG from "../src/img/Hero/ConnectBG.jpg";
import MintBG from '../src/img/Hero/ConnectBG.jpg';
import Header from '../src/img/hero/MM_WEBSITE.png'
import { AboutLink } from "./components/Hero/HeroElements";
import AccordionC from "./components/FAQ/AccordianElements";


import {
  CandyMachineAccount,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
  CANDY_MACHINE_PROGRAM,
} from "./CandyMachine/candy-machine";

import {
  AlertState,
  getAtaForMint,
} from "./CandyMachine/utils";

const ConnectButton = styled(WalletDialogButton)`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5px;
  background: linear-gradient(180deg, #604ae5 0%, #813eee 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const MintContainer = styled.div`
height: 15%;
width: 15%;
background: transparent;
display: flex;
position: absolute;
left: 18%;
bottom: 28.7%;
z-index: 4;
`; // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  txTimeout: number;
  rpcHost: string;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);
  const [whitelistEnabled, setWhitelistEnabled] = useState(true);
  const [whitelistTokenBalance, setWhitelistTokenBalance] = useState(0);
 

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();

  const rpcUrl = props.rpcHost;

  const refreshCandyMachineState = () => {
    (async () => {
      console.log("refresh cm");
      if (!wallet) return;

      const cndy = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      console.log(cndy);
      setCandyMachine(cndy);

      setItemsAvailable(cndy.state.itemsAvailable);
      setItemsRemaining(cndy.state.itemsRemaining);
      setItemsRedeemed(cndy.state.itemsRedeemed);

      // fetch whitelist token balance
      if (cndy.state.whitelistMintSettings) {
        setWhitelistEnabled(true);
        let balance = 0;
        try {
          const tokenBalance =
            await props.connection.getTokenAccountBalance(
              (
                await getAtaForMint(
                  cndy.state.whitelistMintSettings.mint,
                  wallet.publicKey,
                )
              )[0],
            );

          balance = tokenBalance?.value?.uiAmount || 0;
        }
        catch (e) {
          console.error(e);
          balance = 0;
        }

        setWhitelistTokenBalance(balance);
      }
      else {
        setWhitelistEnabled(false);
      }
    })();
  };

  const onMint = async () => {
    try {
      setIsMinting(true);
      document.getElementById('#identity')?.click();
      if (wallet && candyMachine?.program && wallet.publicKey) {
        const mintTxId = (
          await mintOneToken(candyMachine, wallet.publicKey)
        )[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            props.txTimeout,
            props.connection,
            'singleGossip',
            true,
          );
        }

        if (!status?.err) {
          setAlertState({
            open: true,
            message: 'Congratulations! Mint succeeded!',
            severity: 'success',
          });
        } else {
          setAlertState({
            open: true,
            message: 'Mint failed! Please try again!',
            severity: 'error',
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || 'Minting failed! Please try again!';
      if (!error.msg) {
        if (!error.message) {
          message = 'Transaction Timeout! Please try again.';
        } else if (error.message.indexOf('0x138')) {
        } else if (error.message.indexOf('0x137')) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf('0x135')) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  return (
    <main>


    <HeroContainer>
    <NavbarContainer>
      <WalletText>
      {wallet && <p>Remaining Sminem: {itemsRemaining}</p>}
      </WalletText>
      <WalletText>

      {wallet && (
        <p>{shortenAddress(wallet.publicKey.toBase58() || "")}</p>
      )}

      </WalletText>


        
      </NavbarContainer>

       
  
        <MintContainer>        {!wallet ? (
           <ConnectContainer>
           {!wallet ? <ConnectButton> Connect Wallet</ConnectButton> : ""}
    
            </ConnectContainer>
        ) :
          candyMachine?.state.gatekeeper &&
            wallet.publicKey &&
            wallet.signTransaction ? (
            <GatewayProvider
              wallet={{
                publicKey:
                  wallet.publicKey ||
                  new PublicKey(CANDY_MACHINE_PROGRAM),
                //@ts-ignore
                signTransaction: wallet.signTransaction,
              }}
              // // Replace with following when added
              // gatekeeperNetwork={candyMachine.state.gatekeeper_network}
              gatekeeperNetwork={
                candyMachine?.state?.gatekeeper?.gatekeeperNetwork
              } // This is the ignite (captcha) network
              /// Don't need this for mainnet
              clusterUrl={rpcUrl}
              options={{ autoShowModal: false }}
            >
              <MintButton
                candyMachine={candyMachine}
                isMinting={isMinting}
                onMint={onMint}
              />
            </GatewayProvider>
          ) : (
            <MintButton
              candyMachine={candyMachine}
              isMinting={isMinting}
              onMint={onMint}
            />
            
          )}
      </MintContainer>
    

      <AboutLink to = "about" smooth={true} duration={500} spy={true} exact='true'/>

      <DiscordBtn>
        <SocialBtn href="https://t.co/bFoolErpTm"/>
      </DiscordBtn>

      <TwitterBtn>
  <SocialBtn href="https://twitter.com/boywhosavedNFTS"/>
</TwitterBtn>
    {!wallet ? <HeroImage src = {ConnectBG}/> : <HeroImage src = {MintBG}/>} 
    </HeroContainer>

    <AboutSection/>

    <RoadmapSegment/>


      <Team/>
    
      <AccordionC/>

      <Footer/>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Home;