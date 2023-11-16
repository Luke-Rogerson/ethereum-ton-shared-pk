import crypto from 'crypto';
import { keyPairFromSecretKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";
import ethUtil from 'ethereumjs-util';

// Ethereum requires a 32-byte private key
// TON requires a 64-byte private 
// Solution: Generate a 32-byte private key and use a hash function to derive a 64-byte key

// Generate a 32-byte root private key
const rootPrivateKey = crypto.randomBytes(32);

// Use the root key directly for Ethereum
const ethPublicKey = ethUtil.privateToPublic(rootPrivateKey);
const ethAddress = ethUtil.pubToAddress(ethPublicKey).toString('hex');

// Use a hash function to derive a 64-byte key for TON
const tonPrivateKey = crypto.createHash('sha512').update(rootPrivateKey).digest();
const tonKeyPair = keyPairFromSecretKey(tonPrivateKey);
const tonWallet = WalletContractV4.create({ publicKey: tonKeyPair.publicKey, workchain: 0 });

console.log('Ethereum Wallet Address:', `0x${ethAddress}`);
console.log('TON Wallet Address:', tonWallet.address.toString({ testOnly: true }));