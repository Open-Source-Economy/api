export enum ServiceType {
  SUPPORT = "support",
  DEVELOPMENT = "development",
  // OPERATION = "operation",
  ADVISORY = "advisory",
  SECURITY_AND_COMPLIANCE = "security_and_compliance",
  CUSTOM = "custom",
}

export enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical",
}

export enum SupportSubServiceType {
  BUG_FIXES = "Bug Fixes",
  NEW_FEATURES = "New Features",
  CODE_MAINTENANCE = "Code Maintenance",
}

export enum DevelopmentSubServiceType {
  TECHNICAL_ASSISTANCE = "Technical Assistance",
  DEPLOYMENT_GUIDANCE = "Deployment Guidance",
  CUSTOMER_SUPPORT = "Customer Support",
}

export enum SecurityAndComplianceSubServiceType {
  INCIDENT_RESPONSE = "Incident Response",
  PROACTIVE_MAINTENANCE = "Proactive Monitoring",
  SUPERVISION = "24/7 Supervision",
}

export enum AdvisorySubServiceType {
  ARCHITECTURE_DESIGN = "Architecture Design",
  TECHNOLOGY_ASSESSMENT = "Technology Assessment",
  SECURITY_PERFORMANCE = "Security & Performance",
}
