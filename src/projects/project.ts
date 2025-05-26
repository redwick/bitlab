export class Project {
  video: string;
  video_thumb: string;
  title: string;
  subtitle: string;
  technologies: string[];
  description: string[];
  additional: Project | undefined;
  additional_menu: string[] = [];

  constructor(video: string, video_thumb: string, title: string, subtitle: string, technologies: string[], description: string[], additional: Project | undefined = undefined, additional_menu: string[] = []) {
    this.video = video;
    this.video_thumb = video_thumb;
    this.title = title;
    this.subtitle = subtitle;
    this.technologies = technologies;
    this.description = description;
    this.additional = additional;
    this.additional_menu = additional_menu;
  }
}
