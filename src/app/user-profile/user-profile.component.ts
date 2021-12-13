import { Component, OnInit} from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  contentControl: number = 0;

  campaignName: string;
  expiry: number;
  fundGoal: number;
  status: string;
  amountRaised: number;

  contributions: Map<string, number>;

  constructor(private web3service: Web3Service) {}

  ngOnInit(): void {
    this.web3service.crowdfunding.events.GetOwnCampaign()
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
    .on('error', (err, _) => console.error(err));

    this.web3service.registry.events.GetAllContributions()
    .on('data', (event) => {
      //console.debug(event);

      this.contributions = event.returnValues['contributions']
      .reduce((contributions: Map<string, number>, c) => {
        const sender = c['sender'];
        const value = Number(c['value']);

        return contributions.set(sender, (contributions.get(sender) || 0) + value)
      }, new Map<string, number>());
    }).on('error', (err, _) => console.error(err));
  }

  async spawnCampaignCard() {
    //let address = (<HTMLInputElement>document.getElementById("userAddr")).value;
    //await this.web3service.getUserCampaigns(address);

    await this.web3service.crowdfunding.methods.getOwnCampaign()
    .send({from: this.web3service.userAddr})

    await this.web3service.registry.methods.getAllContributions()
    .send({from: this.web3service.userAddr})
    
    this.contentControl = 1;
  }

  async spawnPayout() {
    await this.web3service.payoutFundRaised();
  }
}
