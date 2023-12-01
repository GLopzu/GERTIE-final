
import { Video } from "../types/video";
import { videos } from "./videoStorage";

let selectedVideo: Video | null = null;
let availableVideos: Video[] = [...videos];

function getRandomIndex(): number {
  return Math.floor(Math.random() * availableVideos.length);
}

export function getRandomVideo(): Video {
  if (availableVideos.length === 0) {
    availableVideos = [...videos];
  }

  const randomIndex = getRandomIndex();
  const randomVideo = availableVideos.splice(randomIndex, 1)[0];

  selectedVideo = randomVideo;

  return randomVideo;
}

export function getSelectedVideo(): Video | null {
  return selectedVideo;
}

export function setSelectedVideo(video: Video): void {
  selectedVideo = video;
}