import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  instance;
  registry;
  crowdfunding;
  userAddr;

  constructor() { 
    this.instance = new Web3('http://localhost:9545');
    console.debug(this.instance);

    const CrowdFundingSchema = require("../../build/contracts/CrowdFunding.json");
    this.crowdfunding = new this.instance.eth.Contract(CrowdFundingSchema.abi, '0x5Cb061aD9FEDDAAF175485266Fd8A15fe0dF0994');
    const RegistrySchema = require("../../build/contracts/Registry.json");
    this.registry = new this.instance.eth.Contract(RegistrySchema.abi, '0x3178822de033a720C6F3B0b575D63280a47108d6');


    console.debug(this.crowdfunding);

    /*this.crowdfunding.events.campaignList(function(error, event){ 
      console.log(event); 
    })
    .on('data', function(event){
      console.log(event);
    })*/
    
  }

  /*async getAllCampaigns() {

  }

  async getCampaignsOwned(address: string) {
    this.registry.methods.campaignsByOwner(address).call({})
    .then(function(result){
      console.debug(result);
    });
  }

  async getCampaignsContributed(address: string) {

  }*/

  newCampaign(name: string, fundgoal: number, expiry: number) {
    this.crowdfunding.methods.newCampaign(this.instance.utils.asciiToHex(name))
    .send({from: '0xebd9dea5f791df057138377b3e6b2eb5607fd1d5'}, 
    (error, transactionHash) => {console.debug(transactionHash)})

    this.crowdfunding.methods.setFundGoal(fundgoal)
    .send({from: '0xebd9dea5f791df057138377b3e6b2eb5607fd1d5'}, 
    (error, transactionHash) => {console.debug(transactionHash)})

    this.crowdfunding.methods.setExpiry(expiry)
    .send({from: '0xebd9dea5f791df057138377b3e6b2eb5607fd1d5'}, 
    (error, transactionHash) => {console.debug(transactionHash)})
  }

  getOwnCampaign(address: string) {
    this.userAddr = address;
    this.crowdfunding.methods.getOwnCampaign()
    .send({from: this.userAddr},
    (error, result) => {console.debug(this.userAddr)});
  }

  contributeToCampaign(weiAmount: number) {
    //console.debug(weiAmount);
    this.crowdfunding.methods.contributeToCampaign('0xebd9dea5f791df057138377b3e6b2eb5607fd1d5')
    .send({from: '0xebd9dea5f791df057138377b3e6b2eb5607fd1d5', value: weiAmount},
    (error, result) => {console.error(error); console.debug(result)});

    this.registry.methods.registerContribution('0xebd9dea5f791df057138377b3e6b2eb5607fd1d5')
    .send({from: '0xebd9dea5f791df057138377b3e6b2eb5607fd1d5', value: weiAmount},
    (error, result) => {console.error(error); console.debug(result)});
  }

  getAllContributions() {

  }

}
