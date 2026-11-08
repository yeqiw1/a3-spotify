import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://127.0.0.1:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    // Send a GET request to the Express server
    var uri:string = this.expressBaseUrl + endpoint;

    // Convert the HTTP response into a Promise
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    // Get the user's profile information
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    // Search for artists, albums, or tracks
    return this.sendRequestToExpress('/search/' + category + '/' + encodeURIComponent(resource)).then((data) => {
      // Convert the search results into the correct data type
      if (category === 'artist') {
        return data.artists.items.map((artist:any) => new ArtistData(artist));
      } else if (category === 'album') {
        return data.albums.items.map((album:any) => new AlbumData(album));
      } else if (category === 'track') {
        return data.tracks.items.map((track:any) => new TrackData(track));
      }
      return [];
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    // Get information about an artist
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId)).then((data) => {
      return new ArtistData(data);
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    // Get the artist's top tracks
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId)).then((data) => {
      return data.tracks.map((track:any) => new TrackData(track));
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    // Get albums by the artist
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId)).then((data) => {
      return data.items.map((album:any) => new AlbumData(album));
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    // Get information about an album
    return this.sendRequestToExpress('/album/' + encodeURIComponent(albumId)).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    // Get all tracks on an album
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId)).then((data) => {
      return data.items.map((track:any) => new TrackData(track));
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    // Get information about a track
    return this.sendRequestToExpress('/track/' + encodeURIComponent(trackId)).then((data) => {
      return new TrackData(data);
    });
  }
}
