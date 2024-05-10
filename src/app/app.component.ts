import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'kitty-bank';

  constructor(@Inject(DOCUMENT) private readonly document: Document) { }

  ngOnInit(): void {
    this.addScript("src/assets/script/menu.js")
  }

  private addScript(src: string): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.document.head.appendChild(script)
  }
}
