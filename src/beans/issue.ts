import { User } from "./user";

export class Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: User;
    labels: any[];
    state: string;
    locked: boolean;
    assignee?: any;
    assignees: any[];
    milestone?: any;
    comments: number;
    created_at: Date;
    updated_at: Date;
    closed_at?: any;
    author_association: string;
    active_lock_reason?: any;
    body: string;
    performed_via_github_app?: any;

    private constructor(d: any) {
        this.url = d.url;
        this.repository_url = d.repository_url;
        this.labels_url = d.labels_url;
        this.comments_url = d.comments_url;
        this.events_url = d.events_url;
        this.html_url = d.html_url;
        this.id = d.id;
        this.node_id = d.node_id;
        this.number = d.number;
        this.title = d.title;
        this.user = d.user;
        this.labels = d.labels;
        this.state = d.state;
        this.locked = d.locked;
        this.assignee = d.assignee;
        this.assignees = d.assignees;
        this.milestone = d.milestone;
        this.comments = d.comments;
        this.created_at = d.created_at;
        this.updated_at = d.updated_at;
        this.closed_at = d.closed_at;
        this.author_association = d.author_association;
        this.active_lock_reason = d.active_lock_reason;
        this.body = d.body;
        this.performed_via_github_app = d.performed_via_github_app;
      }
    
}