====================
Cloud Inventory
====================

Cloud Inventory able to catalog and manager system in multi-cloud environment

- Server manager in multi-cloud
- Reports with advanced filters
- ‎Scheduler commands with Ansible
- ‎Auto Discovery for cloud environment

Architecture
------------

.. image:: ../_static/screen/arch_1.png

Cloud inventory services is:


Server API
----------

Server App main application, some responsibility is 

- Authentication and authorization
- Validate and create entities (crud ops)
- Proxy to others services
- Unique service can be access by world

.. Warning::
	Only this service can be external access

----------

**Installation by docker**

.. code-block:: yaml

    version: '2'

    services:
    server:
        image: maestroserver/server-maestro
        ports:
        - "8888:8888"
        environment:
        - "MAESTRO_PORT=8888"
        - "MAESTRO_MONGO_URI=mongodb/maestro-client"
        - "MAESTRO_DISCOVERY_TIMEOUT=10000"
        - "MAESTRO_DISCOVERY_URL=http://discovery:5000"


.. code-block:: bash

    docker run -p 8888:8888 -e "MAESTRO_PORT=8888" -e "MAESTRO_MONGO_URI=mongodb/maestro-client" -e "MAESTRO_DISCOVERY_TIMEOUT=10000" -e "MAESTRO_DISCOVERY_URL=http://discovery:5000" maestroserver/server-maestro 

----------

**Installation with node**

    - Nodejs 6 or 7
    - Npm
    - MongoDB
    - Gcc + python (bcrypt package, if need be compilate)

Download de repository

.. code-block:: bash

    git clone https://github.com/maestro-server/server-app.git

----------

**Install  dependences**

.. code-block:: bash

    cd server-app
    npm install

----------

**Configure some env variable**

create .env file

.. code-block:: bash

    SMTP_PORT=1025
    SMTP_HOST=localhost
    SMTP_SENDER='maestro@gmail.com'
    SMTP_IGNORE=true

    MAESTRO_PORT=8888
    MAESTRO_MONGO_URI='localhost/maestro-client'

and

.. code-block:: bash

    npm run server

----------

For production environment, need to use pm2 or forever lib.

Like:

.. code-block:: bash

    npm install -g pm2

    # Create a file pm2.json

    {
    "apps": [{
        "name": "server-maestro",
        "script": "./server.js",
        "env": {
        "production": true,
        "PORT": 8888
        }
    }]
    }

.. code-block:: bash

    pm2 start --json pm2.json

----------

**Env variables**

======================= ============================ =========================== 
Env Variables                   Example                    Description         
======================= ============================ =========================== 
PORT                    8888                                                    
NODE_ENV                development|production                                  
MONGO_URL               localhost/maestro-client     DB string connection       
SECRETJWT               XXXX                                                  
SECRETJWT_FORGOT        XXXX                                                      
SECRET_CRYPTO_FORGOT    XXXX                                                      
SMTP_PORT               1025                                                    
SMTP_HOST               localhost                                               
SMTP_SENDER             felipeklerkk@XXXX                                    
SMTP_IGNORE             true|false                                              
AWS_ACCESS_KEY_ID       XXXX                                                    
AWS_SECRET_ACCESS_KEY   XXXX                                                    
AWS_DEFAULT_REGION      us-east-1                                               
S3_BUCKET_NAME          maestroserver                                           
UPLOAD_TYPE             S3/Local                                                
LOCAL_DIR               /static/upload                                          
URL_DISCOVERY           http://localhost:5000        Url discovery-app (flask)  
URL_REPORTS             http://localhost:5005        Url reports-app (flask)    
======================= ============================ =========================== 

----------

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

----------

Discovery App
-------------

Discovery App service to connect and crawler provider

- Encharge to manager and authenticate in each provider
- Crawler the data and record into db
- Consume batch insert data

----------

**Installation by docker**

.. code-block:: yaml

    version: '2'

    services:
    discovery:
        image: maestroserver/discovery-maestro
        ports:
        - "5000:5000"
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_PORT=5000"
        - "MAESTRO_MONGO_URI=mongodb"
        - "MAESTRO_MONGO_DATABASE=maestro-client"

    celery:
        image: maestroserver/discovery-maestro-celery
        environment:
        - "MAESTRO_DISCOVERY_URL=http://discovery"
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_PORT=5000"

----------

**Installation with python 3**

    - Python >3.4
    - RabbitMQ
    - MongoDB

Download de repository

.. code-block:: bash

    git clone https://github.com/maestro-server/discovery-api.git

----------

**Install  dependences**

.. code-block:: bash

    pip install -r requeriments.txt

----------

**Install  run api**

.. code-block:: bash

    python -m flask run.py

    or

    FLASK_APP=run.py FLASK_DEBUG=1 flask run

    or 

    npm run server

----------

**Install  run rabbit workers**

