# connect

connect is the web and mobile experience for [openpilot](https://github.com/commaai/openpilot).

Try it out at https://new-connect.connect-d5y.pages.dev.

This is a rewrite of [comma connect](https://github.com/commaai/connect-pwa-archive).

## Development

`./live.sh` is probably all you want to use (it'll take care of setup).

For a full fresh setup in `$HOME`:
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc  # or source ~/.zshrc

cd ~
git clone https://github.com/commaai/connect.git

cd connect
bun install  # sets up pre-commit hook
bun dev
```

## Contributing

Join the `#dev-connect-web` channel on our [Discord](https://discord.comma.ai).

connect has a demo mode, so no special comma device is needed to develop connect.

A few constraints to keep connect light and the dev environment fun:
* 5k line limit
* 500KB bundle size limit
* 1m timeout for all CI

References:
* [API docs](https://api.comma.ai)
* [openpilot docs](https://docs.comma.ai)
* [Discord](https://discord.comma.ai)
* [Bounties](https://comma.ai/bounties)

## Roadmap

The first goal is to replace current connect and get this shipped to https://connect.comma.ai.

[This milestone](https://github.com/commaai/connect/milestone/1) tracks that progress. Most of the issues there are [paid bounties](https://comma.ai/bounties).

Once we've shipped v1, next up will be:
* [Sentry mode](https://www.youtube.com/watch?v=laO0RzsDzfU)
* SSH console for openpilot developers
* Replace snapshot with a live stream
* openpilot clips, like this [community tool](https://github.com/nelsonjchen/op-replay-clipper)
* Manage the settings on your comma 3X
* Car mangement: lock doors, EV charge status, etc.
