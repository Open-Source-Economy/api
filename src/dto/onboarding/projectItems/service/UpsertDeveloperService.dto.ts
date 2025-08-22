import { DeveloperServiceTODOChangeName } from "../../profile";
import { DeveloperService } from "../../../../model";

export interface UpsertDeveloperServiceParams {}
export interface UpsertDeveloperServiceBody {
  developerService: DeveloperServiceTODOChangeName;
}
export interface UpsertDeveloperServiceQuery {}
export interface UpsertDeveloperServiceResponse {
  developerService: DeveloperService;
}
