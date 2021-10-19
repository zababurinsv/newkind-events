import Task from './modules/task/index.mjs'
import emoji from './modules/emoji/emoji.mjs'

let send = (task = '', message = {}, callback = false) => {
    return new Promise(async (resolve, reject) => {
        if(callback) {
            console.log(`${emoji('moon')[1][0]}`, task + ' start')
            await Task.promise(task, message,(event) => {
                console.log(`    ${emoji('moon')[2][0]}`, task, 'finish');
                /**
                 * Неопределённое поведение если в одном месте есть callback а в другом нет
                 */
                (callback)
                    ? resolve(callback(event))
                    : resolve(event)
            })
        } else {
            console.log(`    ${emoji('moon')[0][2]}`,`${task} stop`)
            console.warn('set callback')
            resolve({
                status: true,
                message: 'stop',
                _scriptDir: import.meta.url
            })
        }
    })
}

let wait = (task = '', call = (event) => { console.log('default call', event) }) => {
        console.log(`${emoji('moon')[0][0]}`, task)
        return Task.wait(task, call)
    }

let list = () => {
    return new Promise((resolve, reject) => {
        Task.list().then((item) => {
            console.log(`${emoji('moon')[0][1]}`,item.message)
            resolve(item)
        })
    })
}

let close = (task = '')=> {
    return new Promise((resolve, reject) => {
        Task.close(task).then((item)=> {
            console.log(`${emoji('moon')[0][3]}`, item.message)
            resolve(item)
        })
    })
}

export default {
    send: send,
    wait: wait,
    list: list,
    close: close
}