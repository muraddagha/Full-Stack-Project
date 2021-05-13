import { Component, OnInit } from '@angular/core';
import { IBanner } from '../../models/banner.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ads-banner',
  templateUrl: './ads-banner.component.html',
  styleUrls: ['./ads-banner.component.scss']
})
export class AdsBannerComponent implements OnInit {

  public mediumBanner: IBanner
  public smallBanner: IBanner
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getMediumBanner();
    this.getSmallBanner();
  }

  private getMediumBanner() {
    this.apiService.getMediumBanner().subscribe(res => {
      this.mediumBanner = res;
    })
  }
  private getSmallBanner() {
    this.apiService.getSmallBanner().subscribe(res => {
      this.smallBanner = res;
    })
  }

}
