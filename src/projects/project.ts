export class Project {
  video: string;
  video_thumb: string;
  title: string;
  subtitle: string;
  technologies: string[];
  description: string[];

  constructor(video: string, video_thumb: string, title: string, subtitle: string, technologies: string[], description: string[]) {
    this.video = video;
    this.video_thumb = video_thumb;
    this.title = title;
    this.subtitle = subtitle;
    this.technologies = technologies;
    this.description = description;
  }
}
