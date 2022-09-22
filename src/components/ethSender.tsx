import { useState } from 'react';
import { ethers } from "ethers";
import '../styles/ethSender.css';

export default function SenderEth () {
    const [ethAmount, updEthAmount] = useState(0);
    const [ethAddress, updEthAddress] = useState("");

    async function senderHandler(){
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const address = await signer.getAddress()
        const amount = ethers.utils.parseEther(ethAmount.toString());

        const tx = {
            from: address,
            to: ethAddress,
            value: amount,
            nonce: provider.getTransactionCount(address, "latest"),
            gasLimit: ethers.utils.hexlify("0x100000"), // 100000
            gasPrice: provider.getGasPrice(),
        };

        const sendedTx = await signer.sendTransaction(tx);
        console.log(sendedTx)
        const response = document.getElementById("returner");
        response!.innerText = `Transaction sended. Click here to see it etherscan.`
        response!.setAttribute("href", `https://rinkeby.etherscan.io/tx/${sendedTx.hash}`)
    }

    return (
        <div className='ethSender'>
            <input
                type="number"
                placeholder="Eth amount"
                id="amountInput"
                required
                onChange={(e => updEthAmount(Number(e.target.value)))}>
            </input>
            <input
                type="text"
                id="addressInput"
                placeholder="Eth address"
                required
                onChange={(e => updEthAddress(e.target.value))}>
            </input>
            <button onClick={senderHandler}>Send</button>
            <a href="" id="returner"></a>
        </div>
    )
}