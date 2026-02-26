import { z } from "zod";

export enum ProjectCategory {
  // Core Building Blocks
  ProgrammingLanguage = "programming_language",
  Runtime = "runtime",

  // Application Layers
  Frontend = "frontend",
  Backend = "backend",
  Mobile = "mobile",
  Desktop = "desktop",
  Database = "database",

  // Specialized Domains
  MachineLearning = "machine_learning",
  DataProcessing = "data_processing",
  Hardware = "hardware",

  // Infrastructure & Operations
  Infrastructure = "infrastructure",
  MonitoringObservability = "monitoring_observability",

  // Communication & Integration
  ApiNetworking = "api_networking",

  // Development Ecosystem
  BuildTools = "build_tools",
  Testing = "testing",
  Documentation = "documentation",

  // Cross-cutting Concerns
  Security = "security",
  Library = "library",
}

export const projectCategorySchema = z.nativeEnum(ProjectCategory);
