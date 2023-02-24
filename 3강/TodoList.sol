// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0; 

contract TodoList {

    struct Todo {
        string title;
        bool done;
        string todo;
    }

    // likes ram
    Todo[] Todolist;

    // likes hdd
    mapping(uint => Todo) Todo_list;

    // 0. get Todo mapping
    function getTodo1(uint Day) public view returns(Todo memory test){
        test = Todo_list[Day];
    }

    // 0. get Todo array
    function getTodo2() public view returns(Todo memory) {
        uint _index = Todolist.length - 1;
        return Todolist[_index];
    }

    // 1. add Todo
    function addTodo(string memory todo1, string memory todo2, uint _index) public returns(uint) {
        Todolist.push(Todo(todo1, false, todo2));
        Todo_list[_index] = Todo(todo1, false, todo2);
        return _index;
    }

    // 2. modify Title
    function modiTitle(uint _index, string memory _title) public {
        Todo_list[_index].title = _title;
    }

    // 3. change Done or Not Done
    function modiDone(uint _index) public {
        bool temp;
        temp = Todo_list[_index].done;
        Todo_list[_index].done = !temp;
    }

    // 4. read todo in Todo
    function readTodo(uint _index) public view returns (string memory) {
        string memory temp;
        temp = Todo_list[_index].todo;
        return temp;
    }
    // Never!!! Ever!!!! Never use an array in public.
}