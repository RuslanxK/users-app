import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private http: HttpClient) {}

  getAllUsers = () => {
    return this.http.get('https://users-app-2.herokuapp.com/api/users');
  };

  getUser = (id: any) => {
    return this.http.get('https://users-app-2.herokuapp.com/api/users/' + id);
  };

  addUser = (obj: User) => {
    return this.http.post('https://users-app-2.herokuapp.com/api/users', obj);
  };

  updateUser = (id: any, obj: User) => {
    return this.http.put('https://users-app-2.herokuapp.com/api/users/' + id, obj);
  };

  deleteUser = (id: any) => {
    return this.http.delete('https://users-app-2.herokuapp.com/api/users/' + id);
  };
}
