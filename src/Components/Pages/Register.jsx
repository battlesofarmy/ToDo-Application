import auth from "../FireBase.config";
import {sendEmailVerification } from "firebase/auth";
import { FaCheck, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthoProvider.jsx";

export default function Register() {

    // States
    const [showPass, setShowPass] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // Use Context
    const {creatUser} = useContext(AuthContext);

    
    // Handle Click/change
    const handleSubmit =(e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkTerms = e.target.terms.checked;

        // Always Clear Messages
        setSuccessMsg('');
        setErrMsg('');

        //Check terms and condition accepted
        if(!checkTerms){
            setErrMsg("Please accept our terms and condition");
            return;
        }

        // Check User Login
        // createUserWithEmailAndPassword(auth, email, password)
        creatUser(email, password)
        .then(()=>{
            // const loggedUser = res.user;
            sendEmailVerification(auth.currentUser)
            setSuccessMsg("Submited. Please Comfirm Your Email");
        })
        .catch(err=>{
            // console.log(err.message)
            setErrMsg(err.message);
        })
    }
    return (
      <>
    
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register an account Its Free
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Your Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>


              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2 flex items-center">
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                  <div onClick={()=>setShowPass(!showPass)} style={{marginLeft:'-38px', cursor: 'pointer', fontSize: '22px', background: ''}}>
                     {
                        showPass ? 
                        <FaRegEye/>
                        :
                        <FaRegEyeSlash />
                     }
                  </div>
                </div>
              </div>

              {/* terms and condition  */}
              <div style={{marginTop: '15px'}} htmlFor=''>
                <input type="checkbox" id="terms" name="terms" className="mr-4" />
                <label htmlFor="terms">
                   I agree with the <Link style={{fontWeight: '500'}} className="font- text-indigo-600 hover:text-indigo-500">terms and conditions</Link>
                </label>
              </div>
  
              <div style={{marginTop: '15px'}}>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>

                {/* Success or Error Msg  */}
                {
                    successMsg && 
                    <div style={{fontWeight: '500'}} className="flex items-center gap-2 text-green-600 mt-2">
                        <FaCheck/> <p>{successMsg}</p>
                    </div>
                }
                {
                    errMsg &&
                    <div style={{fontWeight: '500'}} className="flex items-center gap-2 text-red-600 mt-2">
                        <MdOutlineErrorOutline/> <p>{errMsg}</p>
                     </div>
                }
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Login Now!
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  