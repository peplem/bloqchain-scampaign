import { Component} from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  contentControl: number = 0;

  constructor(private web3service: Web3Service) {}

  async spawnCampaignCard() {
    let address = (<HTMLInputElement>document.getElementById("userAddr")).value;
    await this.web3service.getOwnCampaign(address);
    
    this.contentControl = 1;
  }
}
