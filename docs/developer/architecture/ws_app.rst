
WebSocket APP
---------------

It's websocket server with restfull hooks, maestro websocket use centrifugo project.
- Client notification using webscokets

Websocket system using `Centrifugo OpenSource project <https://github.com/centrifugal>`_ (Centrifugo OpenSource project).

---------------

.. image:: ../../_static/screen/arch_ws.png

**Setup dev env**

.. code-block:: bash

    # Generate config
    docker run maestro-websocket centrifugo genconfig

    # Run websocket
    docker run -e MAESTRO_WEBSOCKET_SECRET='secret' -e MAESTRO_SECRETJWT='jwttoken' maestroserver/websocket-maestro

    # Run centrifugo with admin enabled
    docker run -e CENTRIFUGO_ADMIN='pass' -e CENTRIFUGO_ADMIN_SECRET='jwttoken' maestroserver/websocket-maestro

----------

Download de repository (Centrifugal project)

.. code-block:: bash

    git clone https://github.com/centrifugal/centrifugo

----------

**Endpoints**

Client access
 
.. code-block:: javascript

    var centrifuge = new Centrifuge('ws://{server}/connection/websocket');

    centrifuge.subscribe("news", function(message) {
        console.log(message);
    });

    centrifuge.connect();


Backend access

.. code-block:: javascript

    import json
    import requests

    command = {
        "method": "publish",
        "params": {
            "channel": "maestro#${ID-USER}", 
            "data": {
                "notify": { // call notify
                    "title": "<string>",
                    "msg": "<string>",
                    "type": "danger|warning|info|success"
                },
                "event": {
                    "caller": "<string>" //custom event on client
                }
            }
        }
    }

----------

**Env variables**

========================= ================== ==========================================
Env Variables                 Example           Description                           
========================= ================== ==========================================
MAESTRO_WEBSOCKET_SECRET  backSecretToken    Token to authenticate backends apps      
MAESTRO_SECRETJWT         frontSecretToken   Token to autheticate front end users     
CENTRIFUGO_ADMIN          adminPassword      Admin password                           
CENTRIFUGO_ADMIN_SECRET   adminSecretToken   Token to autheticate administrator users 
========================= ================== ==========================================