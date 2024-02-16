import { HStack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Navbar = () => {
  return (
    <HStack p="2" justify="end">
      <ConnectButton />
    </HStack>
  );
};