import { Suspense, createSignal, type VoidComponent } from 'solid-js'
import dayjs from 'dayjs'

import Avatar from '~/components/material/Avatar'
import Card, { CardContent, CardHeader } from '~/components/material/Card'
import Icon from '~/components/material/Icon'
import RouteStaticMap from '~/components/RouteStaticMap'
import RouteStatistics from '~/components/RouteStatistics'
import type { RouteSegments } from '~/types'
import IconButton from './material/IconButton'
import { Popover, PopoverTrigger, PopoverContent } from './PopoverComponents'

const RouteHeader = (props: { route: RouteSegments }) => {
  const startTime = () => dayjs(props.route.start_time_utc_millis)
  const endTime = () => dayjs(props.route.end_time_utc_millis)

  const headline = () => startTime().format('ddd, MMM D, YYYY')
  const subhead = () => `${startTime().format('h:mm A')} to ${endTime().format('h:mm A')}`

  return (
    <CardHeader
      headline={headline()}
      subhead={subhead()}
      leading={
        <Avatar>
          <Icon>directions_car</Icon>
        </Avatar>
      }
    />
  )
}

interface RouteCardProps {
  route: RouteSegments
}

const RouteCard: VoidComponent<RouteCardProps> = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = createSignal(false)
  const [isPreserve, setIsPreserve] = createSignal(false)
  const [isPublic, setIsPublic] = createSignal(false)

  const handlePopoverToggle = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    setIsPopoverOpen(!isPopoverOpen())
  }

  const handleCopyRouteId = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    void navigator.clipboard.writeText(props.route.fullname)
    alert('Copied!')
  }

  const handleShareLink = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    const shareData = {
      title: 'Route',
      text: 'Check out this route!',
      url: `https://example.com/routes/${props.route.fullname}`,
    }
    navigator.share(shareData).catch(console.error)
  }

  const handleToggleClick = (event: Event, setter: (value: boolean) => void) => {
    event.preventDefault()
    event.stopPropagation()
    setter((prev) => !prev)
  }

  return (
    <Card 
      href={`/${props.route.dongle_id}/${props.route.fullname.slice(17)}`}
      onClick={() => isPopoverOpen() && setIsPopoverOpen(false)}
    >
      <RouteHeader route={props.route} />

      <div class="mx-2 h-48 overflow-hidden rounded-lg">
        <Suspense fallback={<div class="skeleton-loader size-full bg-surface" />}>
          <RouteStaticMap route={props.route} />
        </Suspense>
      </div>

      <CardContent>
        <RouteStatistics route={props.route} />
      </CardContent>

      <div class="flex justify-end px-4 pb-4">
        <Popover>
          <PopoverTrigger onClick={handlePopoverToggle}>
            <IconButton size="24">
              more_horiz
            </IconButton>
          </PopoverTrigger>

          {isPopoverOpen() && (
            <PopoverContent>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span>Preserve</span>
                  <button
                    class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${isPreserve() ? 'bg-green-500' : 'bg-gray-200'}`}
                    onClick={(e) => handleToggleClick(e, setIsPreserve)}
                  >
                    <span class={`inline-block size-4 rounded-full bg-white transition-transform duration-200 ${isPreserve() ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <span>Public</span>
                  <button
                    class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${isPublic() ? 'bg-green-500' : 'bg-gray-200'}`}
                    onClick={(e) => handleToggleClick(e, setIsPublic)}
                  >
                    <span class={`inline-block size-4 rounded-full bg-white transition-transform duration-200 ${isPublic() ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div class="flex space-x-2">
                  <button 
                    onClick={handleCopyRouteId} 
                    class="w-full rounded-md bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    Copy Route ID
                  </button>
                  <button 
                    onClick={handleShareLink} 
                    class="w-full rounded-md bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    Share
                  </button>
                </div>
              </div>
            </PopoverContent>
          )}
        </Popover>
      </div>
    </Card>
  )
}

export default RouteCard
