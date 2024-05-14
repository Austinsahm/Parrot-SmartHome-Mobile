import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/model/user';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() back = false;
  // @Input() user: UserInfo;
  user$: Observable<UserInfo>;

  constructor(private session: SessionService, private router: Router) {}

  ngOnInit() {
    this.user$ = this.session.user$;
  }

  logOut() {
    this.session.deleteStorage().subscribe();
    this.router.navigate(['/login']);
    // console.log('Logout');
  }

  settings(){
    this.router.navigate(['/settings']);
    console.log('Settings');
  }
}
