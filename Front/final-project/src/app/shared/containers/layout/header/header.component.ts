import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IDepartment } from 'src/app/shared/models/department.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  chevron = faChevronDown;
  chevronR = faChevronRight;
  public toggle: boolean = false;
  public category: boolean = false;
  public departments: IDepartment[] = [];
  public isCollapsed = false;



  constructor(private elem: ElementRef, private apiService: ApiService) {
    this.getDepartments();
  }

  ngOnInit(): void {
  }


  private getDepartments(): void {
    this.apiService.getDepartmentsWithCategory().subscribe(res => {
      this.departments = res.departments;
    }),
      err => {

      },
      () => {

      }
  }



  public menuBtn($event): void {
    $event.preventDefault();
    this.toggle = !this.toggle;
  }
  ngAfterViewInit(): void {
    // this.addDropActive()
  }
  public categoryBtn(): void {
    this.category = !this.category;
  }

  private addDropActive(): void {
    let dropdown = this.elem.nativeElement.querySelectorAll('.drop-btn');
    let height;
    dropdown.forEach(e => {
      e.addEventListener('click', (prev) => {
        prev.preventDefault();
        let dropMenu = e.nextSibling;
        let icon = e.querySelector("fa-icon");
        icon.classList.toggle('icon-active');

        height = dropMenu.scrollHeight

        dropMenu.classList.toggle('drop-active')
        if (dropMenu.style.height) {
          dropMenu.style.height = null;
        } else {
          dropMenu.style.height = dropMenu.scrollHeight + "px"
        }
      })
    })

    let subDropdown = this.elem.nativeElement.querySelectorAll('.sub-dropdown')
    subDropdown.forEach(a => {
      a.addEventListener('click', () => {
        a.parentElement.style.height = height * 2 + "px"
        let dropMenu = a.querySelector('.sub-drop-menu')
        dropMenu.classList.toggle('sub-drop-active')
        let icon = a.querySelector("fa-icon");
        icon.classList.toggle('icon-active');
        if (dropMenu.style.height) {
          dropMenu.style.height = null;
          a.parentElement.style.height = height + 'px';
        } else {
          dropMenu.style.height = dropMenu.scrollHeight + "px"
        }
      })
    })
  }

}
