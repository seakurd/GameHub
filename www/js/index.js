document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device is ready');
    console.log('Cordova version: ' + cordova.version);
}
