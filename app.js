'use strict';

function onConnected() {
    document.querySelector('#progressbar').classList.add('hidden');
    document.querySelector('.connect-button').removeAttribute("disabled");
    console.log("BLE connected");
    dialog.close();    
}

function onDisconnected() {
    console.log("BLE disconnected");
    // document.querySelector('.connect-button').classList.remove('hidden');
    // document.querySelector('form').classList.remove('hidden');
}

function connect() {

    document.querySelector('.connect-button').setAttribute("disabled","");
    document.querySelector('#progressbar').classList.remove('hidden');

    navigator.bluetooth.requestDevice(
    {
        acceptAllDevices: true
    })
    .then(device => {
        console.log('> Found ' + device.name);
        console.log('Connecting to GATT Server...');
        device.addEventListener('gattserverdisconnected', onDisconnected)
        return device.gatt.connect();
    })
    .catch(error => {
        console.log('Argh! ' + error);
        document.querySelector('#progressbar').classList.add('hidden');
        document.querySelector('.connect-button').removeAttribute("disabled");
        var notification = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar(
            {
                message: 'Error while connecting to BLE, please try again.'
            }
        );
    });
}