import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { HashedUser, User, UserCreationDTO } from "../models/User";
import { GenerateTokensDTO } from "../models/Auth";
import { Observable } from "rxjs";
import jwtDecode from "jwt-decode";
import { ShoppingBasketService } from "./shopping-basket.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private BASE_URL = "http://localhost:3000";
  private AUTH = "/auth";

  private ACCESS_TOKEN = "accessToken";
  private REFRESH_TOKEN = "refreshToken";

  user: EventEmitter<User> = new EventEmitter();

  constructor(
    private httpClient: HttpClient,
    private basketService: ShoppingBasketService,
    private router: Router
  ) {
    this.user.emit(this.getUser());
  }

  getUser() {
    let item = sessionStorage.getItem(this.ACCESS_TOKEN);
    if (item) {
      let user: User = jwtDecode(item);      
      return user;
    }
    return new User();
  }

  login(user: UserCreationDTO): Observable<GenerateTokensDTO> {
    return this.httpClient.post<GenerateTokensDTO>(
      `${this.BASE_URL}${this.AUTH}/login`,
      user
    );
  }

  register(user: UserCreationDTO): Observable<GenerateTokensDTO> {
    return this.httpClient.post<GenerateTokensDTO>(
      `${this.BASE_URL}${this.AUTH}/register`,
      user
    );
  }

  logout() {
    this.router.navigate(['home']);
    this.removeTokens();
    this.basketService.removeItems();
    this.user.emit(new User());
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.accessToken,
    });
  }

  refresh(): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.refreshToken,
    });
    return this.httpClient.get<string>(`${this.BASE_URL}${this.AUTH}/refresh`, { headers: headers })
  }

  get accessToken() {
    let token = sessionStorage.getItem(this.ACCESS_TOKEN);
    return token !== null ? "Bearer " + token : "";
  }

  get refreshToken() {
    let token = sessionStorage.getItem(this.REFRESH_TOKEN);
    return token !== null ? "Bearer " + token : "";
  }

  setAccessToken(token: any) {    
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    sessionStorage.setItem(this.ACCESS_TOKEN, token.accessToken);
    
  }

  setTokens(tokens: GenerateTokensDTO) {
    sessionStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    sessionStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    this.user.emit(this.getUser());
  }

  private removeTokens() {
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    sessionStorage.removeItem(this.REFRESH_TOKEN);
    this.user.emit(this.getUser());
  }
}
