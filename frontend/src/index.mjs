import Task from './modules/task/index.mjs'
import emoji from './modules/emoji/emoji.mjs'

export const send = (task = '', message = {}, callback = false) => {
    return new Promise(async (resolve, reject) => {
        if(callback) {
            // console.log(`${emoji('moon')[1][0]}`, task + ' start')
            await Task.send(task, message,(event) => {
                // console.log(`    ${emoji('moon')[2][0]}`, task, 'finish');
                /**
                 * Неопределённое поведение если в одном месте есть callback а в другом нет
                 */
                (callback)
                    ? resolve(callback(event))
                    : resolve(event)
            })
        } else {
            // console.log(`    ${emoji('moon')[0][2]}`,`${task} stop`)
            // console.warn('set callback')
            resolve({
                status: true,
                message: 'stop',
                _scriptDir: import.meta.url
            })
        }
    })
}

export const wait = (task = '', call = (event) => { console.log('default call', event) }) => {
    // console.log(`${emoji('moon')[0][0]}`, task)
    return Task.wait(task, call)
}

export const list = () => {
    return new Promise((resolve, reject) => {
        Task.list().then((item) => {
            // console.log(`${emoji('moon')[0][1]}`,item.message)
            resolve(item)
        })
    })
}

export const close = (task = '')=> {
    return new Promise((resolve, reject) => {
        Task.close(task).then((item)=> {
            // console.log(`${emoji('moon')[0][3]}`, item.message)
            resolve(item)
        })
    })
}

export default `
    import { list, close, wait, send } from './index.mjs'
    
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
        console.log('close', await events.close('/task'))
        console.log('list', await events.list())
    })()
`