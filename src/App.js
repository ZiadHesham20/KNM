import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Layout from './Components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import TourDetails from './Components/TourDetails/TourDetails';
import RidePrices from './Components/RidePrices/RidePrices';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Form from './Components/Form/Form';
import Tour_Form from './Components/Tour_Form/Tour_Form';
import AboutUs from './Components/AboutUs/AboutUs';
import Contactus from './Components/ContactUs/Contactus';
import Profile from './Components/Profile/Profile';
import Tours from './Components/Tours/Tours';
import Admin from './Components/Admin/Admin';
import Admin_dash from './Components/Admin_dash/Admin_dash';
import AdminTours from './Components/AdminTours/AdminTours';
import AddTour from './Components/AddTour/AddTour';
import AdminDestinations from './Components/AdminDestinations/AdminDestinations';
import AdminTrips from './Components/AdminTrips/AdminTrips';
import AdminTravels from './Components/AdminTravels/AdminTravels';
import AdminRides from './Components/AdminRides/AdminRides';
import AdminCurrency from './Components/AdminCurrency/AdminCurrency';
import AdminUsers from './Components/AdminUsers/AdminUsers';
import AddDestination from './Components/AddDestination/AddDestination';

import AddUser from './Components/AddUser/AddUser';
import AddCurrency from './Components/AddCurrency/AddCurrency';
import EditTrip from './Components/EditTrip/EditTrip';
import EditTravels from './Components/EditTravels/EditTravels';
import EditRides from './Components/EditRides/EditRides';
import axios from 'axios';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ProtectedRoute from './Components/ProtectedRoute';
import Photos from './Components/Photos/Photos';
import AdminCategories from './Components/AdminCategories/AdminCategories';
import AddCategory from './Components/AddCategory/AddCategory';
import Error from './Components/Error/Error';
import Page404 from './Components/Page404/Page404';
import AdminReviews from './Components/AdminReviews/AdminReviews';
import ChangeTripPrice from './Components/ChangeTripPrice/ChangeTripPrice';
import CategoryOf from './Components/CategoryOf/CategoryOf';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { ThemeProvider, createTheme } from '@mui/material';



function App() {
  const theme = createTheme({
    palette: {
      primary:{
        main: '#FECD27'
      }
    }
  })
  return <>
  <Provider store={store}>
  <ThemeProvider theme={theme}>
  <Routes >
    {/* admin pathes */}
  <Route path='/admin' element={<ProtectedRoute><Admin dashboard={<Admin_dash/>}/></ProtectedRoute>}/>
  <Route path='/photos' element={<ProtectedRoute><Admin dashboard={<Photos/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<Photos/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/adminDestinations' element={<ProtectedRoute><Admin dashboard={<AdminDestinations/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AdminDestinations/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/adminTrip' element={<ProtectedRoute><Admin dashboard={<AdminTrips/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AdminTrips/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/adminReviews' element={<ProtectedRoute><Admin dashboard={<AdminReviews/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AdminReviews/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/adminTravels' element={<ProtectedRoute><Admin dashboard={<AdminTravels/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AdminTravels/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/adminCategories' element={<ProtectedRoute><Admin dashboard={<AdminCategories/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AdminCategories/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/adminTours' element={<ProtectedRoute><Admin dashboard={<AdminTours/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AdminTours/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/adminRides' element={<ProtectedRoute><Admin dashboard={<AdminRides/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AdminRides/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/adminCurrency' element={<ProtectedRoute><Admin dashboard={<AdminCurrency/>}/></ProtectedRoute>}/>
  <Route path='/adminUsers' element={<ProtectedRoute><Admin dashboard={<AdminUsers/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AdminUsers/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/addTour' element={<ProtectedRoute><Admin dashboard={<AddTour/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AddTour/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/addTrip' element={<ProtectedRoute><Admin dashboard={<EditTrip/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<EditTrip/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/addTravels' element={<ProtectedRoute><Admin dashboard={<EditTravels/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<EditTravels/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/addRides' element={<ProtectedRoute><Admin dashboard={<EditRides/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<EditRides/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/addDestination' element={<ProtectedRoute><Admin dashboard={<AddDestination/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AddDestination/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/addCurrency' element={<ProtectedRoute><Admin dashboard={<AddCurrency/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AddCurrency/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/addCategory' element={<ProtectedRoute><Admin dashboard={<AddCategory/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AddCategory/>}/></ProtectedRoute>}/>
  </Route>
  <Route path='/editUser' element={<ProtectedRoute><Admin dashboard={<AddUser/>}/></ProtectedRoute>}>
  <Route path=':id' element={<ProtectedRoute><Admin dashboard={<AddUser/>}/></ProtectedRoute>}/>
  </Route>
  {/* user paths */}
    <Route path='/' index element={<Layout home={<Home/>}/>}/>
    <Route path='/aboutus' element={<Layout home={<AboutUs/>}/>}/>
    <Route path='/tours' element={<Layout home={<Tours/>}/>}/>
    <Route path='/categoryOf' element={<Layout home={<CategoryOf/>}/>}>
       <Route path=':category' element={<Layout home={<CategoryOf/>}/>}/>
    </Route>
    <Route path='/contact' element={<Layout home={<Contactus/>}/>}/>
    <Route path='/profile' element={<Layout home={<Profile/>}/>}/>
    <Route path='/signin' element={<Layout home={<Signin/>}/>}/>
    <Route path='/signup' element={<Layout home={<Signup/>}/>}/>
    <Route path='/home' element={<Layout home={<Home/>}/>}/>
    <Route path='/tourdetails' element={<Layout home={<TourDetails/>}/>}>
      <Route path=':id' element={<Layout home={<TourDetails/>}/>}/>
    </Route>
    <Route path='/transferform' element={<Layout home={<Form/>}/>}>
      <Route path=':id' element={<Layout home={<Form/>}/>}/>
    </Route>
    <Route path='/tourform' element={<Layout home={<Tour_Form/>}/>}>
      <Route path=':id' element={<Layout home={<Tour_Form/>}/>}/>
    </Route>
    <Route path='/rideprices' element={<Layout home={<RidePrices/>}/>}/>
    <Route path='/changePrice' element={<ProtectedRoute><Admin dashboard={<ChangeTripPrice/>}/></ProtectedRoute>}/>
    <Route path='/forgetPassword' element={<ForgetPassword/>}/>
    <Route path='/503' element={<Error/>}/>
    <Route path='*' element={<Home/>}/>
  </Routes>
  </ThemeProvider>
  </Provider>
  


 

  </>
}

export default App;
