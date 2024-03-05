import { Project } from "../domain/entities";

export type ProjectRepository = {
	insert(input: Project): Project;
};

export class InMemoryProjectRepository implements ProjectRepository {
	projects: Project[];

	constructor() {
		this.projects = [];
	}

	insert = (input: Project): Project => {
		if (this.projects.find((p) => p.id === input.id)) {
			throw new Error("Project ID already in use");
		}
		this.projects = [...this.projects, input];
		return input;
	};
}
