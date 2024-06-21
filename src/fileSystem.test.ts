import { File, Folder, FileSystem, IFile, IFolder } from "./fileSystem";
import { describe, test, expect, beforeEach } from "vitest";

describe("File Class", () => {
  let parentFolder: IFolder;
  let file: IFile;

  beforeEach(() => {
    parentFolder = new Folder("Parent Folder");
    file = new File("test.txt", parentFolder, 100);
    parentFolder.contents.push(file);
    console.log(parentFolder);
  });

  test("getSize() returns correct size", () => {
    expect(file.getSize()).toBe(100);
  });

  test("path() returns correct path", () => {
    expect(file.path()).toBe("Parent Folder/test.txt");
  });
});

describe("Folder Class", () => {
  let rootFolder: IFolder;
  let subFolder: IFolder;
  let fileInSubFolder: IFile;

  beforeEach(() => {
    rootFolder = new Folder("Root");
    subFolder = new Folder("Subfolder", rootFolder);
    fileInSubFolder = new File("data.json", subFolder, 200);
    subFolder.contents.push(fileInSubFolder);
    rootFolder.contents.push(subFolder);
  });

  test("getSize() returns correct size", () => {
    expect(rootFolder.getSize()).toBe(200);
  });

  test("path() returns correct path", () => {
    expect(subFolder.path()).toBe("Root/Subfolder");
  });

  test("getContents() returns correct contents", () => {
    const contents = subFolder.getContents();
    expect(contents.length).toBe(1);
    expect(contents[0]).toBe(fileInSubFolder);
  });
});

describe("FileSystem Class", () => {
  let fileSystem: FileSystem;

  beforeEach(() => {
    fileSystem = new FileSystem("Root");
  });

  test("createFileItem() creates file correctly", () => {
    const createdFile = fileSystem.createFileItem(
      "/folder1/folder2/test.txt"
    ) as File;
    expect(createdFile.name).toBe("test.txt");
    expect(createdFile.parent?.name).toBe("folder2");
    expect(createdFile.getSize()).toBe(8); // Assuming size calculation in createFileItem logic
  });

  test("createFileItem() creates folder correctly", () => {
    const createdFolder = fileSystem.createFileItem(
      "/folder1/folder3"
    ) as Folder;
    expect(createdFolder.name).toBe("folder3");
    expect(createdFolder.parent?.name).toBe("folder1");
    expect(createdFolder.getSize()).toBe(0);
    expect(createdFolder.getContents().length).toBe(0);
  });

  test("createFileItem() handles existing items correctly", () => {
    const existingFolder = fileSystem.createFileItem("/folder1") as Folder;
    const sameFolder = fileSystem.createFileItem("/folder1") as Folder;
    expect(sameFolder).toBe(existingFolder);
  });
});
