import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = 'home';

  handleOnLinkClick(link: any): void {
    for(let li of link.parentNode.parentNode.children){
      if(li.children[0] === link){
        li.children[0].classList.add('active');
      } else {
        li.children[0].classList.remove('active');
      }
    }
  }
}
