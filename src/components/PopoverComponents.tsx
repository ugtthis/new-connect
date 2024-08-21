import { ParentProps, JSX, mergeProps, splitProps } from 'solid-js'

export const PopoverTrigger = (props: JSX.IntrinsicElements['button']) => {
  return (
    <button {...props}>
      {props.children}
    </button>
  )
}

export const PopoverTitle = (props: JSX.IntrinsicElements['h3']) => {
  return (
    <h3 {...props} class="text-lg font-semibold">
      {props.children}
    </h3>
  )
}

export const PopoverDescription = (props: JSX.IntrinsicElements['p']) => {
  return (
    <p {...props} class="text-sm text-gray-600">
      {props.children}
    </p>
  )
}

export const Popover = (props: ParentProps<{ gutter?: number }>) => {
  const mergedProps = mergeProps({ gutter: 4 }, props)

  return (
    <div {...mergedProps}>
      {props.children}
    </div>
  )
}

interface PopoverContentProps extends ParentProps {
  class?: string
  onClose?: () => void
}

export const PopoverContent = (props: PopoverContentProps) => {
  const [local, rest] = splitProps(props, ['class', 'children', 'onClose'])

  return (
    <div
      class={
        'z-50 w-72 rounded-md border bg-white p-4 text-gray-900 shadow-md outline-none ' +
        (local.class || '')
      }
      {...rest}
    >
      {local.children}
      <button
        class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
        onClick={local.onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="size-4"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18 6L6 18M6 6l12 12"
          />
          <title>Close</title>
        </svg>
      </button>
    </div>
  )
}
