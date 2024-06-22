import assert from "assert";

/**
 * Represents a single node in the linked list.
 */
export interface INode<T> {
  data: T;
  nextNode: INode<T> | null;
}

/**
 * Represents the linked list data structure.
 */
export interface ILinkedList<T> {
  firstNode: INode<T> | null;
  lastNode: INode<T> | null;

  /**
   * Adds a new node with the given data to the end of the linked list.
   * @param {T} data - The data to be added to the linked list.
   * @returns {INode<T>} - The newly added node.
   * @throws {AssertionError} - If the data is null.
   */
  addData(data: T): INode<T>;

  /**
   * Converts the linked list into an array of its data elements.
   * @returns {T[]} - An array containing the data elements of the linked list.
   * @throws {AssertionError} - If the linked list is empty.
   */
  toArray(): T[];

  /**
   * Removes the last node from the linked list and returns its data.
   * @returns {T | null} - The data of the removed node, or null if the list is empty.
   * @throws {AssertionError} - If the linked list is empty.
   */
  removeLastNode(): T | null;

  /**
   * Removes a specified node from the linked list and returns its data.
   * @param {INode<T>} nodeToRemove - The node to be removed from the linked list.
   * @returns {T | null} - The data of the removed node, or null if the node was not found.
   * @throws {AssertionError} - If the linked list is empty or the node to remove is undefined.
   */
  removeNode(nodeToRemove: INode<T>): T | null;

  /**
   * Inserts new data after a specified existing node in the linked list.
   * @param {INode<T>} existingNode - The node after which new data should be inserted.
   * @param {T} data - The data to be inserted into the linked list.
   * @returns {INode<T> | null} - The newly inserted node, or null if the existing node was not found.
   * @throws {AssertionError} - If the position of the existing node or the data to be added is not defined.
   */
  insertAfter(existingNode: INode<T>, data: T): INode<T> | null;

  /**
   * Inserts new data before a specified existing node in the linked list.
   * @param {INode<T>} existingNode - The node before which new data should be inserted.
   * @param {T} data - The data to be inserted into the linked list.
   * @returns {INode<T> | null} - The newly inserted node, or null if the existing node was not found.
   * @throws {AssertionError} - If the position of the existing node or the data to be added is not defined.
   */
  insertBefore(existingNode: INode<T>, data: T): INode<T> | null;

  /**
   * Returns the number of nodes in the linked list.
   * @returns {number} - The number of nodes in the linked list.
   */
  listLength(): number;

  /**
   * Executes a provided function once for each node in the linked list.
   * @param {(node: INode<T>) => void} visit - A function to execute on each node in the linked list.
   */
  traverse(visit: (node: INode<T>) => void): void;

  /**
   * Filters nodes in the linked list based on a predicate function.
   * @param {(data: T) => boolean} predicate - A predicate function used to filter nodes based on their data.
   * @returns {T[]} - An array containing the data of nodes that satisfy the predicate.
   * @throws {AssertionError} - If the linked list is empty.
   */
  filter(predicate: (data: T) => boolean): T[];
}

/**
 * Represents a single node in the linked list.
 */
export class Node<T> implements INode<T> {
  data: T;
  nextNode: INode<T> | null;

  /**
   * Creates a new node with the given data.
   * @param {T} data - The data to be stored in the node.
   */
  constructor(data: T) {
    this.data = data;
    this.nextNode = null;
  }
}

/**
 * Represents a linked list data structure.
 */
export default class LinkedList<T> implements ILinkedList<T> {
  firstNode: INode<T> | null = null;
  lastNode: INode<T> | null = null;

  /**
   * Initializes the linked list based on provided data.
   * @param {T[] | ILinkedList<T>} data - Either an array of initial data or another linked list to initialize from.
   * @throws {AssertionError} - If the data is not an array or a linked list.
   */
  constructor(data?: T[] | ILinkedList<T>) {
    if (data !== undefined) {
      assert(
        Array.isArray(data) || this.isLinkedList(data),
        "The argument must be an array or a LinkedList"
      );

      if (Array.isArray(data)) {
        for (let i = data.length - 1; i >= 0; i--) {
          const newNode = new Node(data[i]);
          newNode.nextNode = this.firstNode;
          this.firstNode = newNode;
          if (this.lastNode === null) {
            this.lastNode = newNode;
          }
        }
      } else {
        let currentNode: INode<T> | null = (data as ILinkedList<T>).firstNode;
        while (currentNode !== null) {
          const newNode = new Node(currentNode.data);
          if (this.firstNode === null) {
            this.firstNode = newNode;
            this.lastNode = newNode;
          } else {
            this.lastNode!.nextNode = newNode; // Ensure lastNode is not null
            this.lastNode = newNode;
          }
          currentNode = currentNode.nextNode;
        }
      }
    }
  }

  /**
   * Checks if the provided data is an instance of a linked list.
   * @param {unknown} data - The data to check.
   * @returns {boolean} - True if the data is a linked list, false otherwise.
   */
  private isLinkedList(data: unknown): data is ILinkedList<T> {
    return (data as ILinkedList<T>).addData !== undefined;
  }

  /**
   * Adds a new node with the given data to the end of the linked list.
   * @param {T} data - The data to be added to the linked list.
   * @returns {INode<T>} - The newly added node.
   * @throws {AssertionError} - If the data is null.
   */
  addData(data: T): INode<T> {
    assert(data !== null, "Data should not be empty");
    const newNode = new Node(data);
    if (this.firstNode === null) {
      this.firstNode = newNode;
      this.lastNode = newNode;
    } else {
      this.lastNode!.nextNode = newNode; // Asserting here since we check firstNode
      this.lastNode = newNode;
    }
    return newNode;
  }

