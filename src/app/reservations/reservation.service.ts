import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Reservation } from "../model/reservation.model";

@Injectable()
export class ReservationService {
    URL = 'http://localhost:8080/main/webservices/reservations';

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    }

    constructor(private http:HttpClient) {

    }

    getReservations(pubId:number):Observable<Reservation[]> {
        return this.http.get<Reservation[]>(
            this.URL + '/reservationsof/' + pubId,
            this.httpOptions
        );
    }

    getMyReservationOf(userEmail:string, pubId:number):Observable<Reservation> {
        return this.http.get<Reservation>(
            this.URL + '/myreservationof/' + userEmail + '/' + pubId,
            this.httpOptions
        )
    }

    book(reservation:Reservation):Observable<Reservation> {
        return this.http.post<Reservation>(
            this.URL,
            reservation,
            this.httpOptions
        );
    }

    accept(reservation:Reservation):Observable<boolean> {
        return this.http.post<boolean>(
            this.URL + '/accept/' + reservation.reservationId,
            this.httpOptions
        )
    }

    decline(reservation:Reservation):Observable<boolean> {
        return this.http.post<boolean>(
            this.URL + '/decline/' + reservation.reservationId,
            this.httpOptions
        )
    }

    retireVehicle(reservation:Reservation):Observable<Reservation> {
        return this.http.put<Reservation>(
            this.URL + '/retire/' + reservation.reservationId,
            this.httpOptions
        );
    }

    acceptRetire(reservation:Reservation):Observable<Reservation> {
        return this.http.put<Reservation>(
            this.URL + '/acceptretire/' + reservation.reservationId,
            this.httpOptions
        )
    }

    returnVehicle(reservation:Reservation):Observable<Reservation> {
        return this.http.put<Reservation>(
            this.URL + '/return/' + reservation.reservationId,
            this.httpOptions
        )
    }

    acceptReturn(reservation:Reservation):Observable<Reservation> {
        return this.http.put<Reservation>(
            this.URL + '/acceptreturn/' + reservation.reservationId,
            this.httpOptions 
        )
    }
}