export interface RecipeModel {
  name: string;
  description: string;
  imagePath: string;
}
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
