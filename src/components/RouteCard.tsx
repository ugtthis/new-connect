import { Suspense, createSignal, type VoidComponent } from 'solid-js'
import dayjs from 'dayjs'

import Avatar from '~/components/material/Avatar'
import Card, { CardContent, CardHeader } from '~/components/material/Card'
import Icon from '~/components/material/Icon'
import RouteStaticMap from '~/components/RouteStaticMap'
import RouteStatistics from '~/components/RouteStatistics'

import type { RouteSegments } from '~/types'
import IconButton from './material/IconButton'
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription } from './PopoverComponents'

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

  const handlePopoverToggle = (event: Event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsPopoverOpen(!isPopoverOpen())
  }

  // const handleCardClick = (event: MouseEvent) => {
  //   if (isPopoverOpen()) {
  //     event.preventDefault()
  //     setIsPopoverOpen(false)
  //   }
  // }

  return (
    <Card 
      href={`/${props.route.dongle_id}/${props.route.fullname.slice(17)}`}
      // onClick={handleCardClick}
      // ref={cardRef}
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
            <PopoverContent onClose={() => setIsPopoverOpen(false)} class="relative">
              <PopoverTitle>More Information</PopoverTitle>
              <PopoverDescription>
                Route: {props.route.fullname}
              </PopoverDescription>
            </PopoverContent>
          )}
        </Popover>
      </div>
    </Card>
  )
}

export default RouteCard
