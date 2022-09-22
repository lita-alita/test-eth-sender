import './App.css';
import { useEffect, useState } from 'react';
import SenderEth from './components/ethSender';
import { changeNetwork } from './scripts/changeNetwork';


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

  if (!isProv) {
    return (
      <div className="App">
        <p className="App-replacer">
          You need to install Metamask
        </p>
      </div>
    )}

  return (
    <div className="App">
      {currentAccount === "" &&
      <button className="connectButton" onClick={connectMetamask}>
        Click to connect Metamask
      </button>
      }
      {currentAccount !== "" &&
      <SenderEth/>
      }
    </div>
  )
}

export default App;
