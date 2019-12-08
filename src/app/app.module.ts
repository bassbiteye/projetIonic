import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService} from './service/token-interceptor.service';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { from } from 'rxjs';

@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true }
      ],
  bootstrap: [AppComponent]
})
export class AppModule {}
