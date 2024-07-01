import { ethers, getChainId } from "hardhat";
import { ProofOfHumanityOld__factory } from "../../typechain-types";
import { ARBITRATOR_EXTRA_DATA, Addresses, CHALLENGE_DURATION, CLEARING_META_EVIDENCE, 
  HUMANITY_LIFESPAN, LOSER_MULTIPLIER, NB_VOUCHES, REGISTRATION_META_EVIDENCE, RENEWAL_DURATION, 
  REQUEST_BASE_DEPOSIT_SEPOLIA, SHARED_MULTIPLIER, WINNER_MULTIPLIER, supported 
} from "../consts";

async function main() {
  const [deployer] = await ethers.getSigners();
  const chainId = +(await getChainId());

  const pohold = await new ProofOfHumanityOld__factory(deployer).deploy(
    Addresses[chainId].ARBITRATOR,
    ARBITRATOR_EXTRA_DATA,
    REGISTRATION_META_EVIDENCE,
    CLEARING_META_EVIDENCE,
    REQUEST_BASE_DEPOSIT_SEPOLIA,
    HUMANITY_LIFESPAN,
    RENEWAL_DURATION,
    CHALLENGE_DURATION,
    [SHARED_MULTIPLIER, WINNER_MULTIPLIER, LOSER_MULTIPLIER],
    NB_VOUCHES
  );

  await pohold.addSubmissionManually(
    ["0xeba12826643dab0ffa5d586123117c57b2040d80"],
    ["/ipfs/QmVKcrKPVyaMA1KLQh9FbhYkbbWPR8jZ4UC1DYRWAHnwwe/registration.json"],
    ["Johnny"]
  );

  /* 
  await pohold.addSubmissionManually(
    [
      "0xf19d3e30392359440597ffe1d783ab77aebb2b4d",
      "0x245bd6b5d8f494df8256ae44737a1e5d59769ab4",
      "0x42cedde51198d1773590311e2a340dc06b24cb37",
      "0xf313d85c7fef79118fcd70498c71bf94e75fc2f6",
      "0xe786c0aee7f4348ee05a0734b2ec44ac71b812be",
      "0x3ba3b193ec7d7e255d599fd9ab404c90d6388f74",
      "0x3610c9f5f1296277fa777f936a55fddd1df44418",
      "0x19be20b1f723aff620ac1ca041824ac78f140460",
      "0x7b2e78d4dfaaba045a167a70da285e30e8fca196",
      "0x0a0a0e230a87e03db40cad7d7750cf7fe849ba7f",
      "0x3f769c3666342f642b0fb3de045ea57b2709cc6b",
      "0x17a91203a9e9c3519c2f76210497ef7f4be2352f",
      "0xfa148900c6f49949b4bc182e3c78d0eb1e71689f",
      "0xe7f13052fe2ba7d038dac18de5e730542e3979bc",
    ],
    [
      "/ipfs/QmVSbaRVX7UGiCykdWvL9CS3AxMtpszszvC3WHbABdb3bE/registration.json",
      "/ipfs/Qme1tCEt2dyKtMcybCxLTBH1f6Vk8Eu9iicA9iA2P6jUci/registration.json",
      "/ipfs/QmTunniLSTnUax1ZhrpXYFXfsTcRBqDZE6EneqD1ioY76Y/registration.json",
      "/ipfs/QmSUZiibwh3Lc8Kg56yGEh1rW12zate9agwJWjSnbER6ga/registration.json",
      "/ipfs/QmaRAzcTtKwWCF4Tt6r3TnghYZrzURqfDeqVSTUC55CMaH/registration.json",
      "/ipfs/QmamBHoiy8VkHtdZxMzyCy9Raft39o4HWMtvW47GDvAq9g/registration.json",
      "/ipfs/QmXbmZmcVRKQyokiRcispzM6SRwyZbEUt1YGiNjv3YAitS/registration.json",
      "/ipfs/Qmc6Frh1auMu8PD9yVjnK62h1QXAfyNw62zrLAYr1CrMFh/registration.json",
      "/ipfs/QmVARek5qVhNZwfkSvBQqmgPELXuNULPqQiBsX3NRkSP4q/registration.json",
      "/ipfs/QmRq6Eybo4qY2Shiwej2K3vsy22xvuX6Y9bR9NqeKZAU2X/registration.json",
      "/ipfs/QmVydrpNDNejN9o5jA6bsVmx9wVEn5VTNd5VBvdJoAt2Qd/registration.json",
      "/ipfs/QmceC145YB9hLY7rC9RBixRohdmJFDai8yMZCGmTqDdS3h/registration.json",
      "/ipfs/QmNttr1cdQ3krf7EVy3Qa91gKVkoGXP4bDLZwVFMov4DoJ/registration.json",
      "/ipfs/QmQMGkcrxxjspwYNiLYzgZv1ndhyR8vMzNzjXyV29PYRWn/registration.json",
    ],
    [
      "Friederike",
      "Nachobr.eth the yubiai guy",
      "Martin (Safe test)",
      "Daisugist",
      "Nguyenduny",
      "Benja P",
      "Mark",
      "shotaro",
      "Martin Köppelmann",
      "Apu",
      "Turuu",
      "Nico Bilinkis",
      "Jane D",
      "shotaro",
    ]
  );
 */

  // ["0x1db3439a222c519ab44bb1144fc28167b4fa6ee6", "0x00de4b13153673bcae2616b67bf822500d325fc3"],
  // ["/ipfs/QmQ3zm9y76sPT5Qyaxfpbtmdp8LNNGPrg2CrNYqbzGFokk/registration.json", "/ipfs/QmPa696yBz22Mv8uHEjJJQ7jYCYbLtuJN7HTgHPe12QtaR/registration.json"],
  // ["Vitalik", "Kevin"]

  console.log(`
    ProofOfHumanityV1 deployed to:
              ${await pohold.getAddress()}

    tx# ${pohold.deploymentTransaction()?.hash}`);
}

supported()
  .then(main)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
