export class Project {
  video: string;
  video_thumb: string;
  title: string;
  subtitle: string;
  technologies: string[];
  description: string[];
  additional: Project | undefined;

  constructor(video: string, video_thumb: string, title: string, subtitle: string, technologies: string[], description: string[], additional: Project | undefined = undefined) {
    this.video = video;
    this.video_thumb = video_thumb;
    this.title = title;
    this.subtitle = subtitle;
    this.technologies = technologies;
    this.description = description;
    this.additional = additional;
  }
}
