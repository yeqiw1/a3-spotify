import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css'],
    standalone: false
})
export class TrackPageComponent implements OnInit {
	trackId:string = "";
	track!:TrackData;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    // Get the track ID from the URL
  	this.trackId = this.route.snapshot.paramMap.get('id') || "";

    // Fetch the track information from the server
    this.spotifyService.getTrack(this.trackId).then((data) => {
      this.track = data;
    });
  }

}

