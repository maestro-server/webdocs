Installing Maestro
==================

Using Docker Compose
---------------------

To get Maestro up in just a few minutes go to `Standalone installation <http://docs.maestroserver.io/en/latest/quickstart.html>`_.; However if you like to get more control over the installation you can spin up a one docker per service.

Overview
********
There are a list of all services:

+----------------------+-------------------------------------------------+--------------------+
| Client App           | FrontEnd client                                 | Vue2 + Bootstrap 3 | 
+----------------------+-------------------------------------------------+--------------------+
| Server App           | Primary API, authetication, crud and manager    | NodeJs 8.11 Kraken |
+----------------------+-------------------------------------------------+--------------------+
| Discovery App        | Auto discovery and crawlers                     | Python 3.6, flask  | 
+----------------------+-------------------------------------------------+--------------------+
| Scheduler App        | Jobs manager with celery beat                   | Python 3.6, celery | 
+----------------------+-------------------------------------------------+--------------------+
| Reports App          | Reports generetor                               | Python 3.6, flask  | 
+----------------------+-------------------------------------------------+--------------------+
| Analytics App        | Analytics Maestro - Graphs Generator            | Python 3.6, flask  | 
+----------------------+-------------------------------------------------+--------------------+
| Analytics Front      | Analytics Front                                 | NodeJs 8.11 Kraken | 
+----------------------+-------------------------------------------------+--------------------+
| Data DB App          | Data layer                                      | Python 3.6, flask  |
+----------------------+-------------------------------------------------+--------------------+
| Audit App            | HIstory tracker service                         | NodeJs 8.11 Kraken |
+----------------------+-------------------------------------------------+--------------------+
| WebSocket APP        | WebSocket - Events                              | Go, Centrifugo     | 
+----------------------+-------------------------------------------------+--------------------+


Running locally
***************
You can use docker to spin up a maestro bundle, you can copy and execute the docker-compose file describe below.

.. Note::
    PS: Docker compose will be able to create and manager all networks and communication between services.
    
    PS: Containers is prepared to run in production.

.. Note::

    `Download docker-compose file <https://raw.githubusercontent.com/maestro-server/infraascode-maestro/master/docker-compose/docker-compose.yml>`_.


