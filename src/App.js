import { useState } from "react";
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import './App.css';

const { ethers } = require("ethers");
const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

function App() {

  // Property Variables
  const [message, setMessage] = useState("");
  
  // Helper Functions
  async function setGreeting() {

    if (!message) return;

    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // create contract and signer
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(message);
      
      setMessage("");
      await transaction.wait();
      fetchGreeting();
    }
  }


  // Request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // Fetches the current greeting value stored in greeting
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet();
        console.log('data: ', data);
      } catch (err) {
        console.log('Error: ', err);
      }
    }
  }


  // Return
  return (
    <div className='App'>

      <div className='App-header'>

        {/* BUTTONS - Fetch & Set */}
        <div className='custom-buttons'>
          <button 
            onClick={fetchGreeting}
            style={{ backgroundColor: '#b4eeb4' }}>Fetch Greeting</button>
          <button 
            onClick={setGreeting}
            style={{ backgroundColor: '#cde1f3' }}>Set Greeting</button>
        </div>

        {/* INPUT TEXT - String */}
        <input
          onChange={e => setMessage(e.target.value)}
          value={message}
          placeholder='Set greeting Message'
        />

      </div>
      
    </div>
  );
}

export default App;
