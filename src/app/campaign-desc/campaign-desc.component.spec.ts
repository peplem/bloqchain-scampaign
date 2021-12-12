import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDescComponent } from './campaign-desc.component';

describe('CampaignDescComponent', () => {
  let component: CampaignDescComponent;
  let fixture: ComponentFixture<CampaignDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
