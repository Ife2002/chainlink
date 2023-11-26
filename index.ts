import Web3 from 'web3';
const web3 = new Web3('https://polygon-rpc.com');

const transactionHash = '0xdd7a54b4d7ff2babb2b48fc6682def1917f50238f329e9f2492d6b36d09294d8';  // replace with your transaction hash
web3.eth.getTransaction(transactionHash)
    .then((transaction: any) => {
        const methodId = transaction.input.slice(0, 10);  // get the first 4 bytes (10 characters when represented as a hex string)
        console.log('Method ID:', methodId);
    });
