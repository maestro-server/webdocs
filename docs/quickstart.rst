Quick Start
====================
Get Maestro up in just a few minutes, we recommend to use docker, but if you like to install direcly read the installation section.

Overview
------------
List of micro service:

+----------------------+-------------------------------------------------+--------------------+
| Client App           | FrontEnd client                                 | Vue2 + Bootstrap 3 | 
+----------------------+-------------------------------------------------+--------------------+
| Server App           | Primary API, authetication, crud and manager    | NodeJs 6.10 Kraken |
+----------------------+-------------------------------------------------+--------------------+
| Discovery App        | Auto discovery and crawlers                     | Python 3.6, flask  | 
+----------------------+-------------------------------------------------+--------------------+
| Scheduler App        | Jobs manager with celery beat                   | Python 3.6, celery | 
+----------------------+-------------------------------------------------+--------------------+
| Reports App          | Reports generetor                               | Python 3.6, flask  | 
+----------------------+-------------------------------------------------+--------------------+
| Remote agente App    | Playbook server, task executer                  | Python, shell      | 
+----------------------+-------------------------------------------------+--------------------+
| Authenticator App    | Remote Authenticator                            | Python, flask      | 
+----------------------+-------------------------------------------------+--------------------+
| Data DB App          | Data layer                                      | Python, flask      | 
+----------------------+-------------------------------------------------+--------------------+
| Websocket App        | Websocket api                                   | SockJS, express    | 
+----------------------+-------------------------------------------------+--------------------+

Running locally
---------------
We recommend to use docker, if you like to see demo version, copy and execute docker-compose below, you need to change only two variable in client-app, url, and port.

.. Note::
    PS: Docker will be created and manager all networks and communication between services.
    
    PS: The containers its prepared for run in production ready, but its recommend to create a separate database environment and export the volume (remember all storage inside of docker its temporary)

.. Note::

    :download:`docker-compose file <_static/files/docker-compose.yml>`

.. code-block:: yaml

    version: '2'

    services:
        client:
            image: maestroserver/client-maestro
            ports:
            - "80:80"
            environment:
            - "API_URL=http://10.168.20.20:8888"
            depends_on:
            - server    

        server:
            image: maestroserver/server-maestro
            ports:
            - "8888:8888"
            environment:
            - "MAESTRO_MONGO_URI=mongodb/maestro-client"
            - "MAESTRO_DISCOVERY_URL=http://discovery:5000"
            - "MAESTRO_REPORT_URL=http://reports:5000"
            - "SMTP_PORT=25"
            - "SMTP_HOST=maildev"
            - "SMTP_SENDER=felipeklerkk@gmail.com"
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
            - "MAESTRO_DATA_URI=http://data:5000"
            depends_on:
            - rabbitmq
            - data

        discovery_worker:
            image: maestroserver/discovery-maestro-celery
            environment:
            - "MAESTRO_DATA_URI=http://data:5000"
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
            - "MAESTRO_DATA_URI=http://data:5000"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            depends_on:
            - rabbitmq
            - data

        scheduler:
            image: maestroserver/scheduler-maestro
            environment:
            - "MAESTRO_DATA_URI=http://data:5000"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            - "MAESTRO_MONGO_URI=mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-client"
            depends_on:
            - mongodb
            - rabbitmq

        scheduler_worker:
            image: maestroserver/scheduler-maestro-celery
            environment:
            - "MAESTRO_DATA_URI=http://data:5000"
            - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
            depends_on:
            - rabbitmq
            - data  

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

We have Vagrant box, its good for visualization (demo) or the best way to create a development environment.

.. Note::

    PS: ``All port its expose``, don't use vagrant in production environment.


.. Note::

    **HA - High availability and critical system**

    If your necessity is, HA, critical situation, go in `Ha session`__.

    __ installing/production.html