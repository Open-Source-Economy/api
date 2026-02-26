import { z } from "zod";

export enum ProjectEcosystem {
  JVM = "JVM",
  PYTHON = "PYTHON",
  MACHINE_LEARNING = "MACHINE_LEARNING",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  JAVASCRIPT = "JAVASCRIPT",
  DOTNET = "DOTNET",
  C_CPP = "C_CPP",
  RUBY = "RUBY",
  PHP = "PHP",
  GO = "GO",
  RUST = "RUST",
}

export const projectEcosystemSchema = z.nativeEnum(ProjectEcosystem);
