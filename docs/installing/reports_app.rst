
Reports App
----------

Reports app, generate reports

- Understand complex queries and generate reports
- Manage storage and control each technical flow
- Transform in artifact pdf, csv or json

----------

**Installation by docker**

.. code-block:: yaml

    version: '2'

    services:
        reports:
            image: maestroserver/reports-maestro
            environment:
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_MONGO_URI=mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-reports"

        reports_worker:
            image: maestroserver/reports-maestro-celery
            environment:
            - "MAESTRO_DATA_URI=http://data:5000"
            - "MAESTRO_DISCOVERY_URL=http://discovery:5000"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"

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

    python -m flask run.py --port 5005 

    or

    FLASK_APP=run.py FLASK_DEBUG=1 flask run --port 5005 

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

======================= ============================ ===========================================
Env Variables                   Example                    Description         
======================= ============================ ===========================================
MAESTRO_MONGO_URI       localhost                    Mongo Url conn
MAESTRO_MONGO_DATABASE  maestro-reports              Db name, its differente of servers-app     
MAESTRO_DISCOVERY_URL   http://localhost:5000        Discovery API URL
MAESTRO_REPORT_URI      http://localhost:5005        Report api
MAESTRO_INSERT_QTD      200                          Throughput insert in reports collection
CELERY_BROKER_URL       amqp://rabbitmq:5672         RabbitMQ connection
======================= ============================ ===========================================
