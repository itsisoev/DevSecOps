export interface GithubRepo {
  id?: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
  };
}
