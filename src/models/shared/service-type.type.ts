import { z } from "zod";

export enum ServiceType {
  SUPPORT = "support",
  DEVELOPMENT = "development",
  ADVISORY = "advisory",
  SECURITY_AND_COMPLIANCE = "security_and_compliance",
  CUSTOM = "custom",
}

export const serviceTypeSchema = z.nativeEnum(ServiceType);

export enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical",
}

export const prioritySchema = z.nativeEnum(Priority);

export enum SupportSubServiceType {
  BUG_FIXES = "Bug Fixes",
  NEW_FEATURES = "New Features",
  CODE_MAINTENANCE = "Code Maintenance",
}

export const supportSubServiceTypeSchema = z.nativeEnum(SupportSubServiceType);

export enum DevelopmentSubServiceType {
  TECHNICAL_ASSISTANCE = "Technical Assistance",
  DEPLOYMENT_GUIDANCE = "Deployment Guidance",
  CUSTOMER_SUPPORT = "Customer Support",
}

export const developmentSubServiceTypeSchema = z.nativeEnum(DevelopmentSubServiceType);

export enum SecurityAndComplianceSubServiceType {
  INCIDENT_RESPONSE = "Incident Response",
  PROACTIVE_MAINTENANCE = "Proactive Monitoring",
  SUPERVISION = "24/7 Supervision",
}

export const securityAndComplianceSubServiceTypeSchema = z.nativeEnum(SecurityAndComplianceSubServiceType);

export enum AdvisorySubServiceType {
  ARCHITECTURE_DESIGN = "Architecture Design",
  TECHNOLOGY_ASSESSMENT = "Technology Assessment",
  SECURITY_PERFORMANCE = "Security & Performance",
}

export const advisorySubServiceTypeSchema = z.nativeEnum(AdvisorySubServiceType);
