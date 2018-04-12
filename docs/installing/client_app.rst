FrontEnd - Client App
---------------------

Client App front end application 

- Html and Js client application
- Single page app (SPA)
- Cache layer

.. Warning::
    This service needs a proxy reverse like nginx or haproxy.

----------

**Installation by docker**

.. code-block:: yaml

    version: '2'

    services:
    client:
        image: maestroserver/client-maestro
        ports:
        - "80:80"
        environment:
        - "API_URL=http://localhost:8888"

.. code-block:: bash

    docker run -p 80:80 -e "API_URL=http://localhost:8888" maestroserver/client-maestro

Docker have installed nginx proxy.

----------

**Installation with node**

    - Nodejs 6 or 7

Download de repository

.. code-block:: bash

    git clone https://github.com/maestro-server/client-app.git

----------

**Install  dependences**

.. code-block:: bash

    npm install

----------

**Production  build**

.. code-block:: bash

    npm run build

----------

**Dev run**

.. code-block:: bash

    npm run dev

----------

**Env variables**

======================= ============================ =============================== 
Env Variables                   Example                    Description         
======================= ============================ =============================== 
API_URL                 http://localhost:8888        Server App Url                                           
STATIC_URL              /upload/                     Relative path of static content                
======================= ============================ =============================== 
