export interface UserProfileData {
  id: number;
  username: string;
  emails?: { value: string }[];
  photos?: { value: string }[];
}
