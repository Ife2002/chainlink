import { ethers } from 'ethers'
import { LiFi } from '@lifi/sdk'
import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'
import fetch, { Headers, Request, Response } from 'cross-fetch'
import axios from 'axios'

enum Order {
    'RECOMMENDED',
    'FASTEST',
    'CHEAPEST',
    'SAFEST'
}

interface RouteOptions {
    integrator?: string // Should contain the identifier of the integrator. Usually, it's dApp/company name.
    fee?: number // 0.03 = take 3% integrator fee (requires verified integrator to be set)
    insurance?: boolean // Whether the user wants to insure their tx
    maxPriceImpact?: number // Hide routes with price impact greater than or equal to this value
    order?: Order // (default: RECOMMENDED) 'RECOMMENDED' | 'FASTEST' | 'CHEAPEST' | 'SAFEST'
    slippage?: number // (default: 0.03) Expressed as decimal proportion, 0.03 represents 3%
    referrer?: string // Integrators can set a wallet address as a referrer to track them
    infiniteApproval?: boolean // (default: false)
    allowSwitchChain?: boolean // (default: false) Whether chain switches should be allowed in the routes
    allowDestinationCall?: boolean // (default: true) destination calls are enabled by default
    bridges?: AllowDenyPrefer
    exchanges?: AllowDenyPrefer
  }
  
  interface AllowDenyPrefer {
      allow?: string[];
      deny?: string[];
      prefer?: string[];
  }

  (async () => {

if (!globalThis.fetch) {
  const globalThisAny: any = globalThis
  globalThisAny.fetch = fetch
  globalThisAny.Headers = Headers
  globalThisAny.Request = Request
  globalThisAny.Response = Response
}

const routeOptions = {
    bridges: {
        allow: ['connext']
    },
    exchanges: {
        deny: ['1inch'],
    },
}

const lifi = new LiFi({
  integrator: 'Jinn'
})


const wallet = await ethers.Wallet.createRandom();

const web3 = new Web3('https://rpc-mainnet.maticvigil.com/');
console.log(wallet)
// Display the wallet information
// console.log('New wallet created:');
// console.log('Address:', wallet.mnemonic);
// console.log('Private Key:', wallet.privateKey);

const getQuote = async (fromChain: string, toChain: string, fromToken: string, toToken: string, fromAmount: string, fromAddress: string) => {
    const result = await axios.get('https://li.quest/v1/quote', {
        params: {
            fromChain,
            toChain,
            fromToken,
            toToken,
            fromAmount,
            fromAddress,
        }
    });
   // console.log(result.data)
    return result.data;
}

const fromChain = 'DAI';
const fromToken = 'USDC';
const toChain = 'POL';
const toToken = 'USDC';
const fromAmount = '1000000';
const fromAddress = wallet.address.toString();


    const quote = await getQuote(fromChain, toChain, fromToken, toToken, fromAmount, fromAddress);
    const provider = new ethers.JsonRpcProvider('https://polygon-rpc.com', 137);
    const walletProvider = wallet.mnemonic
     ? ethers.Wallet.fromPhrase(wallet.mnemonic.phrase).connect(provider) : null;

    if (walletProvider) {
     // Now you can use walletProvider for transactions or other operations
     console.log(walletProvider)
    walletProvider.connect(provider);
    // Your code logic continues here...
    const tx = await wallet.sendTransaction(quote.transactionRequest);
    console.log(tx)
    await tx.wait();

    } else {
    console.error('Mnemonic is undefined. Unable to create a wallet.');
    }

    /////////////////////////////////////
    
})();
