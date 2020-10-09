export class User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;

    private constructor(d: any) {
        this.login = d.login;
        this.id = d.id;
        this.node_id = d.node_id;
        this.avatar_url = d.avatar_url;
        this.gravatar_id = d.gravatar_id;
        this.url = d.url;
        this.html_url = d.html_url;
        this.followers_url = d.followers_url;
        this.following_url = d.following_url;
        this.gists_url = d.gists_url;
        this.starred_url = d.starred_url;
        this.subscriptions_url = d.subscriptions_url;
        this.organizations_url = d.organizations_url;
        this.repos_url = d.repos_url;
        this.events_url = d.events_url;
        this.received_events_url = d.received_events_url;
        this.type = d.type;
        this.site_admin = d.site_admin;
      }
}
