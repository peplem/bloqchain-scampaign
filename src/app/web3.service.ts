import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  instance;
  registry;
  crowdfunding;
  userAddr = '0x8357b534f26aaf7c631d048333cbbb9cfd2fce4b';

  constructor() { 
    this.instance = new Web3('http://localhost:9545');
    console.debug(this.instance);

    const CrowdFundingSchema = require("../../build/contracts/CrowdFunding.json");
    this.crowdfunding = new this.instance.eth.Contract(CrowdFundingSchema.abi, '0xf83E3E7c312e8419cebBBa78020963122F3bBAae');
    
    const RegistrySchema = require("../../build/contracts/Registry.json");
    this.registry = new this.instance.eth.Contract(RegistrySchema.abi, '0x380ee477AB34e7F0876F33304b804dD04618E5fD');
  }

  async newCampaign(name: string, fundgoal: number, expiry: number) {
    this.crowdfunding.methods.newCampaign(this.instance.utils.asciiToHex(name), fundgoal, expiry)
    .send({from: this.userAddr})
    .then((result) => {
      console.debug(result);
    });
  }

  async getOwnCampaign(address: string) {
    //this.userAddr = address;
    
    this.crowdfunding.methods.getOwnCampaign()
    .send({from: this.userAddr})
    .then((result) => {
      console.debug(result);
    });
  }

  async getAllContributions() {
    this.registry.methods.getAllContributions()
    .send({from: this.userAddr})
    .then((result) => {
      console.debug(result);
    });
  }

  async contributeToCampaign(weiAmount: number) {
    this.crowdfunding.methods.contributeToCampaign(this.userAddr)
    .send({from: this.userAddr, value: weiAmount})
    .then((result) => {
      console.debug(result);
    });

    this.registry.methods.registerContribution(this.userAddr)
    .send({from: this.userAddr, value: weiAmount})
    .then((result) => {
      console.debug(result);
    });
  }
}
