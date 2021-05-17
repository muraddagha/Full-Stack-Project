import { Component, OnInit } from '@angular/core';
import { ISetting } from 'src/app/shared/models/setting.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public setting: ISetting;
  constructor(private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.getUserAdress();
  }
  private getUserAdress(): void {
    this.apiService.getSetting().subscribe(res => {
      this.setting = res;
    })
  }

}
