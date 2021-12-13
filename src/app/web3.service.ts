import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  instance;
  registry;
  crowdfunding;
  userAddr = '0xebd9dea5f791df057138377b3e6b2eb5607fd1d5';

  name: string;
  expiry: number;
  fundGoal: number;

  constructor() { 
    this.instance = new Web3('http://localhost:9545');
    //console.debug(this.instance);

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

  async getUserCampaigns(address: string) {
    //this.userAddr = address;
    
    this.crowdfunding.methods.getOwnCampaign()
    .send({from: this.userAddr})
    .then((result) => {
      //console.debug(result);
    });

    this.crowdfunding.getPastEvents('GetOwnCampaign', (error, events) => {})
    .then((events) => {

      this.name = this.instance.utils
      .hexToAscii(events[0].returnValues['campaign']['name']);

      this.fundGoal = events[0].returnValues['campaign']['fundGoal'];

      this.expiry = events[0].returnValues['campaign']['expiry'];
      console.debug(events);
    });

    this.registry.methods.getAllContributions()
    .send({from: this.userAddr})
    .then((result) => {
      //console.debug(result);
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
