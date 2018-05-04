
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
        - "MAESTRO_DATA_URI=http://data:5000"

    discovery-celery:
        image: maestroserver/discovery-maestro-celery
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_DATA_URI=http://data:5000"

Run docker compose

.. code-block:: bash
    
    docker-compose up -d

Or docker run

.. code-block:: bash

    docker run -p 5000:5000  -e "MAESTRO_DATA_URI=http://data:5000" -e "CELERY_BROKER_URL=amqp://rabbitmq:5672" maestroserver/discovery-maestro 
 
    docker run -e "MAESTRO_DATA_URI=http://data:5000" -e "CELERY_BROKER_URL=amqp://rabbitmq:5672" maestroserver/discovery-maestro-celery 

----------

**Installation with python 3**

    - Python >3.4
    - RabbitMQ

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

======================= ============================ ============================
Env Variables                   Example                    Description         
======================= ============================ ============================     
MAESTRO_DATA_URI        http://localhost:5010        Data Layer API URL
MAESTRO_SECRETJWT       xxxx                         Same that Server App
MAESTRO_TRANSLATE_QTD   200                          Prefetch translation process
MAESTRO_GWORKERS        2                            Gunicorn multi process
CELERY_BROKER_URL       amqp://rabbitmq:5672         RabbitMQ connection
CELERYD_TASK_TIME_LIMIT 10                           Timeout workers
======================= ============================ ============================
