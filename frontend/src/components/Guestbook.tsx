import type { Component } from 'solid-js';
import { createResource, createSignal, Show, For } from 'solid-js';
import CreateEntry from './CreateEntry';

const fetchGuestbooks = async (url) => (await fetch(url)).json();

const Guestbook: Component<{ isLoggedIn: any }> = (props) => {
    const [currentUrl, setCurrentUrl] = createSignal('http://localhost:9000/api/guestbook');
    const [guestbooks, { refetch }] = createResource(currentUrl, fetchGuestbooks);
    return (
        <>
            <Show when={guestbooks()} fallback={
                <div role="status">
                    <svg aria-hidden="true" class="mr-2 w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>}>
                {({ data, prev_page_url, next_page_url }) => (<div>
                    <div class="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
                        <For each={data}>
                            {({ id, name, title, text, updated_at }) => (
                                <Show when={props.isLoggedIn} fallback={
                                    <figure class="flex flex-col items-center justify-center m-2 p-4 text-center bg-white border-b border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                                        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                                            <p class="mt-4 font-light">{text}</p>
                                        </blockquote>
                                        <hr class="mb-4 mx-auto w-2/3 h-1 bg-gray-100 rounded border-0 dark:bg-gray-700" />
                                        <figcaption class="flex items-center justify-center space-x-3">
                                            <div class="space-y-0.5 font-medium dark:text-white">
                                                <div>{name}</div>
                                                <div class="text-sm font-light text-gray-500 dark:text-gray-400">{new Date(updated_at).toLocaleString()}</div>
                                            </div>
                                        </figcaption>
                                    </figure>
                                }>{() => (
                                    <form class="flex flex-col w-full m-4" onSubmit={async e => {
                                        e.preventDefault();
                                        const data = {
                                            name,
                                            title: e.target['title'].value,
                                            text: e.target['text'].value,
                                        };
                                        await fetch(`http://localhost:9000/api/guestbook/${id}`, {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(data),
                                        })
                                        refetch();
                                        return false;
                                    }}>
                                        <figure class="flex flex-col items-center justify-center m-2 p-4 text-center bg-white border-b border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                                            <blockquote class="max-w-2xl w-full mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400 space-y-2">
                                                <input type="title" id="title" value={title} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required />
                                                <textarea id="text" value={text} rows="4" cols="100" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a message..."></textarea>
                                            </blockquote>
                                            <div class="w-full">
                                                <hr class="mb-4 mx-auto w-2/3 h-1 bg-gray-100 rounded border-0 dark:bg-gray-700" />
                                                <div class="flex justify-between items-center dark:text-slate-400">
                                                    <button onClick={async e => {
                                                        await fetch(`http://localhost:9000/api/guestbook/${id}`, {
                                                            method: 'DELETE'
                                                        })
                                                        refetch();
                                                        return false;
                                                    }}
                                                        type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                    <figcaption class="flex items-center justify-center space-x-3">
                                                        <div class="space-y-0.5 font-medium dark:text-white">
                                                            <div>{name}</div>
                                                            <div class="text-sm font-light text-gray-500 dark:text-gray-400">{new Date(updated_at).toLocaleString()}</div>
                                                        </div>
                                                    </figcaption>
                                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </figure>
                                    </form>
                                )} </Show>
                            )}
                        </For>
                    </div>
                    <nav class="flex justify-center m-4" aria-label="Page navigation">
                        <ul class="inline-flex">
                            <li>
                                <Show when={prev_page_url}>
                                    {(url) => (
                                        <button onClick={e => setCurrentUrl(url)} class="px-3 py-2 ml-0 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                                    )}
                                </Show>
                            </li>
                            <li>
                                <Show when={next_page_url}>
                                    {(url) => (
                                        <button onClick={e => setCurrentUrl(url)} class="px-3 py-2 ml-0 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                                    )}
                                </Show>
                            </li>
                        </ul>
                    </nav>
                </div>)}
            </Show>

            <hr class="w-full my-8 bg-gray-200 dark:bg-gray-700" />

            {/* <CreateEntry /> */}


            <form class="flex flex-col w-full m-4" onSubmit={async e => {
                e.preventDefault();
                const data = {
                    name: e.target['name'].value,
                    title: e.target['title'].value,
                    text: e.target['text'].value,
                };
                e.target["reset"]();
                await fetch('http://localhost:9000/api/guestbook', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                refetch();
                return false;
            }}>
                <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">Add a new entry for the guestbook...</h1>
                <div class="mb-6">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required />
                </div>
                <div class="mb-6">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a title..." required />
                </div>
                <div class="mb-6">
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="text" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a message..."></textarea>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </>
    );
};

export default Guestbook;