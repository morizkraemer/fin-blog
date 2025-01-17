import env from './env-config.js'

const info = (message) => {
    console.log('-- INFO: --');
    console.log(message);
}

const error = (errormessage) => {
    if (env.MODE === 'test') {
        console.log('-- ERRORHANDLER: --');
        console.log(errormessage.name);
    } else {
        console.log('-- ERRORHANDLER: --');
        console.log(errormessage);
    }
}

export default { info, error }
