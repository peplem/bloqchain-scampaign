import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-campaign-spawn',
  templateUrl: './campaign-spawn.component.html',
  styleUrls: ['./campaign-spawn.component.css']
})
export class CampaignSpawnComponent implements OnInit{
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  name: string;
  fundGoal: number;
  expiry: number;

  constructor(private web3service: Web3Service, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    
  }

  setName() {
    this.name = (<HTMLInputElement>document.getElementById("name")).value;
  }

  setFundGoal() {
    this.fundGoal = Number((<HTMLInputElement>document.getElementById("fundgoal")).value);
  }

  setExpiry() {
    this.expiry = Number((<HTMLInputElement>document.getElementById("expiry")).value);
  }

  async spawnNewCampaign() {
    await this.web3service.newCampaign(this.name, this.fundGoal, this.expiry)
  }
}
