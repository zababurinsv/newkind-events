import isEmpty from '../isEmpty/isEmpty.mjs'
import emoji from '../emoji/emoji.mjs'
let source = {}
let target = {}
let remove = {}
remove = {}
source = {}
target = {}
remove = {}
target = new Proxy({}, {
    get: (obj, prop) => {
        return obj[prop];
    },
    set: (obj, prop, value) => {
        if(isEmpty(obj[prop])){
            obj[prop] = []
        }
        obj[prop].push(value);
        return true
    }
});

source  = new Proxy({}, {
    get: (obj, prop) => {
        return obj[prop];
    },
    set: (obj, prop, value) => {
        if(isEmpty(obj[prop])){
            obj[prop] = []
        }
        obj[prop].push(value);
        return true
    }
});

let list = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve({
                status: 'ok',
                success: true,
                message: {
                    target:target,
                    source:source,
                    remove:remove
                }
            })
        } catch (e) {
            resolve({
                status: 'false',
                success: false,
                message: e
            })
        }
    })
}

let close = (task) => {
    return new Promise(async (resolve, reject) => {
        try {
            isEmpty(source[`${task}`])
                ? delete target[`${task}`]
                : remove[`${task}`] = true
            resolve({
                status: 'ok',
                success: true,
                message: ''
            })
        } catch (e) {
            resolve({
                status: 'not ok',
                success: false,
                message: e
            })
        }
    })
}

let wait = (task, call) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!isEmpty(target[`${task}`])) {
                target[`${task}`] = { call: call }
                resolve(true)
            } else {
                if(isEmpty(source[`${task}`])) {
                    target[`${task}`] = { call: call }
                    resolve(true)
                } else {
                    console.log(`  ${emoji('moon')[2][1]}`, source[`${task}`][0]['task'])
                    target[`${task}`] = { call: call }
                    let item = target[`${task}`]
                    while(!isEmpty(source[`${task}`][0])) {
                        for(let i = 0; i < item.length; i++){
                            await item[i].call({
                                message: source[`${task}`][0]['message'],
                                task: source[`${task}`][0]['task'],
                                call: source[`${task}`][0]['call']
                            })
                        }
                        source[`${task}`].shift()
                    }
                    if(remove[`${task}`]) {
                        delete target[`${task}`]
                        delete remove[`${task}`]
                    }
                    delete source[`${task}`]
                    resolve(true)
                }
            }
        } catch (e) {
            console.log('error', e)
            resolve(false)
        }
    })
}


let promise = (task, message, call) => {
    return new Promise((resolve, reject) => {
        try {
            if(isEmpty(target[`${task}`])) {
                console.log(`  ${emoji('moon')[2][3]}`, task + ' process')
                source[`${task}`] = {
                    message: message,
                    task: task,
                    call: call
                }
                resolve(true)
            } else {
                console.log(`  ${emoji('moon')[1][3]}`, task + ' process')
                source[`${task}`] = {
                    message: message,
                    task:task,
                    call: call
                }
                while(!isEmpty(source[`${task}`][0])) {
                    target[`${task}`].forEach(item => {
                        item.call({
                            message: source[`${task}`][0]['message'],
                            task: source[`${task}`][0]['task'],
                            call: source[`${task}`][0]['call']
                        })
                    });
                    source[`${task}`].shift()
                }
                if(remove[`${task}`]) {
                    delete target[`${task}`]
                    delete remove[`${task}`]
                }
                delete source[`${task}`]
                resolve(true)
            }
        } catch (e) {
            resolve({
                status: 'false',
                success: false,
                message: e
            })
        }
    })
}

export default  {
    list: list,
    close: close,
    await: wait,
    promise: promise
}