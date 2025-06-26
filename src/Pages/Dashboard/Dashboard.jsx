import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { Link, Outlet } from 'react-router';
import { PlusCircle, List, Heart } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const navLink = (
    <>
      <li>
        <Link to="/dashboard/addRecipe" className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" /> Add Recipe
        </Link>
      </li>
      <li>
        <Link to={`/dashboard/myRecipe/${email}`} className="flex items-center gap-2">
          <List className="w-5 h-5" /> My Recipe
        </Link>
      </li>
      <li>
        <Link to="/dashboard/myWishlist" className="flex items-center gap-2">
          <Heart className="w-5 h-5" /> My Wishlist
        </Link>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        
        <div className="navbar  px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side ">
        <label htmlFor="my-drawer" className="drawer-overlay "></label>
        <ul className="menu p-4 w-80 min-h-full bg-primary text-base-content space-y-4">
          <div className="flex flex-col items-center mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
               
                <img src={user?.photoURL} alt="User Avatar" />
              
              </div>
            </div>
            <p className="mt-3 font-semibold">{user?.displayName}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {navLink}
          <div className='navbar-end'>
             <Link to={'/'}>
            <button className='btn'>back</button>
             </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
