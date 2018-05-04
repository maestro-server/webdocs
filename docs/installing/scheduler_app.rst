
Scheduler App
-------------

Scheduler App service to manage and execute jobs

- Schedule jobs, interval or crontab
- Requests chain jobs
- Modules
    - Webhook: Call URL request
    - Connections: Call Crawler task

----------

**Installation by docker**

.. code-block:: yaml

    version: '2'

    services:
        scheduler:
            image: maestroserver/scheduler-maestro
            environment:
            - "MAESTRO_DATA_URI=http://data:5000"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_MONGO_URI=localhost"
            - "MAESTRO_MONGO_DATABASE=maestro-client"

        scheduler:
            image: maestroserver/scheduler-maestro-celery
            environment:
            - "MAESTRO_DATA_URI=http://data:5000"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_MONGO_URI=localhost"
            - "MAESTRO_MONGO_DATABASE=maestro-client"

 Run docker compose

.. code-block:: bash
    
    docker-compose up -d

Or docker run

.. code-block:: bash

    docker run -e "MAESTRO_DATA_URI=http://data:5000" -e "CELERY_BROKER_URL=amqp://rabbitmq:5672" maestroserver/scheduler-maestro
 
    docker run -e "MAESTRO_DATA_URI=http://data:5000" -e "CELERY_BROKER_URL=amqp://rabbitmq:5672" maestroserver/scheduler-maestro-celery 
       
----------

**Installation with python 3**

    - Python >3.4
    - RabbitMQ
    - MongoDB

Download de repository

.. code-block:: bash

    git clone https://github.com/maestro-server/scheduler-app.git

----------

**Install  run celery beat**

.. code-block:: bash

    celery -A app.celery beat -S app.schedulers.MongoScheduler --loglevel=info

    or 

    npm run beat

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
MAESTRO_DATA_URI        http://data:5000             Data Layer API URL
MAESTRO_MONGO_URI       localhost                    MongoDB URI
MAESTRO_MONGO_DATABASE  maestro-client               Mongo Database name
CELERY_BROKER_URL       amqp://rabbitmq:5672         RabbitMQ connection
======================= ============================ =========================== 
