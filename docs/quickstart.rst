Quick Start
====================
Get Maestro up in just a few minutes, we recommend to use docker, but if you like to install direcly read the installation section.

Overview
------------
Maestro is split into 6 pieces:

+-----------------+-------------------------------------------------+--------------------+
| Client App      | FrontEnd client                                 | Vue2 + Bootstrap 3 | 
+-----------------+-------------------------------------------------+--------------------+
| Server App      | Primary API, authetication, crud and manager    | NodeJs 6.10 Kraken |
+-----------------+-------------------------------------------------+--------------------+
| Discovery App   | Auto discovery and crawler                      | Python 3.6, flask  | 
+-----------------+-------------------------------------------------+--------------------+
| Scheduler App   | Rabbits worker for Scheduler discovery          | Python 3.6, celery | 
+-----------------+-------------------------------------------------+--------------------+
| Reports App     | Reports generetor                               | Python 3.6, flask  | 
+-----------------+-------------------------------------------------+--------------------+
| Playbook Server | Playbook server, task executer                  | Python, shell      | 
+-----------------+-------------------------------------------------+--------------------+


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
        - "API_URL=http://localhost:8888"

    server:
        image: maestroserver/server-maestro
        ports:
        - "8888:8888"
        environment:
        - "MAESTRO_PORT=8888"
        - "MAESTRO_MONGO_URI=mongodb/maestro-client"
        - "MAESTRO_DISCOVERY_TIMEOUT=10000"
        - "MAESTRO_DISCOVERY_URL=http://discovery:5000"

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

  reports:
    image: maestroserver/reports-maestro
    environment:
     - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
     - "MAESTRO_URL=http://localhost:5005"
     - "MAESTRO_MONGO_URI=mongodb"
     - "MAESTRO_MONGO_DATABASE=maestro-reports"

  reports_worker:
    image: maestroserver/reports-maestro-celery
    environment:
     - "MAESTRO_URL=http://reports:5005"
     - "MAESTRO_DISCOVERY_URL=http://discovery:5000"
     - "CELERY_BROKER_URL=amqp://rabbitmq:5672"

    scheduler:
        image: maestroserver/scheduler-maestro
        environment:
        - "MAESTRO_DISCOVERY_URL=http://discovery"
        - "MAESTRO_DISCOVERY_PORT=5000"
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_MONGO_URI=mongodb"
        - "MAESTRO_MONGO_DATABASE=maestro-client"

    rabbitmq:
        hostname: "discovery-rabbit"
        image: rabbitmq:3-management
        ports:
        - "15672:15672"
        - "5672:5672"

    redis:
        image: redis
        ports:
        - "6379:6379"

    mongodb:
        image: mongo
        volumes:
        - mongodata:/data/db
        ports:
        - "27017:27017"

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