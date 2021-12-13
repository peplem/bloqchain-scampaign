import { Component } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-campaign-desc',
  templateUrl: './campaign-desc.component.html',
  styleUrls: ['./campaign-desc.component.css']
})
export class CampaignDescComponent {

  constructor(private web3service: Web3Service) { }

  spawnNewFund() {
    let weiAmount = Number((<HTMLInputElement>document.getElementById("weiamount")).value);
    this.web3service.contributeToCampaign(weiAmount)
  }

}
