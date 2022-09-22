import { render, screen } from '@testing-library/react';
import SenderEth from './components/ethSender';

test('renders send eth form', () => {
  render(<SenderEth />);
  const amountInput = screen.getByPlaceholderText("Eth amount");
  expect(amountInput).toBeInTheDocument();
  const addressInput = screen.getByPlaceholderText("Eth address");
  expect(addressInput).toBeInTheDocument();
  const sendButton = screen.getByText("Send");
  expect(sendButton).toBeInTheDocument();
}); 

test('test send eth form', () => {
  const { ethers } = require("hardhat");
  let addr1; 
  let addr2;
 
  (async function () {
    [addr1, addr2] = await ethers.getSigners();
  })()

  render(<SenderEth />);

});