.. code-block:: bash

    celery -A app.celery worker -E -Q discovery --hostname=discovery@%h --loglevel=info

    or 

    npm run celery

----------

.. Warning::

    For production environment, use something like gunicorn.

    .. code-block:: python

        # gunicorn_config.py

        import os

        bind = "0.0.0.0:" + str(os.environ.get("MAESTRO_PORT", 5000))
        workers = os.environ.get("MAESTRO_GWORKERS", 2)

----------

**Env variables**

======================= ============================ =========================== 
Env Variables                   Example                    Description         
======================= ============================ =========================== 
MAESTRO_MONGO_URI       'localhost'                  Mongo Url conn
MAESTRO_MONGO_DATABASE  'maestro-client'     
MAESTRO_DISCOVERY_URL   'http://localhost'           Discovery API URL
MAESTRO_DISCOVERY_PORT  5000                         Discovery API Port
MAESTRO_SECRETJWT       'xxxx'                       Same that Server App
MAESTRO_SCAN_QTD        200  
CELERY_BROKER_URL       amqp://rabbitmq:5672"        RabiitMQ connection
======================= ============================ =========================== 

----------

Scheduler App
-------------

Scheduler App service to execute schedule crawler job

- Celery beat, to create a jobs calling discovery app

----------

**Installation by docker**

.. code-block:: yaml

    version: '2'

    services:
    scheduler:
        image: maestroserver/scheduler-maestro
        environment:
        - "MAESTRO_DISCOVERY_URL=http://discovery"
        - "MAESTRO_DISCOVERY_PORT=5000"
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_MONGO_URI=mongodb"
        - "MAESTRO_MONGO_DATABASE=maestro-client"

----------

**Installation with python 3**

    - Python >3.4
    - RabbitMQ
    - MongoDB

Download de repository

.. code-block:: bash

    git clone https://github.com/maestro-server/scheduler-app.git

----------

**Install  run rabbit workers**

.. code-block:: bash

    celery -A app.celery worker -E --hostname=scheduler@%h --loglevel=info

    or 

    npm run celery

----------

**Env variables**

======================= ============================ =========================== 
Env Variables                   Example                    Description         
======================= ============================ =========================== 
MAESTRO_DISCOVERY_URL   'http://localhost'           Discovery API URL
MAESTRO_DISCOVERY_PORT  5000                         Discovery API Port
CELERY_BROKER_URL       amqp://rabbitmq:5672"        RabiitMQ connection
======================= ============================ =========================== 

----------


Report
------

Reports app, generate reports

- Understand complex queries and generate reports
- Manage storage and control each technical flow
- Transform in artifact pdf, csv or json

----------

**Installation by docker**

.. code-block:: yaml

    version: '2'

    services:
    discovery:
        image: maestroserver/discovery-maestro
        ports:
        - "5000:5000"
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_PORT=5000"
        - "MAESTRO_MONGO_URI=mongodb"
        - "MAESTRO_MONGO_DATABASE=maestro-client"

    celery:
        image: maestroserver/discovery-maestro-celery
        environment:
        - "MAESTRO_DISCOVERY_URL=http://discovery"
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_PORT=5000"

----------

**Installation with python 3**

    - Python >3.4
    - RabbitMQ
    - MongoDB

Download de repository

.. code-block:: bash

    git clone https://github.com/maestro-server/report-app.git

----------

**Install  run api**

.. code-block:: bash

    python -m flask run.py

    or

    FLASK_APP=run.py FLASK_DEBUG=1 flask run

    or 

    npm run server

----------

**Install  run rabbit workers**

.. code-block:: bash

    celery -A app.celery worker -E -Q report --hostname=report@%h --loglevel=info

    or 

    npm run celery

----------

.. Warning::

    For production environment, use something like gunicorn.

    .. code-block:: python

        # gunicorn_config.py

        import os

        bind = "0.0.0.0:" + str(os.environ.get("MAESTRO_PORT", 5005))
        workers = os.environ.get("MAESTRO_GWORKERS", 2)

----------

**Env variables**

======================= ============================ =========================== 
Env Variables                   Example                    Description         
======================= ============================ =========================== 
MAESTRO_MONGO_URI       'localhost'                  Mongo Url conn
MAESTRO_MONGO_DATABASE  'maestro-client'     
MAESTRO_DISCOVERY_URL   'http://localhost'           Discovery API URL
MAESTRO_DISCOVERY_PORT  5000                         Discovery API Port
MAESTRO_SECRETJWT       'xxxx'                       Same that Server App
MAESTRO_SCAN_QTD        200  
CELERY_BROKER_URL       amqp://rabbitmq:5672"        RabiitMQ connection
======================= ============================ ===========================

----------

Playbook Server
---------------

Playbook server, execute a remote commands
- Create and manage a encapsulate environments
- Connect remotely
- Execute playbook jobs
- Manage failback and notification

.. Danger::
	This service is under development