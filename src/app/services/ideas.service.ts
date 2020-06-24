import { Injectable } from '@angular/core';
import {Idea} from '../models/idea.model';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {LoginResponse} from '../models/loginresponse.model';


@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  apiUrl = 'https://small-project-api.herokuapp.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Access-Token': localStorage.getItem('jwt')
    })
  };

  constructor(private httpClient: HttpClient) { this.getIdeas(); }

  getIdeas(){
    return this.httpClient.get<Idea[]>(this.apiUrl + '/ideas?page=1', this.httpOptions);
  }
  updateIdea(updatedIdea: Idea){
    return this.httpClient.put<Idea>(this.apiUrl + '/ideas/' + updatedIdea.id,
      { content: updatedIdea.content, impact: updatedIdea.impact, ease: updatedIdea.ease,
        confidence: updatedIdea.confidence }, this.httpOptions);
  }
  deleteIdea(ideaID: string){
    return this.httpClient.delete<any>(this.apiUrl + '/ideas/' + ideaID, this.httpOptions);
  }
  createIdea(newIdea: Idea){
    return this.httpClient.post<Idea>(this.apiUrl + '/ideas/',
      { content: newIdea.content, impact: newIdea.impact, ease: newIdea.ease, confidence: newIdea.confidence }, this.httpOptions);
  }
}
