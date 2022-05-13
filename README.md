# @newkind/events

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
    - [Install](#install)
- [License](#license)

## Getting Started

It is librari for easy to use test of mocha.js devTool eruda and events bus for uour projects 

### Install

Installing `@newkind/events` with npm
```console
$ npm i @newkind/events
```
Installing `@newkind/events` with yarn
```console
$ yarn add @newkind/events
```

### Example
```jsx
<script type="module">
  import { list, close, wait, send } from './index.mjs'
 
  (async () => {

  send('/task', {send:"send"}, (event) => {
    console.log('events', event.task)
  }).catch(e => {console.log('error', e)})

  send('/task', {send:"send"}, (event) => {
    console.log('events', event.task)
  }).catch(e => {console.log('error', e)})

  wait('/task', async (object) => {
    object.call({task: 1, status:'test'})
  }).catch(e => {console.log('error', e)})

  wait('/task', async (object) => {
    object.call({task: 2, status:'test'})
  }).catch(e => {console.log('error', e)})

  send('/task', {test:"test"}, (event) => {
    console.log('events', event.task)
  }).catch(e => {console.log('error', e)})

  send('/task', {test:"test"}, (event) => {
    console.log('events', event.task)
  }).catch(e => {console.log('error', e)})
   console.log('close', close('/task'))
   console.log('list', list())
})()
</script>
```
## License

*GNU GENERAL PUBLIC LICENSE version 3* by [Zababurin Sergey](https://raw.githubusercontent.com/zababurinsv/z-events/master/LICENSE) converted to Markdown. Read the [original GPL v3](http://www.gnu.org/licenses/).