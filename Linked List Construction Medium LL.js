// This is an input class. Do not edit.

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// Feel free to add new properties and methods to the class.

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // O(1) time | O(1) space
  
  setHead(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.insertBefore(this.head, node);
  }

  // O(1) time | O(1) space
  
  setTail(node) {
    if (this.tail === null) {
      this.setHead(node);
      return;
    }
    this.insertAfter(this.tail, node);
  }

  // O(1) time | O(1) space
  
  insertBefore(node, nodeToInsert) {
    
    /* Edge case to handle real quick - A no op where we just leave the node alone... it wouldn't make sense to insert the only node in the linked list before itself. */
    
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    
    /* We have to account for the case where our nodeToInsert is already in our LL. Maybe thats not the case, but we still have to account for it - so defensively remove the node from the LL. */
    
    this.remove(nodeToInsert);
    
    /* We've already removed the node bindings for nodeToInsert, so now we'll go ahead and point the prev property of nodeToInsert towards the node that came before the node we passed in as a parameter. */
    nodeToInsert.prev = node.prev;
    
    /* Go ahead and point the next property of nodeToInsert towards the node we passed in as a parameter. */
    nodeToInsert.next = node;
    
    /* Maybe the node in question is the head of the LL... in that case, lets assign nodeToInsert to be the new head of the linked list. */
    
    if (node.prev === null) {
      this.head = nodeToInsert;
    } else {
      
      /* Otherwise we'll point the next property of the previous node towards the nodeToInsert. */
      
      node.prev.next = nodeToInsert;
    }
    
    /* Upon successfully inserting the nodeToInsert before the given node, point the prev property of the given node towards nodeToInsert. */
    
    node.prev = nodeToInsert;
  }

  // O(1) time | O(1) space
  
  insertAfter(node, nodeToInsert) {
    
    /* Edge case to handle real quick - A no op where we just leave the node alone... it wouldn't make sense to insert the only node in the linked list after itself. */
    
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    
    /* We have to account for the case where our nodeToInsert is already in our LL. Maybe thats not the case, but we still have to account for it - so defensively remove the node from the LL. */
    
    this.remove(nodeToInsert);
    
    /* We've already removed the node bindings for nodeToInsert, so now we'll go ahead and point the prev property of nodeToInsert towards the node we passed in as a parameter. */
    
    nodeToInsert.prev = node;
    
    /* Go ahead and point the next property of nodeToInsert towards the node that came after the node we passed in as a parameter. */
    
    nodeToInsert.next = node.next;
    
    /* Maybe the node in question is the tail of the LL... in that case, lets assign nodeToInsert to be the new tail of the linked list. */
    
    if (node.next === null) {
      this.tail = nodeToInsert;
    } else {
      
      /* Otherwise we'll point the prev property of the next node back towards the nodeToInsert. */
      
      node.next.prev = nodeToInsert;
    }
    
    /* Upon successfully inserting the nodeToInsert after the given node, point the next property of the given node towards nodeToInsert. */
    
    node.next = nodeToInsert;
  }

  // O(p) time | O(1) space
  
  insertAtPosition(position, nodeToInsert) {
    
    // If position is one we're actually setting the head
    
    if (position === 1) {
      this.setHead(nodeToInsert);
      return;
    }
    
    /* Otherwise start traversing the LL until you hit the end of the LL or hit the position. */
    
    let node = this.head;
    
    let currentPosition = 1;
    
    /* So long as node is not none and current position is not equal to  our position, keep traversing thru the LL and increment your current position. We can leave the while loop if the node is null in which case we'd actually be setting the tail OR when the current position has reached our position.*/
    
    while (node !== null && currentPosition++ !== position) node = node.next;
    
    if (node !== null) {
      
      /* If the node is not none then we're not at the tail - we're just somewhere in the middle of the LL so insert our nodeToInsert before this position we're at.*/
      
      this.insertBefore(node, nodeToInsert);
    } else {
      
      // Otherwise just set the tail.
      
      this.setTail(nodeToInsert);
    }
  }

  // O(n) time | O(1) space
  
  removeNodesWithValue(value) {
    
    // Start at the head of the LL
    
    let node = this.head;
    
    /* So long as we have stuff to traverse, explore the LL. We'll create a temporary variable that we'll use to compare the current node value with the value that we want to remove. When we find the match, remove it using the remove method - if not then just keep traversing thru the LL. A key thing to consider is to not remove the node until after we've assigned the value of the next node to our temporary variable otherwise we'll get stranded in our LL or lose track of the node values.*/
    
    while (node !== null) {
      const nodeToRemove = node;
      node = node.next;
      if (nodeToRemove.value === value) this.remove(nodeToRemove);
    }
  }

  // O(1) time | O(1) space
  
  remove(node) {
    
    /* Are we dealing with head of the linked list? If so, we need to update the head to be the following node. */
    
    if (node === this.head) this.head = this.head.next;
    
    /* Are we dealing with tail of the linked list? If so, we need to update the tail to be the previous node. */
    
    if (node === this.tail) this.tail = this.tail.prev;
    this.removeNodeBindings(node);
  }

  /* O(n) time | O(1) space - Our searching method; we'll be given a value and we'll have to see whether or not our LL contains a node with that given value. */
  
  containsNodeWithValue(value) {
    
    /* We can start at either the head or the tail since we are working with a doubly linked list... we'll start with the head. */
    
    let node = this.head;
    
    // Traverse the linked list and do the check.
    
    /* So long as the current node is not the null value, and so long as the current node value is not what we're looking for, set our pointer to the current node's next property */
    
    while (node !== null && node.value !== value) node = node.next;
    return node !== null;
  }

  // When we remove a node, we also have to remove the pointers from the adjacent nodes pointing to it.
  
  removeNodeBindings(node) {
    
    /* If the adjacent nodes have pointers pointing to the node we're removing, then set them equal to the pointer properties of the node we're deleting... its super important to update the adjacent nodes pointers first before updating the pointers of the node we're removing from the linked list... this is so we don't lose access to the pointers of the node we're removing. */
    
    if (node.prev !== null) node.prev.next = node.next;
    if (node.next !== null) node.next.prev = node.prev;
    
    // As for the pointers of the node we're removing, set them jokers to null.
    
    node.prev = null;
    node.next = null;
  }
}

// Do not edit the lines below.

exports.Node = Node;

exports.DoublyLinkedList = DoublyLinkedList;
