import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PipelineSenderService {
  private apiUrl = 'ws://192.168.1.30:8765';

  constructor(private http: HttpClient) {}

  sendPipeline(json: any): Observable<any> {
    return this.http.post(this.apiUrl, json);
  }
}