  /**
   * Converts the linked list into an array of its data elements.
   * @returns {T[]} - An array containing the data elements of the linked list.
   * @throws {AssertionError} - If the linked list is empty.
   */
  toArray(): T[] {
    assert(
      this.firstNode !== null,
      "You must have items in the list to convert it into an array"
    );
    const array: T[] = [];
    let currentNode: INode<T> | null = this.firstNode;
    while (currentNode !== null) {
      array.push(currentNode.data);
      currentNode = currentNode.nextNode;
    }
    return array;
  }

  /**
   * Removes the last node from the linked list and returns its data.
   * @returns {T | null} - The data of the removed node, or null if the list is empty.
   * @throws {AssertionError} - If the linked list is empty.
   */
  removeLastNode(): T | null {
    assert(
      this.firstNode !== null,
      "There are no elements in the list to remove"
    );
    let currentNode: INode<T> | null = this.firstNode;
    let previousNode: INode<T> | null = null;
    while (currentNode!.nextNode !== null) {
      previousNode = currentNode;
      currentNode = currentNode!.nextNode;
    }
    if (previousNode === null) {
      this.firstNode = null;
      this.lastNode = null;
    } else {
      previousNode.nextNode = null;
      this.lastNode = previousNode;
    }
    return currentNode ? currentNode.data : null;
  }

  /**
   * Removes a specified node from the linked list and returns its data.
   * @param {INode<T>} nodeToRemove - The node to be removed from the linked list.
   * @returns {T | null} - The data of the removed node, or null if the node was not found.
   * @throws {AssertionError} - If the linked list is empty or the node to remove is undefined.
   */
  removeNode(nodeToRemove) {
    assert(
      this.firstNode !== null,
      "There are no elements in the list to remove"
    );
    assert(nodeToRemove !== undefined, "Node should be defined to remove it");

    let previousNode: INode<T> | null = null;
    let currentNode: INode<T> | null = this.firstNode;

    if (currentNode === nodeToRemove) {
      this.firstNode = currentNode.nextNode;
      if (currentNode.nextNode === null) {
        this.lastNode = null;
      }
      return currentNode.data;
    }

    while (currentNode !== null) {
      if (currentNode === nodeToRemove) {
        previousNode!.nextNode = currentNode.nextNode;
        if (currentNode.nextNode === null) {
          this.lastNode = previousNode;
        }
        return currentNode.data;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  /**
   * Inserts new data after a specified existing node in the linked list.
   * @param {INode<T>} existingNode - The node after which new data should be inserted.
   * @param {T} data - The data to be inserted into the linked list.
   * @returns {INode<T> | null} - The newly inserted node, or null if the existing node was not found.
   * @throws {AssertionError} - If the position of the existing node or the data to be added is not defined.
   */
  insertAfter(existingNode: INode<T>, data: T): INode<T> | null {
    assert(
      existingNode !== undefined && existingNode !== null,
      "You must define the position of the node correctly"
    );
    assert(data !== null, "You must define the data to be added");

    const newNode = new Node(data);

    let currentNode: INode<T> | null = this.firstNode;
    let previousNode: INode<T> | null = null;
    while (currentNode !== null) {
      if (currentNode === existingNode) {
        newNode.nextNode = currentNode.nextNode;
        currentNode.nextNode = newNode;
        if (currentNode === this.lastNode) {
          this.lastNode = newNode;
        }
        return newNode;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  /**
   * Inserts new data before a specified existing node in the linked list.
   * @param {INode<T>} existingNode - The node before which new data should be inserted.
   * @param {T} data - The data to be inserted into the linked list.
   * @returns {INode<T> | null} - The newly inserted node, or null if the existing node was not found.
   * @throws {AssertionError} - If the position of the existing node or the data to be added is not defined.
   */
  insertBefore(existingNode: INode<T>, data: T): INode<T> | null {
    assert(
      existingNode !== undefined || existingNode !== null,
      "You must define the position of the node correctly"
    );
    assert(data !== null, "You must define the data to be added");

    const newNode = new Node(data);
    let previousNode: INode<T> | null = null;
    let currentNode: INode<T> | null = this.firstNode;
    while (currentNode !== null) {
      if (currentNode === existingNode) {
        if (previousNode === null) {
          this.firstNode = newNode;
        } else {
          previousNode.nextNode = newNode;
        }
        newNode.nextNode = currentNode;
        return newNode;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  /**
   * Returns the number of nodes in the linked list.
   * @returns {number} - The number of nodes in the linked list.
   */
  listLength(): number {
    let count = 0;
    let currentNode: INode<T> | null = this.firstNode;
    while (currentNode !== null) {
      currentNode = currentNode.nextNode;
      count++;
    }
    return count;
  }

  /**
   * Executes a provided function once for each node in the linked list.
   * @param {(node: INode<T>) => void} visit - A function to execute on each node in the linked list.
   */
  traverse(visit: (node: INode<T>) => void): void {
    let currentNode: INode<T> | null = this.firstNode;
    while (currentNode !== null) {
      visit(currentNode);
      currentNode = currentNode.nextNode;
    }
  }

  /**
   * Filters nodes in the linked list based on a predicate function.
   * @param {(data: T) => boolean} predicate - A predicate function used to filter nodes based on their data.
   * @returns {T[]} - An array containing the data of nodes that satisfy the predicate.
   * @throws {AssertionError} - If the linked list is empty.
   */
  filter(predicate: (data: T) => boolean): T[] {
    assert(
      this.firstNode !== null,
      "You must have at least one node to filter the list"
    );
    const resultArr = this.toArray();
    return resultArr.filter(predicate);
  }
}
