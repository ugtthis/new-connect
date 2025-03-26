import clsx from 'clsx'
import { For, Suspense, VoidComponent } from 'solid-js'

const StatisticBar: VoidComponent<{ class?: string; statistics: { label: string; value: () => unknown }[] }> = (props) => {
  return (
    <div class="flex flex-col">
      <div class={clsx('flex flex-row flex-nowrap justify-between w-full', props.class)}>
        <For each={props.statistics}>
          {(statistic) => (
            <div class="flex flex-col min-w-0">
              <span class="text-body-sm text-on-surface-variant whitespace-nowrap">{statistic.label}</span>
              <Suspense fallback={<div class="h-[20px] w-auto skeleton-loader rounded-xs" />}>
                <span class="font-mono text-label-lg uppercase truncate">{statistic.value()?.toString() ?? '—'}</span>
              </Suspense>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

export default StatisticBar
