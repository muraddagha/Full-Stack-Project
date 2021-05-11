import { Component, OnInit } from '@angular/core';
import { ISetting } from 'src/app/shared/models/setting.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public setting: ISetting;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSetting();
  }

  private getSetting(): void {
    this.apiService.getSetting().subscribe(res => {
      this.setting = res;
    })
  }

}
