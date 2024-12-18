import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthoProvider";
import Swal from 'sweetalert2'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



export default function Home() {
  const {user, loading} = useContext(AuthContext);
  const [dataFromDb, setdataFromDb] = useState([]);

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    if (!loading) {
      
      fetch(`http://localhost:3000/todos/email/${user?.email}`)
      .then(res=>res.json())
      .then(data=>setdataFromDb(data))

      const dbWorks = user ? dataFromDb.map((ele) => ele.data) : [];
      const storedTodo = user
        ? []
        : JSON.parse(localStorage.getItem("Todos")) || [];

      // Set todo only when user data is ready
      setTodo([...dbWorks, ...storedTodo]);


    
    }
  }, [loading, user, dataFromDb]);


  const handleSubmit= async(e)=>{
    e.preventDefault();
    const data = e.target.todo.value;
    const userEmail = user?.email;
    const todoWork = {userEmail, data};
    // Reset The Input Field
    e.target.reset();

    const updatedTodos = [data, ...todo];
    setTodo(updatedTodos);

    localStorage.setItem("Todos", JSON.stringify(updatedTodos));

    
    if(!user && updatedTodos.length==1){
      // alert
      Swal.fire("Login or Create an Free Account to store ur Todo Data");
    }else if(user){
      // TODO: store on database
      fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(todoWork)
      })
      .then(res=> res.json())
      .then(data=> console.log(data));

    }


  }



  // delete 
  const handleDelete = (id)=>{
    // do somenthing 
    console.log(id)
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
                    todo?.map((ele,i)=>
                      <tr key={i+1} className="bg-base-200">
                      <th>{i+1}</th>
                      <td>{ele}</td>
                      <td></td>
                      <td className="flex gap-6 text-2xl">
                        <FaRegEdit style={{cursor: 'pointer'}}/>
                        <MdDeleteForever onClick={()=>handleDelete()} style={{cursor: 'pointer'}} className="text-red-700"/>
                          {
                            console.log(ele)
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
