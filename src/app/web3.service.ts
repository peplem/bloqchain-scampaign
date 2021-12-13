import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  instance;
  registry;
  crowdfunding;

  userAddr = '0x2a548ca6454a0e31f3aa20b4c24abc3fe53c1f69';

  constructor() { 
    this.instance = new Web3('ws://localhost:9545');

    const CrowdFundingSchema = require("../../build/contracts/CrowdFunding.json");
    this.crowdfunding = new this.instance.eth.Contract(CrowdFundingSchema.abi, '0xAbE843Dd143A9cf72775B2b0645E0Cd9887e05b4');
    
    const RegistrySchema = require("../../build/contracts/Registry.json");
    this.registry = new this.instance.eth.Contract(RegistrySchema.abi, '0xe01a9E15D5AfEA177ea3bEF31994761477B9d80d');
  }

  async newCampaign(name: string, fundgoal: number, expiry: number) {
    this.crowdfunding.methods.newCampaign(this.instance.utils.asciiToHex(name), fundgoal, expiry)
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
