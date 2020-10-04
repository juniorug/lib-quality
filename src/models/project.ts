export class  Project {
    
    project_name:string;
    project_id:number;
    company_name:string;
    user_visit: number;

    constructor (project_name:string ) {
        this.project_name   = project_name;
        this.company_name    = this.getCompanyName();
        this.user_visit = 0;
    }

    getProjectPath() {
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

