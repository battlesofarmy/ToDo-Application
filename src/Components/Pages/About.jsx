import { useRef, useState } from "react";

export default function About() {
  const inputRef = useRef();

  const handleFormSubmit =(e)=>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    // const user = {name};
    const myVal = inputRef.current.value;
    console.log('iam from ref ', myVal)
  }
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Name  */}
          <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Your Name
              </label>
              <div className="mt-2">
                <input
                ref={inputRef}
                  id="name"
                  name="name"
                  type="text"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
