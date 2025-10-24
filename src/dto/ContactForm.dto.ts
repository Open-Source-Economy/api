export interface ContactFormParams {}

export interface ContactFormBody {
  name: string;
  email: string;
  company: string;
  linkedinProfile: string;
  githubProfile?: string;
  contactReason: string;
  projects?: Array<{
    url: string;
    role?: string;
  }>;
  requestMeeting: boolean;
  meetingNotes?: string;
  subject: string;
  message: string;
}

export interface ContactFormQuery {}

export interface ContactFormResponse {}
