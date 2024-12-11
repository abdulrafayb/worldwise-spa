import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContent';
import ProtectedRoute from './pages/ProtectedRoute';

// import Homepage from './pages/Homepage';
// import Pricing from './pages/Pricing';
// import Product from './pages/Product';
// import Login from './pages/Login';
// import AppLayout from './pages/AppLayout';
// import PageNotFound from './pages/PageNotFound';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path='/' /* or 'index' */ element={<Homepage />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='product' element={<Product />} />
              <Route path='login' element={<Login />} />
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

/* here instead of create react app we use vite so before we used to go to the terminal and do the below

before: npx create-react-app project-name
now: npm create vite@latest
     npm install

vite is different from create react app as it is more of a modern build tool that also happens to have a few templates for all different frameworks and in it we have to manually install the dependencies meaning node modules which contains all the libraries necessary such as react and react-dom et cetera 

the file structure is also different in vite such as the file extension in it is '.jsx' which stands for JS JSX instead of '.js' also the entry point in it is called 'main.jsx' instead of 'index.js'

we also start our application in a different way now like listed below

before: npm start | npm run build
now: npm run dev | 

the great thing about create react app is that it already comes with all the important developer tools pre-installed and the most important one of those is by far eslint but in newer versions of vite it also comes pre-installed and building a react app without eslint is a bit like coding half blinded so we config the eslint in our vite project and we need to do that manually each time we set up a project with vite with the following command below

command: npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev

next we need to actually config our project to integrate with these packages we just installed so to do that we create a new file named '.eslintrc.json' and in it we configure the behaviour of eslint by extending the default rules of eslint with react rules that we installed with the above command so to do that we do the below by creating an object and then we also config our vite project file by importing and adding eslint plugin to an array 

{
  "extends": "react-app"
}

import eslint from 'vite-plugin-eslint';
plugins: [react(), eslint()]
  
we can configure all kinds of things about development and building of our project */

/* now we are going to learn all the fundamentals of CSS modules and they come out of the box both with create react app and vite meaning there is nothing to install in order to make CSS modules work */

/* we put our images into public folder and not in assets folder which is inside source folder because the assets are directly imported into our JS code and we have deleted assets folder from this project */

/* nested routes are needed when we want a part of the user interface to be controlled by a part of the URL such as in our sidebar component when we are showing list of the cities which is also reflected in our url like 'app/"cities"' meaning the cities are displayed because in the URL we have cities and above we have created three nested routes for cities, countries, forms (three child routes) while keeping the cities URL as default URL using the index keyword called index route which is basically the default child route that is going to be matched if none of the other routes matches because if we don't define a default URL then nothing will show on the screen until we open one of the three URL so we keep one default so that there is something to see on the screen */

/* nested routes are basically implemented so that we can show a part of the UI based on some part of the URL and nested routes are not simply routes which are made up of multiple part like 'app/"cities"' meaning just because we have longer path with these two parts does not make it a nested route instead what makes it a nested route is the path which influences what component is to be rendered inside the bigger component so "cities" alone is the nested route */

/* to declare nested routes we need to do it inside a route element by using a closing tag and then defining nested routes inside as we have done above inside 'app' route basically making the 'app' parent route and inside we define child routes and the element we want to display on the screen doesn't necessarily have to be a component it can also be just some simple JSX or HTML element and to display the component or element inside another component we use the outlet component '<Outlet />' provided by the react router which is similar to children prop like when we do composition comes into play meaning we use the outlet inside our big component (sidebar) where we want to display the small component (cities, countries, form) */

/* behind the scenes what happens is that react router sees the URL made out of two parts 'app/cities' so first it sees 'app' part which matches with the route named 'app' rendering our big component but then it also notices the 'cities' part so it goes into the nested routes rendering the component inside the outlet component with which the URL matches or it checks if there is already a default URL set */

/* if we think about what we just implemented above is similar to tabs component but implemented in a different way so before if we wanted to implement a tab component where we have tabs similar to in our sidebar while the content changes according to which is the active tab we would have implemented that using the useState hook to manage the currently active tab but here we do the same thing but with react router meaning we allow react router to enter URL to store that state of the active tab so then whenever the URL changes then the tab also changes making react router a whole new way of thinking about how we build application */

/* the reason we fetch the cities globally not in the component where we want to display cities is because countries and map icon are derived from the cities data therefore we need to make it global */

/* now in the country list we receive the cities array as a prop and from these cities we are going to derive the countries so we are derive them there in the component 'countriesList' or right here in this component where we have the cities state defined then we can pass those countries into the 'countryList' component as prop  */

/* in the 'countryList' component we receive the cities array as a prop and from these cities we are going to derive the countries so we are going to do that there because that operation only need to happen when the component is executed and not here in the app component as we have the cities state here so we can derive the state passing the countries directly to 'countryList' component as prop but we don't do it like this because if we do it here then it will happen each time the application re-renders meaning each time the app component is executed again so we should also start thinking about these kind of things too because it affects performance as if we do it in app component it gets executed again and again whilst if we do that there it only gets executed when it is necessary */

/* now to implement a map in our application we use a third party package but first we are gonna install it

command: npm install react-leaflet leaflet

so leaflet is the base library meaning react leaflet is built on top of leaflet so we need to install both of them and leaflet is the biggest open source library to implement maps and whenever we bring in a third party library like we have now it is a good idea to check out the documentation and we also need to add leaflet CSS from the base leaflet website in our CSS file as well

@import 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';

now we take the sample code from the react leaflet shown on the main page of the website */

/* the last feature we are going to implement will be to add a fake authentication so in a typical front-end application like react user authentication usually works in three steps so first we get the user's email and password from a login form and check with an API endpoint if the password for the given user is correct then in the second step if the crendentials are actually correct we then redirect the user to our main application while also saving the user object in our state and finally in the third step we need to protect the application from unauthorized access meaning from users who are not currently logged in */

/* now the part where the fake authentiation comes into place is basically the first step because we will not ask for the user credentials from an API but instead we are going to have a hard coded user object in our application and we will simply check if the user and passwords are correct so we are basically going to have only one user in this example but this is just to demonstrate how authentication works and in a real authentication we would use a database with real users */
