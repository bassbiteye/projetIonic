import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

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
 
  
  constructor(private menu: MenuController) { }
  ngOnInit(){
  }

 
}
