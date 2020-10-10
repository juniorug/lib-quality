export default class Project {
  id: number | undefined;

  project_name: string;

  company_name: string;

  full_name: string;

  open_issues_count: number;

  avg_opened_issues: number;

  user_visit: number;

  constructor(projectName: string, companyName: string, fullName: string) {
    this.project_name = projectName;
    this.company_name = companyName;
    this.full_name = fullName;
    this.user_visit = 0;
    this.open_issues_count = 0;
    this.avg_opened_issues = 0;
  }
}
