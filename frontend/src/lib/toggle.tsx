import { createSignal, JSX } from 'solid-js'

export const createToggle = (props: {
    controls: string
}): [() => boolean, (expand: boolean) => boolean] => {
    const [expanded, setExpanded] = createSignal(false)

    const set = (expand: boolean) => {
        const element = document.getElementById(props.controls)
        if (!element) return expand

        if (!expand) {
            element.classList.add('hidden')
        } else {
            element.classList.remove('hidden')
        }

        return setExpanded(expand)
    }

    const toggle = () => set(!expanded())

    return [
        toggle,
        set,
    ]
}