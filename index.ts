import Web3 from 'web3';
import axios from 'axios'
const web3 = new Web3('https://rpc-mumbai.maticvigil.com/');

// Public Key: 0x795EE0a540E070C746F0ec3db667D9b38B0128f5
// Private Key: 0x41b189c1bc0923cbec0d7e97d90dc42a199a6fdd2fc2655ac20b7c5aaae8aa64

// const transactionHash = '0xdd7a54b4d7ff2babb2b48fc6682def1917f50238f329e9f2492d6b36d09294d8';  // replace with your transaction hash
// web3.eth.getTransaction(transactionHash)
//     .then((transaction: any) => {
//         const methodId = transaction.input.slice(0, 10);  // get the first 4 bytes (10 characters when represented as a hex string)
//         console.log('Method ID:', methodId);
//     });

const newAccount = web3.eth.accounts.create();

// Extract the public and private keys
// const publicKey = newAccount.address;
// const privateKey = newAccount.privateKey;

const publicKey = "0x795EE0a540E070C746F0ec3db667D9b38B0128f5";
const privateKey = "0x41b189c1bc0923cbec0d7e97d90dc42a199a6fdd2fc2655ac20b7c5aaae8aa64"


console.log('Public Key:', publicKey);
console.log('Private Key:', privateKey);

const wallet = web3.eth.accounts.wallet.add(privateKey);

// Set the gas price (optional)
const gasPriceGwei = 5; // You can adjust this based on your preference
const gasPriceWei = web3.utils.toWei(gasPriceGwei.toString(), 'gwei');

// Specify the transaction parameters

(async () => {

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
    
    const fromChain = 'POL';
    const fromToken = 'MATIC';
    const toChain = 'POL';
    const toToken = 'USDC';
    const fromAmount = '2000';
    const fromAddress = publicKey.toString();
    
    
    const quote = await getQuote(fromChain, toChain, fromToken, toToken, fromAmount, fromAddress);
    // Sign and send the transaction
    const signedTransaction = await web3.eth.accounts.signTransaction(quote.transactionRequest, privateKey);
    console.log(signedTransaction)
    const transactionHash = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    console.log(`Transaction sent: ${transactionHash}`);

})();

