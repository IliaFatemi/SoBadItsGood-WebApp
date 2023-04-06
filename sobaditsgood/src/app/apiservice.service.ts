import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {
  BaseUrl:string = "http://34.72.53.185/sobaditsgood/api" // public api URL
  localBaseUrl:string = "http://localhost:3000/sobaditsgood/api" // for local testing purposes 
  users?:user[]=[]

  // For retrieving images from the Movie Database
  base_urlMDB:string = "http://image.tmdb.org/t/p/"
  file_size:string = "original"
  
  // Test list of movie IDs
  topPicksIds = [314, 71880, 536869, 20196, 17473, 347626, 55563, 378236, 40016, 24528, 8966, 22345]
  popularIds:number[] = [];
  watchLaterIds:number[] = [];
  favoriteIds:number[] = [];
  searchIds: number[] =[];

  constructor(private http: HttpClient) { }

  getAll(){
     this.http.get(this.BaseUrl+`/getAll`).subscribe((data:any)=>{
       for(var i=0;i<data.length;i++){
         this.users?.push(new user(data[i].userid,data[i].fname,data[i].lname,data[i].username,data[i].email,data[i].password))
       }
     });
     return  this.users
  }
  // for testing purposes
  getData(){
    return this.http.get(this.BaseUrl, {responseType: 'text'});
  }

  getCurrentUserInfo(){
    return this.http.get(this.BaseUrl+`/getCurrentUserInfo`, {responseType:'json'})
  }

  getUserInfo(username:string){
    return this.http.get(this.BaseUrl+`/getUserInfo/${username}`, {responseType:'json'})
  }
  updateUserInfo(user:user){
    return this.http.post(this.BaseUrl+`/updateInfo/`, user, { responseType: 'text' })
  }
  //check if the user login is correct
  isUserValid(username:string, password:string){
    return this.http.get(this.BaseUrl+`/isUserValid/${username}/${password}`, {responseType:'text'})
  }

  //add user to the database
  registerUser(user:any){
    return this.http.post(this.BaseUrl+`/registerUser/`, user, { responseType: 'text' })
  }

  //check if the username is in the database or not
  userExists(username:string){
    return this.http.get(this.BaseUrl+`/userExists/${username}`, {responseType: 'json'})
  }

  inInSession(){
    return this.http.get(this.BaseUrl+'/isInSession', {responseType:'json', withCredentials: true})
  }

  login(data:any){
    return this.http.post(this.BaseUrl+'/login', data , {responseType: 'text', withCredentials: true})
  }

  logout(){
    return this.http.get(this.BaseUrl+'/logout', {responseType: 'text', withCredentials: true})
  }

  //add to favourite
  addFavMovie(movieId:string){
    return this.http.get(this.BaseUrl+`/addfavourite/${movieId}`, {responseType:'text'})
  }

  //Check if movie has been favourited
  isFave(movieid:string){
    return this.http.get(this.BaseUrl+`/isFav/${movieid}`, {responseType:'json'})
  }

  //remove from favourite
  unFavMovie(movieid:string){
    return this.http.get(this.BaseUrl+`/removefavourite/${movieid}`, {responseType:'text'})
  }

  getFav(username:string){
    return this.http.get(this.BaseUrl+`/getfavMovies/${username}`, {responseType:'json'})
  }

  getWatchedMovies(username:string){
    return this.http.get(this.BaseUrl+`/getWatchedMovies/${username}`, {responseType:'json'})
  }

  getWatchlistedMovies(username:string){
    return this.http.get(this.BaseUrl+`/getWatchlistedMovies/${username}`, {responseType:'json'})
  }

  //if user watched the movie
  iswatched(movieid:string){
    return this.http.get(this.BaseUrl+`/watched/${movieid}`, {responseType:'json'})
  }

  //add to watched movies
  addwatched(movieid:string){
    return this.http.get(this.BaseUrl+`/addwatched/${movieid}`, {responseType:'text'})
  }

  //remove from watched movies
  removeWatched(movieid:string){
    return this.http.get(this.BaseUrl+`/removewatched/${movieid}`, {responseType:'text'})
  }

  //if user watch listed the movie
  isWatchlisted(movieid:string){
    return this.http.get(this.BaseUrl+`/watchlisted/${movieid}`, {responseType:'json'})
  }

  //add movie to watchlist
  addToWatchlist(movieid:string){
    return this.http.get(this.BaseUrl+`/addtowatchlist/${movieid}`, {responseType:'text'})
  }

  removeFromWatchlist(movieid:string){
    return this.http.get(this.BaseUrl+`/removedwatchlist/${movieid}`, {responseType:'text'})
  }

  isFollowing(userid:number, followingUsername:string){
    return this.http.get(this.BaseUrl+`/isFollowing/${userid}/${followingUsername}`, {responseType:'json'})
  }

  followUser(userid:number, followingUsername:string){
    return this.http.get(this.BaseUrl+`/followUser/${userid}/${followingUsername}`, {responseType:'text'})
  }

  unfollowUser(userid:number, unfollowUsername:string){
    return this.http.get(this.BaseUrl+`/unfollowUser/${userid}/${unfollowUsername}`, {responseType:'text'})
  }

  getNumFollowing(username:string){
    return this.http.get(this.BaseUrl+`/getNumFollowing/${username}`, {responseType:'json'})
  }

  getNumFollowers(username:string){
    return this.http.get(this.BaseUrl+`/getNumFollowers/${username}`, {responseType:'json'})
  }

  getFollowingInfo(username:string){
    return this.http.get(this.BaseUrl+`/getFollowingInfo/${username}`, {responseType:'json'})
  }

  getFollowerInfo(username:string){
    return this.http.get(this.BaseUrl+`/getFollowerInfo/${username}`, {responseType:'json'})
  }

  searchForAMovie(id: string) {
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=ecd28fb4488e17f072d95ad0278f2545'+'&language=en-US&page=1&include_adult=false&query=' +id.toString(), {responseType: 'json'});
  }
  getMovies(search: string) {
    this.searchIds = [];
    this.http.get(this.BaseUrl+`/getMovies/${search}`, {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        console.log(movies[i].movieid)
        this.searchIds.push(movies[i].movieid);
      }
    })
    return this.searchIds;
  }

  // Returns movie details corresponding to the id
  searchMovie(id: number) {
    return this.http.get('https://api.themoviedb.org/3/movie/'+id.toString()+'?api_key=ecd28fb4488e17f072d95ad0278f2545', {responseType: 'text'});
  }

  // Returns the movie's credits (cast + crew)
  getCredits(id: number) {
    return this.http.get('https://api.themoviedb.org/3/movie/'+id.toString()+"/credits"+'?api_key=ecd28fb4488e17f072d95ad0278f2545', {responseType: 'text'});
  }

  getTopPicks() {
    return this.topPicksIds;
  }

  getPopular() {
    this.popularIds = [];
    this.http.get(this.BaseUrl+'/getPopular', {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        console.log(movies[i].movieid)
        this.popularIds.push(movies[i].movieid);
      }
    })
    return this.popularIds;
  }

  getWatchLater() {
    this.watchLaterIds = [];
    this.http.get(this.BaseUrl+'/getWatchlist', {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        console.log(movies[i].movieid)
        this.watchLaterIds.push(movies[i].movieid);
      }
    })
    return this.watchLaterIds;
  }

  getFavorites() {
    this.favoriteIds = [];
    this.http.get(this.BaseUrl+'/getFavourites', {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        console.log(movies[i].movieid)
        this.favoriteIds.push(movies[i].movieid);
      }
    })
    return this.favoriteIds;
  }

  getPoster(poster_path:string) {
    return (this.base_urlMDB + this.file_size + poster_path)
  }

  //check if the reviews is in the database or not
  getReviews(movieId:number){
    return this.http.get(this.BaseUrl+`/getReviews/${movieId}`, {responseType: 'json'})
  }
  //check if the username is in the database or not
  addReview(review:any){
    return this.http.post(this.BaseUrl+`/addReview/`, review, { responseType: 'text' })
  }
}