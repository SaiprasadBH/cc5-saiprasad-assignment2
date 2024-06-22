import { File, Folder, FileSystem, IFile, IFolder } from "./fileSystem";
import { describe, test, expect, beforeEach } from "vitest";

describe("File Class", () => {
  let parentFolder: IFolder;
  let file: IFile;

  beforeEach(() => {
    parentFolder = new Folder("Parent Folder");
    file = new File("test.txt", 100, parentFolder);
  });

  test("getSize() returns correct size", () => {
    expect(file.getSize()).toBe(100);
  });

  test("getPath() returns correct path", () => {
    expect(file.getPath()).toBe("Parent Folder/test.txt");
  });
});

describe("Folder Class", () => {
  let rootFolder: IFolder;
  let subFolder: IFolder;
  let fileInSubFolder: IFile;

  beforeEach(() => {
    rootFolder = new Folder("Root");
    subFolder = new Folder("Subfolder", rootFolder);
    fileInSubFolder = new File("data.json", 200, subFolder);
  });

  test("getSize() returns correct size", () => {
    expect(rootFolder.getSize()).toBe(200);
  });

  test("getPath() returns correct path", () => {
    expect(subFolder.getPath()).toBe("Root/Subfolder");
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

  test("createItem() creates file correctly", () => {
    const createdFile = fileSystem.createItem(
      "/folder1/folder2/test.txt"
    ) as File;
    expect(createdFile.name).toBe("test.txt");
    expect(createdFile.parent?.name).toBe("folder2");
    expect(createdFile.getSize()).toBe(8);
  });

  test("createItem() creates folder correctly", () => {
    const createdFolder = fileSystem.createItem("/folder1/folder3") as Folder;
    expect(createdFolder.name).toBe("folder3");
    expect(createdFolder.parent?.name).toBe("folder1");
    expect(createdFolder.getSize()).toBe(0);
    expect(createdFolder.getContents().length).toBe(0);
  });

  test("createItem() handles existing items correctly", () => {
    const existingFolder = fileSystem.createItem("/folder1") as Folder;
    const sameFolder = fileSystem.createItem("/folder1") as Folder;
    expect(sameFolder).toBe(existingFolder);
  });
});
