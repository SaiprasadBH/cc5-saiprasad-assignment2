export interface IFile {
  name: string;
  size: number;
  parent: IFolder | null;
  getSize(): number;
  path(): string;
}

export interface IFolder extends IFile {
  parent: IFolder | null;
  contents: (IFile | IFolder)[];
  path(): string;
  getContents(): (IFile | IFolder)[];
}

export interface IFileSystem {
  root: IFolder;
  createFileItem(path: string): IFile | IFolder;
}

// Class representing a File, implementing IFile
export class File implements IFile {
  name: string;
  size: number = 0;
  parent: IFolder | null = null;

  constructor(name: string, parent: IFolder | null = null, size: number) {
    this.name = name;
    this.parent = parent;
    this.size = size;
  }

  // Method to get the size of the file
  getSize(): number {
    return this.size;
  }

  // Method to get the full path of the file
  path(): string {
    if (!this.parent) {
      return this.name;
    } else {
      return `${this.parent.path()}/${this.name}`;
    }
  }
}

// Class representing a Folder, implementing IFolder
export class Folder implements IFolder {
  name: string;
  size: number = 0;
  contents: (IFile | IFolder)[] = [];
  parent: IFolder | null = null;

  constructor(name: string, parent: IFolder | null = null) {
    this.name = name;
    this.parent = parent;
  }

  // Method to get the size of the folder
  getSize(): number {
    return this.contents.reduce(
      (totalSize, fileOrFolder) => totalSize + fileOrFolder.getSize(),
      0
    );
  }

  // Method to get the full path of the folder
  path(): string {
    if (!this.parent) {
      return this.name;
    } else {
      return `${this.parent.path()}/${this.name}`;
    }
  }

  // Method to get the contents of the folder
  getContents(): (IFile | IFolder)[] {
    return this.contents;
  }
}

// Class representing the FileSystem, implementing IFileSystem
export class FileSystem implements IFileSystem {
  root: IFolder;

  constructor(rootFolderName: string) {
    this.root = new Folder(rootFolderName);
  }

  // Method to create a file or folder, traverses the path and if it doesn't exist then creates the entire structure.
  createFileItem(path: string): IFile | IFolder {
    const parts = path.split("/").filter((part) => part.length > 0);
    let currentFolder: IFolder = this.root;

    for (const part of parts) {
      const isFile = /^\w+\.\w+$/.test(part);

      if (isFile) {
        const file = currentFolder.contents.find(
          (item) => item instanceof File && item.name === part
        );
        if (!file) {
          const newFile = new File(part, currentFolder, part.length);
          currentFolder.contents.push(newFile);
          return newFile;
        } else {
          return file;
        }
      } else {
        let folder = currentFolder.contents.find(
          (item) => item instanceof Folder && item.name === part
        ) as IFolder;
        if (!folder) {
          folder = new Folder(part, currentFolder);
          currentFolder.contents.push(folder);
        }
        currentFolder = folder;
      }
    }

    return currentFolder;
  }
}
