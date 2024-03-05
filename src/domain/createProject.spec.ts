import { describe, expect, it } from "vitest";
import { createProject } from "./createProject";
import { InMemoryProjectRepository } from "../repositories/project";

describe("createProject", () => {
	it("should return an error if the ID format is invalid", () => {
		const repo = new InMemoryProjectRepository();
		expect(() => {
			createProject(repo, "an invalid id", "my project name");
		}).toThrowError(/Project ID is not an UUID/);
	});
	it("should not allow empty project name", () => {
		const repo = new InMemoryProjectRepository();
		expect(() => {
			createProject(repo, "9fa98a0a-c2a5-4f1e-bcf9-0a60ec7a65c2", "");
		}).toThrowError(/Project name must contain at least 1 character/);
	});
	it("should not allow project name with more than 50 characters", () => {
		const repo = new InMemoryProjectRepository();
		expect(() => {
			createProject(
				repo,
				"9fa98a0a-c2a5-4f1e-bcf9-0a60ec7a65c2",
				"This project name is too long, it should definitely fail",
			);
		}).toThrowError(/Project name must contain at most 50 characters/);
	});
	it("should create a new project with the given id and name", () => {
		const repo = new InMemoryProjectRepository();
		expect(
			createProject(repo, "9fa98a0a-c2a5-4f1e-bcf9-0a60ec7a65c2", "my project"),
		).toStrictEqual({
			id: "9fa98a0a-c2a5-4f1e-bcf9-0a60ec7a65c2",
			name: "my project",
		});
	});
	it("should not create a project with a non-unique ID", () => {
		const repo = new InMemoryProjectRepository();
		const projectId = "9fa98a0a-c2a5-4f1e-bcf9-0a60ec7a65c2";
		repo.insert({ id: projectId, name: "my project name" });
		expect(() => {
			createProject(repo, projectId, "my other project name");
		}).toThrowError(/Project ID already in use/);
	});
});
