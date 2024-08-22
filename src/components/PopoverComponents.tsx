import { ParentProps, JSX, splitProps } from 'solid-js'

export const PopoverTrigger = (props: JSX.IntrinsicElements['button']) => {
  return (
    <button {...props}>
      {props.children}
    </button>
  )
}

interface PopoverContentProps extends ParentProps {
  class?: string;
}

export const PopoverContent = (props: PopoverContentProps) => {
  const [local, rest] = splitProps(props, ['class', 'children'])

  return (
    <div
      class={`z-50 rounded-md border bg-white p-4 text-gray-900 shadow-md outline-none ${local.class || ''}`}
      {...rest}
    >
      {local.children}
    </div>
  )
}

interface PopoverProps extends ParentProps {
  gutter?: number;
}

export const Popover = (props: PopoverProps) => {

  return (
    <div class="relative inline-block">
      {props.children}
    </div>
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
