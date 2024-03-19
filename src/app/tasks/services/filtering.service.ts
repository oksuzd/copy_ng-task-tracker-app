import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilteringService {
    private _statusChange$: Subject<any> = new Subject<any>();
  readonly statusChange$: Observable<any> = this._statusChange$.asObservable();

  setStatus() {
    this._statusChange$.next(null);
  }
}
