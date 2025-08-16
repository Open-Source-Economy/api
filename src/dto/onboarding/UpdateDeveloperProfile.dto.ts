export interface UpdateDeveloperProfileDto {
  // TODO: lauriane can not update with nulls values
  name?: string;
  email?: string;
  agreedToTerms?: boolean;
  onboardingCompleted?: boolean;
}
