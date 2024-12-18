import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../AuthoProvider";
// import Swal from 'sweetalert2'
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

 
export default function Home() {
  const {user, loading} = useContext(AuthContext);
  const [todoItems, setTodoItems] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const inputRef = useRef({});
  
  // if login user from db
  // else from localstorage
  useEffect(()=>{
    if(!loading){
      if(user){
        // load data from db
        fetch(`http://localhost:3000/todos/email/${user.email}`)
        .then(res=> res.json())
        .then(data=> setTodoItems(data));
        localStorage.clear();
      }else{
        const localData = JSON.parse(localStorage.getItem('Todos')) || [];
        setTodoItems(localData);
      }
    }
  },[loading, user]);


  const handleSubmit= async(e)=>{
    e.preventDefault();
    const data = e.target.todo.value;
    e.target.reset();

    const updatedTodos = [data, ...todoItems];
    setTodoItems(updatedTodos);
    
    if(user){
      // add on db
      const userEmail = user.email;
      const myTodo = {userEmail, data}

      fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        }, 
        body: JSON.stringify(myTodo)
      })
      .then(res=> res.json())
      .then(data=>console.log(data));
    }else{
      // add on local
      localStorage.setItem("Todos", JSON.stringify(updatedTodos))
    }
  }


  const handleDelete = (id)=>{
    let newItemsArray;
    
    if(user){
      // delete from db
      fetch( `http://localhost:3000/todos/${id}`, {
        method : 'DELETE'
      })
      .then(res=>res.json())
      .then(data=>
        console.log(data)
      )
      .catch(err=>console.log(err))


      newItemsArray = todoItems.filter(ele=> ele._id != id );
    }else{
      newItemsArray = todoItems.filter((ele, i)=> i!=id);
      localStorage.setItem("Todos", JSON.stringify(newItemsArray))
    }
    setTodoItems(newItemsArray);
  }


  const hanldeEditSave =(id)=>{
    let newItemsArray;
    const data  = inputRef.current[id].value;
    const updatedUserTodo = {data};
    // console.log();
    console.log('val ',  editingRow)

    
    if(user){
      // updta on db
      fetch( `http://localhost:3000/todos/${id}`, {
        method : 'PUT',
        headers: {
           "content-type" : 'application/json'
        },
        body: JSON.stringify(updatedUserTodo)
      })
      .then(res=>res.json())
      .then(data=>
        console.log(data)
      )
      .catch(err=>console.log(err))
      const tem = todoItems.find(ele=> ele._id == id);
      tem.data = data;
      setEditingRow(null);
    }else{
      // update on local
      // newItemsArray = todoItems.filter((ele, i)=> i!=id);
      // const tem = todoItems.find(ele=> ele._id == id);
      // tem.data = data;
      todoItems[id] = data;
      console.log(todoItems[id])
      
      localStorage.setItem("Todos", JSON.stringify(todoItems))
      setEditingRow(null);
    }
    // setTodoItems(newItemsArray);
  }

  return (
    <>
      <section className="py-20">
        <div className="flex justify-center">
          <div>
            <form onSubmit={handleSubmit}>
              {/* submit form  */}
              <input
                className="text-xl py-2 px-5 border"
                type="text"
                placeholder="What Do You Need to Do?"
                name="todo"
              />
              <input
                style={{ cursor: "pointer" }}
                className="text-xl bg-orange-600 py-2 px-5 border"
                type="submit"
                value={"+"}
              />
            </form>
            {/* Items  */}

            <div className="overflow-x-auto my-5">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-base">
                    <th></th>
                    <th>Name</th>
                    <th></th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>

                  {/* row 1 */}
                  {
                    todoItems?.map((ele, i)=>
                      
                      <tr key={i} className="bg-base-200">
                      <th>{i+1}</th>
                      {
                        editingRow===(ele._id ? ele._id : i) ? 
                        <td>
                          <input type="text" defaultValue={ele.data ? ele.data : ele} ref={(val)=> (inputRef.current[(ele._id ? ele._id : i)] = val)} />
                        </td>
                        :
                        <td>{ele.data ? ele.data : ele}</td>
                      }
                      <td></td>
                      <td className="flex gap-6 text-2xl">
                        {
                          editingRow===(ele._id ? ele._id : i) ?
                          <>
                            <FaCheck onClick={()=>hanldeEditSave(ele._id ? ele._id : i)} style={{cursor: 'pointer'}}/>
                            <RxCross2 onClick={()=>setEditingRow(null)} style={{cursor: 'pointer'}} className="text-red-700"/>
                          </>
                          :
                          <>
                            {/* <FaRegEdit onClick={()=>setEdit(!edit)} style={{cursor: 'pointer'}}/> */}
                            <FaRegEdit onClick={()=> setEditingRow((ele._id ? ele._id : i))} style={{cursor: 'pointer'}}/>
                            <MdDeleteForever onClick={()=>handleDelete((ele._id ? ele._id : i))} style={{cursor: 'pointer'}} className="text-red-700"/>
                          </>
                        }
                      </td>
                    </tr>
                    )
                  }
                      

{/* {
                    dbTodo?.map((ele,i)=>
                      <tr key={i+1} className="bg-base-200">
                      <th>{i+1}</th>
                      <td>{ele.data}</td>
                      <td>Hello World!</td>
                      <td>Action</td>
                    </tr>
                    )
                  } */}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
