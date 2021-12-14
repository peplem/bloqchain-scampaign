import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  instance;
  registry;
  crowdfunding;

  userAddr = environment.userAddress;

  constructor() {
    this.instance = new Web3(environment.truffleUrl);

    const CrowdFundingSchema = require("../../build/contracts/CrowdFunding.json");
    this.crowdfunding = new this.instance.eth.Contract(CrowdFundingSchema.abi, environment.crowdFundingAddress);
    
    const RegistrySchema = require("../../build/contracts/Registry.json");
    this.registry = new this.instance.eth.Contract(RegistrySchema.abi, environment.RegistryAddress);
  }

  async newCampaign(name: string, fundgoal: number, expiry: number) {
    await this.crowdfunding.methods.newCampaign(this.instance.utils.asciiToHex(name), fundgoal, expiry)
    .send({from: this.userAddr})
    .then((hash) => console.debug('Campaign created: ', hash));
  }

  async contributeToCampaign(weiAmount: number) {
    await this.crowdfunding.methods.contributeToCampaign(this.userAddr)
    .send({from: this.userAddr, value: weiAmount})
    .then((hash) => console.debug('Contribute sent: ', hash));

    await this.registry.methods.registerContribution(this.userAddr)
    .send({from: this.userAddr, value: weiAmount})
    .then((hash) => console.debug('Contribute registered: ', hash));
  }

  async payoutFundRaised() {
    await this.crowdfunding.methods.payoutFundRaised()
    .send({from: this.userAddr})
    .then((hash) => console.debug('Payout issued: ', hash));
  }
}
