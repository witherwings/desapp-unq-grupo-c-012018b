import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../users/user.service';
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers: [AuthService]
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    private profile: any;

    constructor(
        public location: Location, 
        private element : ElementRef, 
        public auth: AuthService,
        private userService: UserService,
        private translate: TranslateService)

    {
        this.sidebarVisible = false;
        this.auth.handleAuthentication();
    }

    userLogIn(prof: any) {
        this.userService.userLogIn({
            userId: null,
            cuil: null,
            lastName: prof.family_name,
            firstName: prof.given_name,
            adress: prof.address,
            email: prof.email,
            rating: null,
            credits: null
        },
        this.auth)
        .subscribe((data) => {

        })
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.userLogIn(this.profile);
          } else {
            this.auth.getProfile((err, profile) => {
              this.profile = profile;
              this.userLogIn(this.profile);
            });
          }

      
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    };
    switchLanguage(lang){
        this.translate.use(lang);
    }

}
