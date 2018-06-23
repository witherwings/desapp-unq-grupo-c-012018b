import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';
import { VehicleService } from '../vehicles/vehicle.service';
import { Vehicle } from '../model/vehicle.model';
import { PublicationService } from '../publications/publication.service';
import { Publication } from '../model/publication.model';

@Component({ 
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [AuthService]
})

export class ProfileComponent implements OnInit {

    public profile:any;
    public vehicle:Vehicle;
    public modVehicle:Vehicle;
    public vehicleTypes:string[] = ['Auto', 'Moto', 'PickUp'];
    public vehicleCapacities:number[] = [2,4,6,8,10,16,24,48,60];
    public myVehicles$:Vehicle[] = [];
    public activeIdString:String = 'myVehiclesTab';
    public credits:number;
    public modifyCreditsCharge:number = 0;
    public modifyCreditsWithdraw:number = 0;
    public dateFrom:String;
    public dateTo:String;

    constructor(
        public auth: AuthService, 
        private vehicleService: VehicleService , 
        private userService:UserService,
        private ref:ChangeDetectorRef,
        private publicationService:PublicationService
    ) 
        {
        this.auth.handleAuthentication();
     }

    ngOnInit() {
        this.vehicle = new Vehicle(
            undefined,
            'Auto',
            2,
            '',
            '',
            '',
            '',
            '',
            0,
            0,
            undefined,
            '',
            '',
            '',
            ''
        ); 

        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.preparePage(this.profile);
          } else {
            this.auth.getProfile((err, profile) => {
              this.profile = profile;
              this.preparePage(profile);
            });
        }
    }

    chargeCredits() {
        this.userService.chargeCredits(this.profile.email ,this.modifyCreditsCharge)
        .subscribe(response => {
        });
    }

    withdrawCredits() {
        this.userService.withdrawCredits(this.profile.email ,this.modifyCreditsWithdraw)
        .subscribe(response => {
        });
    }

    preparePage(profile) {
       this.vehicle.ownerName = this.profile.given_name;
       this.vehicle.ownerLastName = this.profile.family_name; 
       this.vehicle.ownerEmail = this.profile.email;
        this.vehicleService.getVehiclesFromEmail(this.profile.email)
        .subscribe((vehicles: Vehicle[]) => {
            this.myVehicles$=vehicles;
        });
        this.userService.getUserByEmail(this.profile.email)
        .subscribe((user:any) => {
            this.credits = user.credits;
        });
    }

    createVehicle() {
        this.vehicleService.createVehicle(this.vehicle)
        .subscribe((vehicle:Vehicle) => { 
            this.myVehicles$.push(vehicle);
            this.activeIdString = 'myVehiclesTab';
        });
    }

    startModifying(vehicle:Vehicle) {
        this.vehicle = vehicle;
    }

    publishById(vehicleId:number) {
        const from:String[] = this.dateFrom.split('-');
        const to:String[] = this.dateTo.split('-');
        console.log(from);
        console.log(to);
        this.publicationService.publish(new Publication(
            null,
            vehicleId,
            Number(from[0]), 
            Number(from[1]), 
            Number(from[2]), 
            Number(to[0]), 
            Number(to[1]), 
            Number(to[2])) 
        ).subscribe((responsePublication:Publication) => {
            // TODO 
        });
    }

    modifyVehicle() {
        this.vehicleService.modifyVehicle(this.vehicle)
        .subscribe((vehicleResponse:Vehicle) => {
            
        })
    }

    deleteById(vehicleId:number) {
        this.vehicleService.deleteById(vehicleId)
        .subscribe(data => {

        })
    }
}
