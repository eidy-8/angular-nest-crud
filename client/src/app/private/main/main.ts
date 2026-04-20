import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
