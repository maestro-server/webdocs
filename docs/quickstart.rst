Quick Start
====================
Get Maestro up in just a few minutes, we recommend to use docker, but if you like to install direcly read the installation section.

Overview
------------
List of micro service:

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


Running locally
---------------
We recommend to use docker, if you like to see demo version, copy and execute docker-compose below, you need to change only two variable in client-app, url, and port.

.. Note::
    PS: Docker will be created and manager all networks and communication between services.
    
    PS: The containers its prepared for run in production ready, but its recommend to create a separate database environment and export the volume (remember all storage inside of docker its temporary)

.. Note::

    `Download docker-compose file <https://raw.githubusercontent.com/maestro-server/development-maestro/master/docker-compose/docker-compose.yml>`_.

.. Warning::

    This is quickstart, it's a docker compose to setup fast in local machines, if you like to install in production env, go to installing guide. 

.. code-block:: yaml

    version: '2'

    services:
        client:
            image: maestroserver/client-maestro
            ports:
            - "80:80"
            environment:
            - "API_URL=http://localhost:8888"
            - "STATIC_URL=http://localhost:8888/static/"
            - "ANALYTICS_URL=http://localhost:9999"
            depends_on:
            - server    

        server:
            image: maestroserver/server-maestro
            ports:
            - "8888:8888"
            environment:
            - "MAESTRO_MONGO_URI=mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-client"
            - "MAESTRO_DISCOVERY_URI=http://discovery:5000"
            - "MAESTRO_ANALYTICS_URI=http://analytics:5020"
            - "MAESTRO_ANALYTICS_FRONT_URI=http://analytics_front:9999"
            - "MAESTRO_REPORT_URI=http://reports:5005"
            - "SMTP_PORT=25"
            - "SMTP_HOST=maildev"
            - "SMTP_SENDER=myemail@gmail.com"
            - "SMTP_IGNORE=true"
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
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672" 
            depends_on:
            - rabbitmq
            - data

        reports:
            image: maestroserver/reports-maestro
            environment:
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_MONGO_URI=mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-reports"
            depends_on:
            - rabbitmq
            - mongodb

        reports_worker:
            image: maestroserver/reports-maestro-celery
            environment:
            - "MAESTRO_REPORT_URI=http://reports:5005"
            - "MAESTRO_DATA_URI=http://data:5010"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            depends_on:
            - rabbitmq
            - data

        scheduler:
            image: maestroserver/scheduler-maestro
            environment:
            - "MAESTRO_DATA_URI=http://data:5010"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_MONGO_URI=mongodb"
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
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672" 
            - "CELERYD_MAX_TASKS_PER_CHILD=2"
            depends_on:
            - rabbitmq
            - data

        analytics_front:
            image: maestroserver/analytics-front-maestro
            ports:
            - "9999:9999"
            environment:
            - "MAESTRO_MONGO_URI=mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-client"

        data:
            image: maestroserver/data-maestro
            environment:
            - "MAESTRO_MONGO_URI=mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-client"
            depends_on:
            - mongodb

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



Vagrant
-------

We have VagrantFile, its good for visualization (demo) or the best way to create a development environment.


.. Note::

    `Download vagrantFile <https://raw.githubusercontent.com/maestro-server/development-maestro/master/vagrant/Vagrantfile>`_.


.. Note::

    **HA - High availability and critical system**

    If your necessity is, HA, critical situation, go in `Ha session`__.

    __ installing/production.html