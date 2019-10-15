import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})

export class AcceuilPage implements OnInit {
  pages = [
    {
      title : 'acceuil',
      url: 'acceuil/acceuil',
      icon: 'home'
    },
    {
      title : 'Cool framework',
      children : [
   {
        title : 'partenaire',
        url: 'pages/partenaire',
        icon: 'person'
    },
    {
      title : 'user',
      url: 'pages/user',
      icon: 'person'
    }
    ]
    },
  ];
 
  
  constructor() { }
   
  ngOnInit() {
    console.log(this.pages);
  }

}
