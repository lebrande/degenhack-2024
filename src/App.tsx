import { useAccount, useBalance } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther } from 'viem';

function App() {
  const account = useAccount();
  const balance = useBalance({
    address: account.address,
  });

  return (
    <>
      <div>
        <ConnectButton />

        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
          <br />
          balance: {formatEther(balance.data?.value || 0n)}
        </div>
      </div>
    </>
  )
}

export default App
