import isEmpty from '../isEmpty/isEmpty.mjs'
import emoji from '../emoji/emoji.mjs'

let remove = {}

const target = new Proxy({}, {
    set: (obj, prop, value) => {
        if(isEmpty(obj[prop])){
            obj[prop] = []
        }
        obj[prop].push(value);
        return true
    }
});

const source  = new Proxy({}, {
    set: (obj, prop, value) => {
        if(isEmpty(obj[prop])){
            obj[prop] = []
        }
        obj[prop].push(value);
        return true
    }
});

const events = (task) => {
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
}

const list = () => {
    return {
        target:target,
        source:source,
        remove:remove
    }
}

const close = (task) => {
    return isEmpty(source[`${task}`])
        ? (delete target[`${task}`], true)
        : (remove[`${task}`] = true, true)
}

const wait = (task, call) => {
    return new Promise(async (resolve, reject) => {
        try {
            target[`${task}`] = { call: call }

            if(!isEmpty(source[`${task}`])) {
                events(task)
            }

            resolve(true)
        } catch (e) {
            console.log('error', e)
            resolve(false)
        }
    })
}

const send = (task, message, call) => {
    return new Promise((resolve, reject) => {
        try {
            source[`${task}`] = {
                message: message,
                task: task,
                call: call
            }

            if(!isEmpty(target[`${task}`])) {
                events(task)
            }

            resolve(true)
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
    list,
    close,
    wait,
    send
}