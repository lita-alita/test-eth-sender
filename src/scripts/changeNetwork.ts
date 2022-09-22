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

export {changeNetwork}