import { IdentifierPrefix } from "@celo/identity/lib/odis/identifier";

const { OdisContextName } = require("@celo/identity/lib/odis/query");

export const FA_CONTRACT = require("./abis/FederatedAttestations.json");
export const FA_PROXY_CONTRACT = require("./abis/FederatedAttestationsProxy.json");
export const REGISTRY_CONTRACT = require("./abis/Registry.json");
export const ESCROW_PROXY_CONTRACT = require("./abis/EscrowProxy.json");
export const ESCROW_CONTRACT = require("./abis/Escrow.json");
export const ODIS_PAYMENTS_CONTRACT = require("./abis/OdisPayments.json");
export const STABLE_TOKEN_CONTRACT = require("./abis/StableToken.json");
export const ACCOUNTS_CONTRACT = require("./abis/Accounts.json");

// Get addresses from here - https://github.com/celo-org/social-connect/blob/main/docs/protocol.md#smart-contract-addresses

export const RPC =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "https://alfajores-forno.celo-testnet.org"
    : "https://forno.celo.org";

export const SERVICE_CONTEXT =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? OdisContextName.ALFAJORES
    : OdisContextName.MAINNET;

export const FA_PROXY_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0x70F9314aF173c246669cFb0EEe79F9Cfd9C34ee3"
    : "0x0aD5b1d0C25ecF6266Dd951403723B2687d6aff2";

export const ESCROW_PROXY_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0xf4Fa51472Ca8d72AF678975D9F8795A504E7ada5"
    : "0xb07E10c5837c282209c6B9B3DE0eDBeF16319a37";

export const ODIS_PAYMENTS_PROXY_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0x645170cdB6B5c1bc80847bb728dBa56C50a20a49"
    : "0xae6b29f31b96e61dddc792f45fda4e4f0356d0cb";

export const STABLE_TOKEN_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
    : "0x765DE816845861e75A25fCA122bb6898B8B1282a";

export const ACCOUNTS_PROXY_ADDRESS =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "TESTNET"
    ? "0xed7f51A34B4e71fbE69B3091FcF879cD14bD73A9"
    : "0x7d21685C17607338b313a7174bAb6620baD0aaB7";

export const getIdentifierPrefix = () => {
  if (process.env.NEXT_PUBLIC_SOCIAL_CONNECT_PROVIDER === "TWITTER") {
    return IdentifierPrefix.TWITTER;
  } else if (process.env.NEXT_PUBLIC_SOCIAL_CONNECT_PROVIDER === "GITHUB") {
    return IdentifierPrefix.TWITTER;
  }
  return IdentifierPrefix.TWITTER;
};
