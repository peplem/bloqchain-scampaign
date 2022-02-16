import { Component } from '@angular/core';
import { Web3Service } from '../web3.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign-desc',
  templateUrl: './campaign-desc.component.html',
  styleUrls: ['./campaign-desc.component.css']
})
export class CampaignDescComponent {

  constructor(private web3service: Web3Service) { }

  addr: string = environment.userAddress;

  spawnNewFund() {
    let weiAmount = Number((<HTMLInputElement>document.getElementById("weiamount")).value);
    this.web3service.contributeToCampaign(weiAmount)
  }
}
