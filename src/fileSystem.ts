// Interface representing a file in the file system
export interface IFile {
  /**
   * The name of the file.
   */
  name: string;

  /**
   * The size of the file in bytes.
   */
  size: number;

  /**
   * The parent folder of the file. Null if the file is at the root level.
   */
  parent: IFolder | null;

  /**
   * Retrieves the size of the file.
   * @returns {number} The size of the file in bytes.
   */
  getSize(): number;

  /**
   * Retrieves the full path of the file within the file system.
   * @returns {string} The full path of the file.
   */
  getPath(): string;
}

// Interface representing a folder in the file system, extends IFile
export interface IFolder extends IFile {
  /**
   * The contents of the folder, which can include files and subfolders.
   */
  contents: Array<IFile | IFolder>;

  /**
   * Retrieves the full path of the folder within the file system.
   * @returns {string} The full path of the folder.
   */
  getPath(): string;

  /**
   * Retrieves the contents of the folder, including files and subfolders.
   * @returns {Array<IFile | IFolder>} An array containing the contents of the folder.
   */
  getContents(): Array<IFile | IFolder>;
}

// Interface representing the file system itself
export interface IFileSystem {
  /**
   * The root folder of the file system.
   */
  root: IFolder;

  /**
   * Creates a new file or folder at the specified path within the file system.
   * If the path already exists, returns the existing item.
   * @param {string} path - The path where the new file or folder should be created.
   * @returns {IFile | IFolder} The created file or folder, or the existing item if path already exists.
   */
  createItem(path: string): IFile | IFolder;
}

// Class representing a file
export class File implements IFile {
  /**
   * The name of the file.
   */
  name: string;

  /**
   * The size of the file in bytes.
   */
  size: number;

  /**
   * The parent folder of the file. Null if the file is at the root level.
   */
  parent: IFolder | null;

  /**
   * Creates a new instance of File.
   * @param {string} name - The name of the file.
   * @param {number} size - The size of the file in bytes.
   * @param {IFolder | null} parent - The parent folder of the file. Defaults to null if not provided.
   */
  constructor(name: string, size: number, parent: IFolder | null = null) {
    this.name = name;
    this.size = size;
    this.parent = parent;
    if (this.parent) {
      this.parent.contents.push(this);
    }
  }

  /**
   * Retrieves the size of the file.
   * @returns {number} The size of the file in bytes.
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Retrieves the full path of the file within the file system.
   * @returns {string} The full path of the file.
   */
  getPath(): string {
    return this.parent ? `${this.parent.getPath()}/${this.name}` : this.name;
  }
}

// Class representing a folder, extends File (because a folder is also a type of file)
export class Folder extends File implements IFolder {
  /**
   * The contents of the folder, which can include files and subfolders.
   */
  contents: Array<IFile | IFolder>;

  /**
   * Creates a new instance of Folder.
   * @param {string} name - The name of the folder.
   * @param {IFolder | null} parent - The parent folder of the folder. Defaults to null if not provided.
   */
  constructor(name: string, parent: IFolder | null = null) {
    super(name, 0, parent); // Size of folder is initially set to 0
    this.contents = [];
  }

  /**
   * Retrieves the size of the folder by summing up the sizes of all its contents.
   * @returns {number} The size of the folder in bytes.
   */
  getSize(): number {
    return this.contents.reduce((total, item) => total + item.getSize(), 0);
  }

  /**
   * Retrieves the full path of the folder within the file system.
   * @returns {string} The full path of the folder.
   */
  getPath(): string {
    return this.parent ? `${this.parent.getPath()}/${this.name}` : this.name;
  }

  /**
   * Retrieves the contents of the folder, including files and subfolders.
   * @returns {Array<IFile | IFolder>} An array containing the contents of the folder.
   */
  getContents(): Array<IFile | IFolder> {
    return this.contents;
  }
}

// Class representing the entire file system
export class FileSystem implements IFileSystem {
  /**
   * The root folder of the file system.
   */
  root: IFolder;

  /**
   * Creates a new instance of FileSystem with a root folder.
   * @param {string} rootName - The name of the root folder of the file system.
   */
  constructor(rootName: string) {
    this.root = new Folder(rootName);
  }

  /**
   * Creates a new file or folder at the specified path within the file system.
   * If the path already exists, returns the existing item.
   * @param {string} path - The path where the new file or folder should be created.
   * @returns {IFile | IFolder} The created file or folder, or the existing item if path already exists.
   */
  createItem(path: string): IFile | IFolder {
    const segments = path.split("/").filter((segment) => segment.length > 0);
    let currentDir: IFolder = this.root;

    for (const segment of segments) {
      const isFile = /\.\w+$/.test(segment);

      if (isFile) {
        let file = currentDir.contents.find(
          (item) => item instanceof File && item.name === segment
        ) as IFile;

        if (!file) {
          file = new File(segment, segment.length, currentDir);
        }
        return file;
      } else {
        let folder = currentDir.contents.find(
          (item) => item instanceof Folder && item.name === segment
        ) as IFolder;

        if (!folder) {
          folder = new Folder(segment, currentDir);
        }
        currentDir = folder;
      }
    }
    return currentDir;
  }
}
