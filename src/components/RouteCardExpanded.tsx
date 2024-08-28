import { createSignal, Show, type VoidComponent } from 'solid-js'
import Button from '~/components/material/Button'
import Icon from '~/components/material/Icon'
import { setRoutePublic, setRoutePreserved } from '~/api/route'
import { USERADMIN_URL_ROOT } from '~/api/config'

interface RouteCardExpandedProps {
  routeName: string
  initialPublic: boolean
  initialPreserved: boolean
}

function createToggle<T>(initialValue: boolean, apiCall: (routeName: string, value: boolean) => Promise<T>) {
  const [value, setValue] = createSignal(initialValue)

  const toggle = (routeName: string) => {
    const newValue = !value()
    apiCall(routeName, newValue)
      .then(() => setValue(newValue))
      .catch((err) => {
        console.error(err)
        throw new Error('Failed to update toggle')
      })
  }

  return [value, toggle] as const
}

const RouteCardExpanded: VoidComponent<RouteCardExpandedProps> = (props) => {
  const [preserveRoute, togglePreserveRoute] = createToggle(props.initialPreserved, setRoutePreserved)
  const [makePublic, toggleMakePublic] = createToggle(props.initialPublic, setRoutePublic)
  const [error, setError] = createSignal<string | null>(null)
  const [copied, setCopied] = createSignal(false)

  const handleToggle = (toggleFn: (routeName: string) => void) => {
    setError(null)
    try {
      toggleFn(props.routeName)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const currentRouteId = () => props.routeName.replace('|', '/')

  const copyCurrentRouteId = async () => {
    if (!props.routeName || !navigator.clipboard) return

    try {
      await navigator.clipboard.writeText(currentRouteId())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy route ID: ', err)
    }
  }

  const openInUseradmin = () => {
    const url = `${USERADMIN_URL_ROOT}?${new URLSearchParams({ onebox: props.routeName }).toString()}`
    window.open(url, '_blank')?.focus()
  }

  return (
    <div class="flex flex-col border-x-2 border-surface-container-high bg-surface-container-lowest p-4">
      <div 
        class="mb-3 ml-2 text-body-sm text-zinc-500" 
        style={{'font-family':"'JetBrains Mono', monospace"}}
      >
        Route ID: {currentRouteId()}
      </div>

      <Show when={error()}>
        <div class="mb-4 flex items-center rounded-md bg-[rgb(150,51,51)] bg-opacity-[0.31] p-4 text-red-500">
          <Icon class="mr-4 text-yellow-300">warning</Icon>
          <span style={{'font-family': "'JetBrains Mono', monospace"}}>{error()}</span>
        </div>
      </Show>
      
      {/* Preserve Route */}
      <button
        class="flex w-full items-center justify-between rounded-t-md border-2 border-surface-container-high px-5 py-3 transition-colors hover:bg-surface-container-low"
        onClick={() => handleToggle(togglePreserveRoute)}
      >
        <span class="text-body-lg">Preserve Route</span>
        <ToggleSwitchButton active={preserveRoute()} />
      </button>

      {/* Make Public */}
      <button
        class="flex w-full items-center justify-between rounded-b-md border-2 border-t-0 border-surface-container-high px-5 py-3 transition-colors hover:bg-surface-container-low"
        onClick={() => handleToggle(toggleMakePublic)}
      >
        <span class="text-body-lg">Public Access</span>
        <ToggleSwitchButton active={makePublic()} />
      </button>

      <div class="mt-4 flex gap-2">
        {/* Copy Route ID */}
        <Button
          // TODO: Make this into a component and wierd rendering of hover since it has previous compoonent styles
          class="w-full rounded-sm border-2 border-surface-container-high bg-surface-container-lowest py-6 text-on-surface-variant hover:bg-surface-container-low"
          onClick={() => void copyCurrentRouteId()}
          leading={
            <Icon class={copied() ? 'text-green-300' : ''}>
              {copied() ? 'check' : 'file_copy'}
            </Icon>
          }
        >
          {copied() ? 'Copied!' : 'Route ID'}
        </Button>
        {/* USERADMIN*/}
        <Button 
          class="w-full rounded-sm border-2 border-surface-container-high bg-surface-container-lowest py-6 text-on-surface-variant hover:bg-surface-container-low" 
          onClick={openInUseradmin}
          leading={<Icon>open_in_new</Icon>}
        >
          View in useradmin
        </Button>
      </div>
    </div>
  )
}

const ToggleSwitchButton: VoidComponent<{ active: boolean }> = (props) => (
  <div
    class={`relative h-9 w-16 rounded-full transition-colors ${
      props.active ? 'bg-green-300' : 'border-4 border-surface-container-high'
    }`}
  >
    <div
      class={`absolute top-1 size-5 rounded-full bg-surface-container-high transition-transform duration-500 ease-in-out ${
        props.active ? 'top-2 translate-x-9' : 'translate-x-1'
      }`}
    />
  </div>
)

export default RouteCardExpanded
