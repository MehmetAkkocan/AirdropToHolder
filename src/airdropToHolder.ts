const fs = require('fs');
const shelljs = require('shelljs');

var dataItem = fs.readFileSync("./src/holderItems.json");
var ItemsArray = JSON.parse(dataItem);

var dataHold = fs.readFileSync("./src/holderNFTRank.json");
var HoldArray = JSON.parse(dataHold);


//TODO: change ranks JSON
var dataCom = fs.readFileSync("./src/ranks/Common.json");
var comArray = JSON.parse(dataCom);
var c: number = 0;

var dataUnc = fs.readFileSync("./src/ranks/Uncommon.json");
var uncArray = JSON.parse(dataUnc);
let u: number = 0;

var dataRar = fs.readFileSync("./src/ranks/Rare.json");
var rarArray = JSON.parse(dataRar);
let r: number = 0;

var dataEpi = fs.readFileSync("./src/ranks/Epic.json");
var epiArray = JSON.parse(dataEpi);
let e: number = 0;

var dataLeg = fs.readFileSync("./src/ranks/Legendary.json");
var legArray = JSON.parse(dataLeg);
let l: number = 0;

let holderAddress: string;
let mintAddress: string;

function itemSend(i: number, rankArray: any) {
  return rankArray[i].token;
}

function readItem(rank: string, n: number) {
  if (rank === 'Common') return ItemsArray[n][HoldArray[n].Wallet].Common
  if (rank === 'Uncommon') return ItemsArray[n][HoldArray[n].Wallet].Uncommon
  if (rank === 'Rare') return ItemsArray[n][HoldArray[n].Wallet].Rare
  if (rank === 'Epic') return ItemsArray[n][HoldArray[n].Wallet].Epic
  if (rank === 'Legendary') return ItemsArray[n][HoldArray[n].Wallet].Legendary
}

async function rankSend(a: number) {
  (async () => {
    for (let j: number = 0; j < readItem('Common', a); j++) {
      mintAddress = await itemSend(c, comArray);
      c++;
      console.log(mintAddress + " " + c + "Common")
      console.log(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`);
    //   await shelljs.exec(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`); //TODO : set solana cli wallet 

    }
    for (let j: number = 0; j < readItem('Uncommon', a); j++) {
      mintAddress = await itemSend(u, uncArray);
      u++;
      console.log(mintAddress + " " + u + "Uncommon")
      console.log(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`);
    //   await shelljs.exec(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`); //TODO : set solana cli wallet 
    }
    for (let j: number = 0; j < readItem('Rare', a); j++) {
      mintAddress = await itemSend(r, rarArray);
      r++;
      console.log(mintAddress + " " + r + "Rare")
      console.log(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`);
    //   await shelljs.exec(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`); //TODO : set solana cli wallet 
    }
    for (let k: number = 0; k < readItem('Epic', a); k++) {
      mintAddress = await itemSend(e, epiArray);
      e++;
      console.log(mintAddress + " " + e + "Epic")
       console.log(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`);
    //   await shelljs.exec(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`); //TODO : set solana cli wallet 
    }
    for (let j: number = 0; j < readItem('Legendary', a); j++) {
      mintAddress = await itemSend(l, legArray);
      l++;
      console.log(mintAddress + " " + l + "Legendary")
      console.log(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`);
    //   await shelljs.exec(`spl-token transfer --allow-unfunded-recipient --fund-recipient ${mintAddress} 1 ${holderAddress}`); //TODO : set solana cli wallet 
    }

  }
  )();
}

async function airdropNFT() {
  (async () => {
    try {
      for (let i: number = 0; i < ItemsArray.length; i++) {
        holderAddress = HoldArray[i].Wallet;
        await rankSend(i);
        console.log("-----------------------")
        console.log(holderAddress + " : " + "Common:" + c + " Uncommon:" + u + " Rare:" + r + " Epic:" + e + " Legendary:" + l)
        console.log("-----------------------")
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  )();
}

export default airdropNFT();
