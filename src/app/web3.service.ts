import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  instance;
  registry;
  crowdfunding;

  userAddr = '0x3c91ed17e8c1a27ceeaa0f53d3740657224dbea8';

  constructor() { 
    this.instance = new Web3('ws://localhost:9545');

    const CrowdFundingSchema = require("../../build/contracts/CrowdFunding.json");
    this.crowdfunding = new this.instance.eth.Contract(CrowdFundingSchema.abi, '0x453a6c7783B7751fADE35b3F2f1f06b695255481');
    
    const RegistrySchema = require("../../build/contracts/Registry.json");
    this.registry = new this.instance.eth.Contract(RegistrySchema.abi, '0xb6A0709f0E542e29D2fCeF5618A1313a37a11a51');
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

  async payoutFundRaised() {
    this.crowdfunding.methods.payoutFundRaised()
    .send({from: this.userAddr})
    .then((result) => {
      console.debug(result);
    });
  }

  /*getAllCampaigns(){
    this.crowdfunding.methods.getAllCampaigns()
    .send({from: this.userAddr})
    .then((result) => {
      console.debug(result);
    });
  }*/
}
