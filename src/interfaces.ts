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
  addData(data: T): INode<T>;
  toArray(): T[];
  removeLastNode(): T | null;
  removeNode(nodeToRemove: INode<T>): T | null;
  insertAfter(existingNode: INode<T>, data: T): INode<T> | null;
  insertBefore(existingNode: INode<T>, data: T): INode<T> | null;
  listLength(): number;
  traverse(visit: (node: INode<T>) => void): void;
  filter(predicate: (data: T) => boolean): T[];
}

export interface HighLevelQuery {
  type: "high";
}
export interface LowLevelQuery {
  type: "low";
}

export interface ShallowResult {
  shallow: boolean;
}
export interface DeepResult {
  deep: boolean;
}
