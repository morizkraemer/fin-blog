const info = (message) => {
    console.log('-- INFO: --');
    console.log(message);
}

const error = (errormessage) => {
    console.log('-- ERRORHANDLER: --');
    console.log(errormessage.name);
}

export default { info, error }
