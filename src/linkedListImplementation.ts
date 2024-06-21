import assert from "assert";
import { INode, ILinkedList } from "./interfaces";
/**
 * Represents a single node in the linked list.
 */
export class Node<T> implements INode<T> {
  data: T;
  nextNode: INode<T> | null;

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

  private isLinkedList(data: unknown): data is ILinkedList<T> {
    return (data as ILinkedList<T>).addData !== undefined;
  }

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

  removeNode(nodeToRemove: INode<T>): T | null {
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

  listLength(): number {
    let count = 0;
    let currentNode: INode<T> | null = this.firstNode;
    while (currentNode !== null) {
      currentNode = currentNode.nextNode;
      count++;
    }
    return count;
  }

  traverse(visit: (node: INode<T>) => void): void {
    let currentNode: INode<T> | null = this.firstNode;
    while (currentNode !== null) {
      visit(currentNode);
      currentNode = currentNode.nextNode;
    }
  }

  filter(predicate: (data: T) => boolean): T[] {
    assert(
      this.firstNode !== null,
      "You must have at least one node to filter the list"
    );
    const resultArr = this.toArray();
    return resultArr.filter(predicate);
  }
}
