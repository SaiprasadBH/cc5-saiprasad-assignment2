import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";
import LinkedList from "./linkedListImplementation";

export const isNumber = (data: unknown): data is number => {
  return typeof data === "number";
};

describe("Linked List Oops basic implementation tests", () => {
  let listRef: LinkedList<unknown> | null = null;

  beforeEach(() => {
    listRef = new LinkedList([1, "hello", [2], { name: "saiprasad", age: 22 }]);
  });

  afterEach(() => {
    listRef = null;
  });

  test("Linked List creation tests", () => {
    const emptyList = new LinkedList<number>(); // Assuming number for testing
    expect(emptyList.firstNode).toBeNull();
    expect(emptyList.lastNode).toBeNull();

    const arrayWithData = [1, "hello", { key1: 0 }, 2.0];
    const listFromArray = new LinkedList(arrayWithData);
    expect(listFromArray.firstNode!.data).toBe(1); // Asserting non-null with !
    expect(listFromArray.lastNode!.data).toBe(2.0);

    const anotherList = new LinkedList(listRef!); // Asserting non-null with !
    expect(anotherList.toArray()).toEqual([
      1,
      "hello",
      [2],
      { name: "saiprasad", age: 22 },
    ]);
  });

  test("Adding item to list tests", () => {
    const listNode1 = listRef!.firstNode!;
    expect(listNode1.data).toBe(1); // Asserting non-null with !
    expect(listNode1.nextNode!.data).toBe("hello");
    expect(listNode1.nextNode!.nextNode!.data).toEqual([2]);
    expect(listNode1.nextNode!.nextNode!.nextNode!.data).toEqual({
      name: "saiprasad",
      age: 22,
    });
    expect(listNode1.nextNode!.nextNode!.nextNode!.nextNode).toBeNull();
  });

  test("Array from list tests", () => {
    const listAsArray = listRef!.toArray();
    expect(listAsArray).toEqual([
      1,
      "hello",
      [2],
      { name: "saiprasad", age: 22 },
    ]);
  });

  test("Remove last node from list tests", () => {
    const lastNodeData = listRef!.removeLastNode();
    expect(lastNodeData).toEqual({ name: "saiprasad", age: 22 });
    expect(listRef!.lastNode!.data).toEqual([2]);
    expect(listRef!.lastNode!.nextNode).toBeNull();
  });

  test("Remove node from list tests", () => {
    const secondNode = listRef!.firstNode!.nextNode!;
    const removedNodeData = listRef!.removeNode(secondNode);
    expect(removedNodeData).toEqual("hello");
    expect(listRef!.firstNode!.nextNode!.data).toEqual([2]);
  });

  test("Insert after node tests", () => {
    const secondNode = listRef!.firstNode!.nextNode!;
    listRef!.insertAfter(secondNode, "world");
    expect(secondNode.nextNode!.data).toEqual("world");

    listRef!.insertAfter(listRef!.lastNode!, "saiprasad");
    expect(listRef!.lastNode!.data).toEqual("saiprasad");
  });

  test("Insert before node tests", () => {
    const thirdNode = listRef!.firstNode!.nextNode!.nextNode!;
    listRef!.insertBefore(thirdNode, "hegde");
    expect(listRef!.firstNode!.nextNode!.nextNode!.data).toEqual("hegde");

    listRef!.insertBefore(listRef!.firstNode!, "sirsi");
    expect(listRef!.firstNode!.data).toEqual("sirsi");
  });

  test("filter function tests", () => {
    expect(listRef!.filter(isNumber)).toEqual([1]);
  });

  test("test for traverse function along with length function", () => {
    const mockFunction = vi.fn();
    listRef!.traverse(mockFunction);
    expect(mockFunction.mock.calls.length).toBe(listRef!.listLength());
  });
});
