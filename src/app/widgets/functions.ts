import { from, isObservable, Observable, of } from "rxjs";
import { ProgressOutput } from "./types";
import {catchError, map, startWith} from "rxjs/operators"

export function attachProgress<T>(obj:Observable<T> | Promise<T> | T , value?:T):Observable<ProgressOutput<T>>{
  if(isObservable(obj)|| obj instanceof Promise){
    return (isObservable(obj) ? obj : from(obj)).pipe(
      map((v) =>({value:v})),
      startWith({loading:true, value}),
      catchError(error => of ({error, value}))
    )
  }
  return of ({value:obj, loading:false, error:null})
}
