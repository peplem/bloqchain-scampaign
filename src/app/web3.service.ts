import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  instance;
  registry;
  crowdfunding;

  userAddr = '0x704109b0fed58e84f890d0fbd084b66842dcde14';

  constructor() { 
    this.instance = new Web3('ws://localhost:9545');

    const CrowdFundingSchema = require("../../build/contracts/CrowdFunding.json");
    this.crowdfunding = new this.instance.eth.Contract(CrowdFundingSchema.abi, '0xAbE843Dd143A9cf72775B2b0645E0Cd9887e05b4');
    
    const RegistrySchema = require("../../build/contracts/Registry.json");
    this.registry = new this.instance.eth.Contract(RegistrySchema.abi, '0xe01a9E15D5AfEA177ea3bEF31994761477B9d80d');
  }

  async newCampaign(name: string, fundgoal: number, expiry: number) {
    await this.crowdfunding.methods.newCampaign(this.instance.utils.asciiToHex(name), fundgoal, expiry)
    .send({from: this.userAddr})
  }

  async contributeToCampaign(weiAmount: number) {
    await this.crowdfunding.methods.contributeToCampaign(this.userAddr)
    .send({from: this.userAddr, value: weiAmount})

    await this.registry.methods.registerContribution(this.userAddr)
    .send({from: this.userAddr, value: weiAmount})
  }

  async payoutFundRaised() {
    await this.crowdfunding.methods.payoutFundRaised()
    .send({from: this.userAddr})
  }
}
