
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
MAESTRO_DISCOVERY_URL   http://localhost             Discovery API URL
MAESTRO_DISCOVERY_PORT  5000                         Discovery API Port
CELERY_BROKER_URL       amqp://rabbitmq:5672         RabbitMQ connection
======================= ============================ =========================== 
