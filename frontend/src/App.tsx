import type { Component } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import Footer from './components/Footer';
import Guestbook from './components/Guestbook';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

import { createToggle } from './lib/toggle';

const App: Component = () => {
  const [toggleLoginModal, setLoginModal] = createToggle({
    controls: 'loginModal'
  })
  const [toggleRegisterModal, setRegisterModal] = createToggle({
    controls: 'registerModal'
  })

  const [isLoggedIn, setLoggedIn] = createSignal(false);

  return (
    <>
      <nav class="bg-white border-gray-200 px-2 py-2.5 dark:bg-gray-900">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <a href="#" class="flex items-center">
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Guestbook</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul class="flex flex-col items-center p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
              </li>
              <li>
                <Show when={isLoggedIn()} fallback={
                  <button type="button" onClick={e => setLoginModal(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                }>
                  <button type="button" onClick={e => setLoggedIn(false)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </Show>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main class="flex grow bg-slate-200 dark:bg-slate-700">
        <div class="flex grow flex-col container mx-auto justify-center items-center">
          <LoginModal setModal={setLoginModal} setRegisterModal={setRegisterModal} setLoggedIn={setLoggedIn} />
          <RegisterModal setModal={setRegisterModal} />
          <Guestbook isLoggedIn={isLoggedIn()} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
