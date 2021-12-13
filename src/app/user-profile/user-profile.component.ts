import { Component, OnInit} from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  contentControl: number = 0;
  name: string;
  expiry: number;
  fundGoal: number;

  constructor(private web3service: Web3Service) {}

  ngOnInit() {

  }

  async spawnCampaignCard() {
    let address = (<HTMLInputElement>document.getElementById("userAddr")).value;
    await this.web3service.getUserCampaigns(address);
    this.name = this.web3service.name;
    this.fundGoal = this.web3service.fundGoal;
    this.expiry = this.web3service.expiry;
    
    this.contentControl = 1;
  }
}
