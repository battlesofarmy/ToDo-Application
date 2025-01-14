import { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../AuthoProvider";
import axios from 'axios'


export default function Home() {
  const [todoItems, setTodoItems] = useState([]);
  const localData = JSON.parse(localStorage.getItem("Todos")) || [];
  const [editRow, setEditRow] = useState(null);
  const inputRef = useRef(null);
  const {user, loading} = useContext(AuthContext);

  useEffect(()=>{
    setTodoItems(localData);
    if(!loading){
      if(user){
        // take data and set into localstorage
        // axios.get(`http://localhost:3000/todos/email/${user.email}`)
        // axios.get(`https://johfa-battlesofarmys-projects.vercel.app/todos/email/${user.email}`, {withCredentials: true})
        axios.get(`https://applications.muntasir3301.xyz/todos/email/${user.email}`, {withCredentials: true})
        .then(res=> {
          const loggedTodos = res.data.map(ele=> ele.todo);
          localStorage.clear();

          localStorage.setItem("Todos", JSON.stringify(loggedTodos));
          setTodoItems(loggedTodos);  
          console.log('data ', localData)
        })
      }else{
        console.log("ye")
      }
    }
  },[user])

  // add 
  const handleToDoAdd =(e)=>{
    e.preventDefault();


    const inputValue = e.target.todo.value;
    const updatedTodos = [inputValue, ...todoItems];
    setTodoItems(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));

      if(user){
        const email = user.email;
        const todoUser = {email, todo: inputValue};
        // add on db
        // axios.post(`http://localhost:3000/todos/`, todoUser)
        // axios.post(`https://johfa-battlesofarmys-projects.vercel.app/todos/`, todoUser, {withCredentials: true})
        axios.post(`https://applications.muntasir3301.xyz/todos/`, todoUser, {withCredentials: true})
        .then(res=> console.log(res.data))
        .catch(data=>console.log(data))
      }

    e.target.reset();
  }

  // Edit 
  const handleTodoUpdates =(id)=>{
    // const currentRowText = todoItems.find((ele,i)=>i==id)
    todoItems[id] = inputRef.current.value;
    setTodoItems(todoItems);
    localStorage.setItem("Todos", JSON.stringify(todoItems));
    
    setEditRow(null);
  }
  
  // Delete 
  const handleToDoDelete =(id, val)=>{
    const newItemsArray = localData.filter((ele, i)=> i!=id);
    localStorage.setItem("Todos", JSON.stringify(newItemsArray));
    setTodoItems(newItemsArray);

    if(user){
      // Delete from db also
      axios
      // .delete(`http://localhost:3000/todos/${val}`)
      // .delete(`https://johfa-battlesofarmys-projects.vercel.app/todos/${val}`, {withCredentials: true})
      .delete(`https://applications.muntasir3301.xyz/todos/${val}`, {withCredentials: true})
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.error("Error deleting todo:", err));
    }
  }
  
  return (
    <>
      <section className="py-20">
        <div className="container">
          <div className="shadow border p-20 w-[60vw] mx-auto">
            <form onSubmit={handleToDoAdd} className='mt-6 flex gap-x-4'>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="todo"
                name="todo"
                type="text"
                required
                placeholder="Enter your To Do Work"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-md outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-lg border"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                AddTodo
              </button>
            </form>
            
            {/* Todo data  */}
            <div className='py-10 w-full'>
              <div role="tablist" className="tabs tabs-lifted w-full">
                <input type="radio" defaultChecked name="my_tabs_2" role="tab" className="tab font-medium" aria-label="All ToDos" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                {/* Single Todo item  */}
                {
                  localData?.map((ele, i)=>
                    <div key={i} className='grid grid-cols-12 w-full bg-gray-200 py-3 my-2'>
                      <h4 className='col-span-1 flex justify-center font-bold text-blue-600'>{i+1}</h4>
                      {
                        editRow === i ?
                        <input ref={inputRef} defaultValue={ele} type="text" className='col-span-9 px-3 rounded focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500'/>
                        :
                        <p  className='col-span-9 items-center flex'>{ele}</p>
                      }
                      <div  className='col-span-2 flex justify-center items-center gap-2'>
                        {
                          editRow === i ?
                          <>
                            <FaCheck onClick={()=>handleTodoUpdates(i)}  style={{cursor: 'pointer'}} className="text-2xl"/>
                            <RxCross2 onClick={()=>setEditRow(null)} className="text-3xl text-red-600" style={{cursor: 'pointer'}}/>
                          </>
                          :
                          <>
                            <FaEdit onClick={()=>setEditRow(i)}  style={{cursor: 'pointer'}} className="text-2xl"/>
                            <MdOutlineDeleteForever onClick={()=>handleToDoDelete(i, ele)} className="text-3xl text-red-600" style={{cursor: 'pointer'}}/>
                          </>
                        }
                      </div>
                    </div>
                  )
                }

{
        localData.length==0 ? <p className="text-[14px]">The todo list is empty. Add a todo to view </p> : <p></p>
      }
 

                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab font-medium" aria-label="Completed"/>
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  Complete Feature Comming Soon!
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab font-medium" aria-label="Incomplete" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                   InComplete Feature Comming Soon!
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>




    </>
  );
}