.. code-block:: yaml

    version: '3'

    services:
        client:
            image: maestroserver/client-maestro
            ports:
            - "80:80"
            environment:
            - "API_URL=http://localhost:8888"
            - "STATIC_URL=http://localhost:8888/static/" # <- It need to have the slash
            - "ANALYTICS_URL=http://localhost:9999"
            - "WEBSOCKET_URL=ws://localhost:8000"
            depends_on:
            - server    

        server:
            image: maestroserver/server-maestro
            ports:
            - "8888:8888"
            environment:
            - "MAESTRO_MONGO_URI=mongodb://mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-client"
            - "MAESTRO_DISCOVERY_URI=http://discovery:5000"
            - "MAESTRO_ANALYTICS_URI=http://analytics:5020"
            - "MAESTRO_ANALYTICS_FRONT_URI=http://analytics_front:9999"
            - "MAESTRO_REPORT_URI=http://reports:5005"
            - "SMTP_PORT=25"
            - "SMTP_HOST=maildev"
            - "SMTP_SENDER=myemail@gmail.com"
            - "SMTP_IGNORE=true"
            volumes:
            - artifacts_server:/data/public/
            depends_on:
            - mongodb
            - discovery
            - reports 

        discovery:
            image: maestroserver/discovery-maestro
            ports:
            - "5000:5000"
            environment:
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_DATA_URI=http://data:5010"
            depends_on:
            - rabbitmq
            - data

        discovery_worker:
            image: maestroserver/discovery-maestro-celery
            environment:
            - "MAESTRO_DATA_URI=http://data:5010"
            - "MAESTRO_WEBSOCKET_URI=http://ws:8000"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672" 
            depends_on:
            - rabbitmq
            - data

        reports:
            image: maestroserver/reports-maestro
            environment:
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_MONGO_URI=mongodb://mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-reports"
            depends_on:
            - rabbitmq
            - mongodb

        reports_worker:
            image: maestroserver/reports-maestro-celery
            environment:
            - "MAESTRO_REPORT_URI=http://reports:5005"
            - "MAESTRO_DATA_URI=http://data:5010"
            - "MAESTRO_WEBSOCKET_URI=http://ws:8000"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            depends_on:
            - rabbitmq
            - data

        scheduler:
            image: maestroserver/scheduler-maestro
            environment:
            - "MAESTRO_DATA_URI=http://data:5010"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_MONGO_URI=mongodb://mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-client"
            depends_on:
            - mongodb
            - rabbitmq

        scheduler_worker:
            image: maestroserver/scheduler-maestro-celery
            environment:
            - "MAESTRO_DATA_URI=http://data:5010"
            - "MAESTRO_DISCOVERY_URI=http://discovery:5000"
            - "MAESTRO_ANALYTICS_URI=http://analytics:5020"
            - "MAESTRO_REPORT_URI=http://reports:5005"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            depends_on:
            - rabbitmq
            - data  

        analytics:
            image: maestroserver/analytics-maestro
            ports:
            - "5020:5020"
            environment:
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_DATA_URI=http://data:5010"
            depends_on:
            - rabbitmq
            - data

        analytics_worker:
            image: maestroserver/analytics-maestro-celery
            environment:
            - "MAESTRO_DATA_URI=http://data:5010"
            - "MAESTRO_ANALYTICS_FRONT_URI=http://analytics_front:9999"
            - "MAESTRO_WEBSOCKET_URI=http://ws:8000"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672" 
            - "CELERYD_MAX_TASKS_PER_CHILD=2"
            depends_on:
            - rabbitmq
            - data

        analytics_front:
            image: maestroserver/analytics-front-maestro
            ports:
            - "9999:9999"
            volumes:
            - artifacts_analytics:/data/artifacts/
            environment:
            - "MAESTRO_MONGO_URI=mongodb://mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-client"

        data:
            image: maestroserver/data-maestro
            environment:
            - "MAESTRO_MONGO_URI=mongodb://mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-client"
            depends_on:
            - mongodb

        audit:
            image: maestroserver/audit-app-maestro
            environment:
            - "MAESTRO_MONGO_URI=mongodb://mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-audit"
            - "MAESTRO_DATA_URI=http://data:5010"

        ws:
            image: maestroserver/websocket-maestro
            ports:
            - "8000:8000"

        rabbitmq:
            hostname: "discovery-rabbit"
            image: rabbitmq:3-management
            ports:
            - "15672:15672"
            - "5672:5672"
            
        mongodb:
            image: mongo
            volumes:
            - mongodata:/data/db
            ports:
            - "27017:27017"

        maildev:
            image: djfarrelly/maildev
            mem_limit: 80m
            ports:
            - "1025:25"
            - "1080:80"


    volumes:
        mongodata: {}
        artifacts_server: {}
        artifacts_analytics: {}

--------

Spin up the API server in a different server    
********************************************

By default the client server uses the same domain name to connect into server api, websocket and analytics front api; However if you like to switch this configuration you can use env vars to set all urls.

By default if you run the client service over ``//example.maestro``, the client will try to access the server api by ``//example.maestro:8888``, the analytic front by ``//example.maestro:9999`` and the websocket by ``ws(s)//example.maestro:8000``

.. code-block:: yaml

    services:
        client:
            image: maestroserver/client-maestro
            environment:
            - "API_URL=http://server.api.endpoint:8888"
            - "STATIC_URL=http://server.api.endpoint:8888/static/" # <- It need to have the slash
            - "ANALYTICS_URL=http://analytics.front.endpoint:9999"
            - "WEBSOCKET_URL=ws://websocket.endpoint:8000"

--------

Productionize  
*************

Should you follow the steps below to run the Maestro on production.

- Using external Database and RabbitMq  - `More details about external DB <http://docs.maestroserver.io/en/latest/installing/external_db.html>`_.  
- Using a reliable store engine as AWS S3 - `More details about upload <http://docs.maestroserver.io/en/latest/installing/upload.html>`_.
- Configurate a third-party SMTP system -  `More details about SMTP <http://docs.maestroserver.io/en/latest/installing/smtp.html>`_. 
- Spin up two or more instance of client, server, discovery, reports, analytics and data. [Expect websocket and scheduler]
- Set a unique value for each ``SECRETJWT`` key - `More details about tokens <http://docs.maestroserver.io/en/latest/installing/tokens.html>`_.
- Use a external loadbalance to handle ssl connections.

--------

Advanced setups
----------------

.. toctree::
   :maxdepth: 2
 
   smtp
   upload
   external_db
   external_rabbitmq
   tokens
   themes

Services configurations
-----------------------------

.. toctree::
   :maxdepth: 1

   docker

High availability
-----------------

.. toctree::
   :maxdepth: 2

   production
   healthcheck
   kubernetes
