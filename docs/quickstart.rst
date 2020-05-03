Quick Start
====================
It had three ways to install maestro. The quick one is to use a standalone docker, if you like more control over the installation, you can place multiple docker images per service, and the last you can install from the source.

Running locally
***************
You can use a standalone docker to spin up a single maestro instance.

.. code-block:: bash

    docker run -p 80:80 -p 8888:8888 -p 8000:8000 -p 9999:9999 maestroserver/standalone-maestro


- You need to expose ports **80**, **8888**, **8000** and **9999**
- You can access by browser over 80 port.

Persistent data
***************

Docker have a empheral disk, with means if you remove the container all data will be lost. You can handle it making volumes, the list of folder to expose are:

- **/data/db:** It is all data recorded on mongo db.
- **/data/server-app/public/:** Profile images uploaded
- **/data/analytics-front/public:** Architecture artifacts exposed externally.

.. code-block:: bash

    mkdir ./db ./server/public ./analytics/public

    docker run 
    -v ./db:/data/db
    -v ./server/public:/data/server-app/public/
    -v ./analytics/public:/data/analytics-front/public
    maestroserver/standalone-maestro


Using external Database
***********************

It do recommend to spin up a mongodb externally, you can set the ``MAESTRO_MONGO_URI`` env variable.

=================================== ========================== =======================================================
 Env Variables                       Default                    Description                          
 MAESTRO_MONGO_URI                   mongodb://localhost:27017  Can be mongodb or mongo+srv://
=================================== ========================== =======================================================

As an example

 .. code-block:: bash

    docker run 
        -p 80:80 
        -p 8888:8888 
        -p 8000:8000 
        -p 9999:9999 
        -e MAESTRO_MONGO_URI=mongodb://external.mongo.com:27017 
        maestroserver/standalone-maestro

Optionally, you can replace the db name, setting the ``MAESTRO_MONGO_DATABASE`` env var.

=================================== ========================== =======================================================
 Env Variables                       Default                    Description                          
 MAESTRO_MONGO_DATABASE              maestro-client             Database name
=================================== ========================== =======================================================

Using external RabbitMQ
***********************

You can spin up a rabbitmq externally, it's uses `CELERY_BROKER_URL` env variable.

=================================== ========================== =======================================================
 Env Variables                       Default                    Description                          
 CELERY_BROKER_URL                   amqp://localhost:5672      Amqp endpoint
=================================== ========================== =======================================================

 .. code-block:: bash

    docker run 
        -p 80:80 
        -p 8888:8888 
        -p 8000:8000 
        -p 9999:9999 
        -e CELERY_BROKER_URL=amqp://external.rabbitmq.com:5672
        maestroserver/standalone-maestro


Using S3 to store files
***********************

You can use S3 Amazon storage object service to store artifacts and profiles images over a reliable storage system.

Env variables

 ======================= ================================ 
  UPLOAD_TYPE             S3 
  AWS_ACCESS_KEY_ID       XXXXXXXXXX                      
  AWS_SECRET_ACCESS_KEY   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  
  AWS_DEFAULT_REGION      us-east-1                       
  AWS_S3_BUCKET_NAME      maestroserver   
 ======================= ================================ 

 .. code-block:: yaml

    docker run 
        -e AWS_ACCESS_KEY_ID='XXXXXXXXXX'
        -e AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        -e AWS_DEFAULT_REGION='us-east-1'  
        maestroserver/standalone-maestro


Using external SMTP
*******************

You can use a external smtp service as SendGrid, AWS SeS or any smtp server. Go to server application and set:

+---------------+------------------------------------------------------+
| SMTP_PORT     |                                                      |
+---------------+------------------------------------------------------+
| SMTP_HOST     |                                                      |
+---------------+------------------------------------------------------+
| SMTP_SENDER   |                                                      |
+---------------+------------------------------------------------------+
| SMTP_USERNAME |                                                      |
+---------------+------------------------------------------------------+
| SMTP_PASSWORD |                                                      |
+---------------+------------------------------------------------------+
| SMTP_USETSL   | Enable TLS connect                                   |
+---------------+------------------------------------------------------+
| SMTP_IGNORE   | Ignore the validation of security connection         |
+---------------+------------------------------------------------------+

 .. code-block:: yaml

    docker run 
        -e SMTP_PORT=465
        -e SMTP_HOST=smtp.gmail.com
        -e SMTP_SENDER='mysender@gmail.com'
        -e SMTP_USERNAME=myusername
        -e SMTP_PASSWORD=mysecret
        -e SMTP_USETSL=true  
        maestroserver/standalone-maestro



Complete docker compose
***********************

Minimal setup

.. code-block:: yaml

    services:
        maestro:
            image: maestroserver/standalone-maestro
            ports:
            - 80:80
            - 8888:8888
            - 8000:8000 
            - 9999:9999
            volumes:
            - mongodata:/data/db
            - artifacts_server:/data/server-app/public/
            - artifacts_analytics:/data/artifacts
    volumes:
        mongodata: {}
        artifacts_server: {}
        artifacts_analytics: {}


Recommended reliable setup, using a mongodb, rabbitmq, smtp and store file setted externally.

.. code-block:: yaml

    services:
        maestro:
            image: maestroserver/standalone-maestro
            ports:
            - 80:80 
            - 8888:8888 
            - 8000:8000 
            - 9999:9999
            environment:
            - AWS_ACCESS_KEY_ID='XXXXXXXXXX'
            - AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            - AWS_DEFAULT_REGION='us-east-1'
            - MAESTRO_MONGO_URI=mongodb://external.mongo.com:27017
            - CELERY_BROKER_URL=amqp://external.rabbitmq.com:5672
            - SMTP_PORT=465
            - SMTP_HOST=smtp.gmail.com
            - SMTP_SENDER='mysender@gmail.com'
            - SMTP_USERNAME=myusername
            - SMTP_PASSWORD=mysecret
            - SMTP_USETSL=true

.. Note::

    Standalone docker use the same env vars found it in all services.

.. Note::

    Standalone uses supervisord to manage all services inside of one docker, if you like to spin up one docker per service, go to `installation <http://docs.maestroserver.io/en/latest/installing/>`__.

.. Warning::

    Don't spin up a multiple standalone docker, it will duplicate the schedule tasks, if you need to make a production high availability setup, go to installation per service.
