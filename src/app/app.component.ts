import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingCtl: LoadingController
  ) {
    this.initializeApp();
  }
  async presentLoading() {
    const loading = await this.loadingCtl.create({
      message: 'please wait',
      duration: 2000
    });
    await loading.present();
  
    await loading.onDidDismiss();
  
    console.log('Loading dismissed!');
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.presentLoading();
    });
  }
}
