
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
MAESTRO_MONGO_URI       localhost                    Mongo Url conn
MAESTRO_MONGO_DATABASE  maestro-client       
MAESTRO_DISCOVERY_URL   http://localhost             Discovery API URL
MAESTRO_DISCOVERY_PORT  5000                         Discovery API Port
MAESTRO_SECRETJWT       xxxx                         Same that Server App
MAESTRO_SCAN_QTD        200  
CELERY_BROKER_URL       amqp://rabbitmq:5672         RabbitMQ connection
======================= ============================ =========================== 
