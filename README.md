# z-events

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
    - [Install](#install)
- [License](#license)

## Getting Started

It is librari for easy to use test of mocha.js devTool eruda and events bus for uour projects 

### Install

Installing `@newkind/events` with npm
```console
$ npm i z-events
```
Installing `@newkind/events` with yarn
```console
$ yarn add @newkind/events
```

### Example
```jsx
<script type="module">
    import events from './index.mjs'
    (async () => {
        await events.send('/task', {})

        await events.wait('/task', async (object) => {
            object.call({task: 1, status:'1111111111'})
        })

        await events.wait('/task', async (object) => {
            object.call({task: 2, status:'2222222222'})
        })

        await events.send('/task', {test:"test"}, (event) => {
            console.log('events', event.task)
        })
        await events.list()
        await events.close('/task')
    })()
</script>
```
## License

*GNU GENERAL PUBLIC LICENSE version 3* by [Zababurin Sergey](https://raw.githubusercontent.com/zababurinsv/z-events/master/LICENSE) converted to Markdown. Read the [original GPL v3](http://www.gnu.org/licenses/).