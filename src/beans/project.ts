export class  Project {
    
    id:number;
    project_name:string;
    company_name:string;
    user_visit: number;

    constructor (project_name:string, company_name: string ) {
        this.project_name = project_name;
        this.company_name = company_name;
        this.user_visit = 0;
    }

    public getProjectPath() {
        return this.company_name.concat('/', this.project_name);
    }

    private getCompanyName() {
        switch(this.project_name) {
            case 'react': return "facebook";
            case 'angular': return "angular";
            case 'vue': return "vuejs";
            default: throw new Error("Invalid Project"); 
        }
    }
}

