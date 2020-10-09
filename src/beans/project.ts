export default class Project {
  id: number | undefined;

  project_name: string;

  company_name: string;

  user_visit: number;

  constructor(projectName: string, companyName: string) {
    this.project_name = projectName;
    this.company_name = companyName;
    this.user_visit = 0;
  }

  public getProjectPath(): string {
    return this.company_name.concat("/", this.project_name);
  }
}
