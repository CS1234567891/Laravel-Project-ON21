import type { Component, Show } from 'solid-js';
import { createResource } from 'solid-js';

const fetchGuestbooks = async () => (await fetch(`http://localhost:9000/api/guestbook`)).json();

const App: Component = () => {
  const [guestbooks] = createResource(fetchGuestbooks);

  return (
    <>
      <Show when={guestbooks()} fallback={<div>Loading...</div>}>
        {({ data }) => <For each={data}>
          {({ name, title, text }) => (<div class="border">
            <div>
              {name}
            </div>
            <div>
              {title}
            </div>
            <div>
              {text}
            </div>
          </div>)}
        </For>}
      </Show>
    </>
  );
};

export default App;
