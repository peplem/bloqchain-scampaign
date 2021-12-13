import { Component, OnInit} from '@angular/core';
import { getSystemErrorMap } from 'util';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  campaignName: string;
  expiry: number;
  fundGoal: number;
  status: string;
  amountRaised: any;

  contributions: Map<string, number>;

  contentControl: number = 0;

  constructor(private web3service: Web3Service) {}

  ngOnInit(): void {
    this.web3service.crowdfunding.events.GetOwnCampaign()
    .on("connected", (subscriptionId) => {
      //console.debug(subscriptionId);
    })
    .on('data', (event) => {
      //console.debug(event);

      let campaign = event.returnValues['campaign'];

      let name = campaign['name'];
      this.campaignName = this.web3service.instance.utils.hexToAscii(name);

      this.fundGoal = campaign['fundGoal'];
      this.expiry = campaign['expiry'];
      this.amountRaised = campaign['amountRaised'];

      switch (campaign['stage']) {
        case '0': this.status = 'active'; break;
        case '1': this.status = 'failed'; break;
        case '2': this.status = 'successful'; break;
      }
    })
    .on('error', (err, _) => {
        console.error(err);
    });

    this.web3service.registry.events.GetAllContributions()
    .on("connected", (subscriptionId) => {
      //console.debug(subscriptionId);
    })
    .on('data', (event) => {
      //console.debug(event);

      this.contributions = new Map();

      event.returnValues['contributions'].forEach(contribution => {
        let sender = contribution['sender'];
        let value = contribution['value'];

        if (!this.contributions.has(sender)) {
          this.contributions.set(sender, 0);
        }

        this.contributions[sender] += value;
      });
    })
    .on('error', (err, _) => {
        console.error(err);
    });
  }

  async spawnCampaignCard() {
    //let address = (<HTMLInputElement>document.getElementById("userAddr")).value;
    //await this.web3service.getUserCampaigns(address);

    this.web3service.crowdfunding.methods.getOwnCampaign()
    .send({from: this.web3service.userAddr})
    .then((result) => {
      //console.debug(result);
    });

    this.web3service.registry.methods.getAllContributions()
    .send({from: this.web3service.userAddr})
    .then((result) => {
      //console.debug(result);
    });
    
    this.contentControl = 1;
  }

  async spawnPayout() {
    this.web3service.payoutFundRaised();
  }


}
