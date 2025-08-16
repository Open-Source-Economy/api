export interface CreateDeveloperProfileDto {
  name: string;
  email: string;
  agreedToTerms: boolean; // TODO: lauriane where do we store that?
}
