[
    {
        "id": "c02bff1d.bc531",
        "type": "tab",
        "label": "Twitter Bot"
    },
    {
        "id": "ee919c46.57591",
        "type": "twitter out",
        "z": "c02bff1d.bc531",
        "twitter": "",
        "name": "Tweet",
        "x": 884,
        "y": 85.5,
        "wires": []
    },
    {
        "id": "2fe1ce04.c046d2",
        "type": "function",
        "z": "c02bff1d.bc531",
        "name": "",
        "func": "var msg1 = {};\nmsg.payload = msg.payload.split(\"up\");\nmsg1.payload = \"I am, up since\" + msg.payload[1] + \"#nodered #raspberrypi #bot\";\nreturn msg1;",
        "outputs": 1,
        "noerr": 0,
        "x": 440,
        "y": 28.5,
        "wires": [
            [
                "ee919c46.57591"
            ]
        ]
    },
    {
        "id": "ed09c35f.96ee7",
        "type": "inject",
        "z": "c02bff1d.bc531",
        "name": "Uptime 0:00",
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "repeat": "",
        "crontab": "00 00 * * *",
        "once": false,
        "x": 107,
        "y": 28.5,
        "wires": [
            [
                "69edfeac.661c4"
            ]
        ]
    },
    {
        "id": "69edfeac.661c4",
        "type": "exec",
        "z": "c02bff1d.bc531",
        "command": "uptime",
        "addpay": false,
        "append": "-p",
        "useSpawn": "",
        "timer": "",
        "name": "",
        "x": 269,
        "y": 28.5,
        "wires": [
            [
                "2fe1ce04.c046d2"
            ],
            [],
            []
        ]
    },
    {
        "id": "abaf7f9c.701eb",
        "type": "get stations data",
        "z": "c02bff1d.bc531",
        "name": "",
        "creds": "b71bfc6f.5b329",
        "x": 318,
        "y": 84,
        "wires": [
            [
                "89332e88.a177d"
            ]
        ]
    },
    {
        "id": "89332e88.a177d",
        "type": "function",
        "z": "c02bff1d.bc531",
        "name": "Outer-Module min temp",
        "func": "var msg1 = {};\nvar msg2 = {};\n\nmsg1.payload = msg.payload.devices[0].modules[0].dashboard_data.min_temp;\nmsg2.payload = \"The lowest temp measured today was \" + msg1.payload + \"°C #netatmo #nodered #raspberrypi #bot\";\n\nreturn [msg2];",
        "outputs": "1",
        "noerr": 0,
        "x": 538,
        "y": 84,
        "wires": [
            [
                "ee919c46.57591"
            ]
        ]
    },
    {
        "id": "d0b43161.bfa84",
        "type": "inject",
        "z": "c02bff1d.bc531",
        "name": "Min Temp 08:00",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "00 08 * * *",
        "once": false,
        "x": 125,
        "y": 84,
        "wires": [
            [
                "abaf7f9c.701eb"
            ]
        ]
    },
    {
        "id": "8dc7e78e.1ab6f8",
        "type": "inject",
        "z": "c02bff1d.bc531",
        "name": "4h",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "14400",
        "crontab": "",
        "once": false,
        "x": 82,
        "y": 151,
        "wires": [
            [
                "29dfb80f.e0b268"
            ]
        ]
    },
    {
        "id": "29dfb80f.e0b268",
        "type": "influxdb in",
        "z": "c02bff1d.bc531",
        "influxdb": "c2d0ecc2.d68ba",
        "name": "Airrohr-DB",
        "query": "SELECT * FROM feinstaub ORDER BY time DESC LIMIT 1 ",
        "rawOutput": false,
        "precision": "",
        "retentionPolicy": "",
        "x": 285,
        "y": 151,
        "wires": [
            [
                "41507522.fc5b7c"
            ]
        ]
    },
    {
        "id": "41507522.fc5b7c",
        "type": "function",
        "z": "c02bff1d.bc531",
        "name": "Seperator",
        "func": "\nvar msg5 = {};\n\nmsg5.payload = \"In the Office Temp:\" + msg.payload[0].temperature + \"°C Hum:\" + msg.payload[0].humidity + \"% PM10:\" + msg.payload[0].SDS_P1 + \"µg/m³ PM2,5:\" + msg.payload[0].SDS_P2 + \"µg/m³ #PM10 #airrohr #Feinstaub\";\nreturn [msg5];\n",
        "outputs": "1",
        "noerr": 0,
        "x": 454.5,
        "y": 151,
        "wires": [
            [
                "ee919c46.57591"
            ]
        ]
    },
    {
        "id": "b71bfc6f.5b329",
        "type": "configNode",
        "z": "",
        "client_id": "",
        "client_secret": "",
        "username": "",
        "password": "",
        "device_id": ""
    },
    {
        "id": "c2d0ecc2.d68ba",
        "type": "influxdb",
        "z": "",
        "hostname": "127.0.0.1",
        "port": "8086",
        "protocol": "http",
        "database": "airrohr",
        "name": "",
        "usetls": false,
        "tls": ""
    }
]
