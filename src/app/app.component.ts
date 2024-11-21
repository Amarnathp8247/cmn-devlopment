import { Component } from '@angular/core';
import { AuthServicesService } from './services/auth/auth-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cml-frontend';
  constructor(private authServices: AuthServicesService){}

  ngOnInit(): void {
    this.authServices.toggleLoader(false);
  }

}
