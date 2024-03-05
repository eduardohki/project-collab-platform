import { validate as isValidUuid } from "uuid";
import { Project } from "./entities";
import { ProjectRepository } from "../repositories/project";

export const createProject = (
	repo: ProjectRepository,
	id: string,
	name: string,
): Project => {
	if (!isValidUuid(id)) {
		throw new Error("Project ID is not an UUID");
	}
	if (name.length === 0) {
		throw new Error("Project name must contain at least 1 character");
	}
	if (name.length > 50) {
		throw new Error("Project name must contain at most 50 characters");
	}
	return repo.insert({ id, name });
};
