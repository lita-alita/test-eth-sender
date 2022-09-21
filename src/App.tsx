import './App.css';
import { useEffect, useState } from 'react'
import SenderEth from './components/ethSender';


function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isProv, setisProv] = useState(false);

  useEffect(()=>{
    if (typeof window.ethereum !== 'undefined'){setisProv(true)}
  }, [])

  //connect Metamask to dApp
  const connectMetamask = async () => {  
    const {ethereum} = window;
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0])
        const id = await ethereum.request({ method: `eth_chainId` });
        if (id!=='0x4') await changeNetwork();
    } catch (err) {
        alert('error to connect')
    }
  };

  async function changeNetwork(){
    const {ethereum} = window;
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      });
    } catch (err:any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (err.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x4',
                chainName: 'Rinkeby testnet',
                rpcUrls: ['https://rinkeby.infura.io/v3/'],
              },
            ],
          });
        } catch (err) {
          alert("Unknown error")
        }
      }
      // handle other "switch" errors
    }
  };

  if (!isProv) {
    return (
      <div className="App">
        <header className="App-header">
          You need to install Metamask
        </header>
      </div>
    )}

  return (
    <>
    {currentAccount == "" &&
     <button onClick={connectMetamask}>Click to connect Metamask</button>
    }
    {currentAccount !== "" &&
    <SenderEth/>
    }
    </>
  )
}

export default App;
