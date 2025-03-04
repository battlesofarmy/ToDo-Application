import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { AuthContext } from '../AuthoProvider';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About This App', href: '/About', current: false },
  { name: 'My ToDo', href: '/love', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [current, setCurrent] = useState(navigation.find(item => item.current)?.name);

  function handleClick(name) {
    setCurrent(name);
  }

  const {user, logOut} = useContext(AuthContext);

  const handelLogOut=()=>{
    logOut();
    localStorage.clear();
  }

  return (
<>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link to='/'><h2 className="text-2xl text-gray-200">ToDo Web App</h2></Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => handleClick(item.name)}
                        className={classNames(
                          current === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={current === item.name ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='text-semibold'>
                    {
                      <div className='flex gap-5'>
                          {
                            user?
                            <>
                              <div className='text-green-500 ml-6'>
                                {user.email}
                              </div>
                              <button onClick={handelLogOut} className='text-gray-200'>LogOut</button>
                            </>
                            :
                            <>
                              <Link to={'/login'}><button className='text-gray-200 ml-6'>Login</button></Link>
                              <Link to={'/register'}><button className='text-gray-200'>Register</button></Link>
                            </>
                        }
                      </div>
                    }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    current === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={current === item.name ? 'page' : undefined}
                  onClick={() => handleClick(item.name)}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

</>
  );
}