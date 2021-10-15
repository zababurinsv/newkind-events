import task from './index.mjs'

export default async () => {

    await task.send('/task', {test:"test"}, (event) => {

        console.log('~~~~~~~~~~2~~~~~~~', event.task)
    })

}