import { render, screen } from '@testing-library/react';
import SenderEth from './components/ethSender';
import { ethers } from "hardhat";

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
  let addr; 

  (async function () {
    try {
      addr = await ethers.getSigners()
   } catch (e) {
      console.log(e)
    }
  })()

  render(<SenderEth />);

});
