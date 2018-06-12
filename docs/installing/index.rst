Installing Maestro
==================

We have docker compose file with all services (download here), this is the easy way to install Maestro, if you like can install in a pure way (we did a doc show each step to install without docker, see here Developer Guide).

This section will show installation briefing for each service.

High Architecture
-----------------

.. image:: ../_static/screen/arch_1.png

-----------------

First: A minimun installation can be done with:

..

    * Client App
    * Server App
    * MongoDB

You can setup and use a minimun installation, you can create and delete servers, apps, datacenters, change acl and create new users, with these you have a simple inventory system.

If you like to use a synchronous features with AWS or other providers, then you need:

..

    * Discovery App
    * Data App
    * RabbitMq

Or use auto-discovery feature, will polling and maintain or inventory synchronous, then:

..

    * Scheduler App 

If you like to create and export reports then:

..

    * Reports App
    * Data App
    * RabbitMq

Let´s start

Client App
----------

**Installation by docker-compose**

.. code-block:: yaml

    client:
        image: maestroserver/client-maestro
        ports:
        - "80:80"
        environment:
        - "API_URL=http://server-app:8888"
        - "STATIC_URL=http://server-app:8888/static/"

.. code-block:: bash

    docker run -p 80:80 -e "API_URL=http://localhost:8888" maestroserver/client-maestro

.. Warning::
    * API_URL it's rest endpoint provide by server-app.
    * STATIC_URL it's endpoint for static files, if you use local upload type need to be {server-app-url}/static  - `More details upload <http://docs.maestroserver.io/en/latest/installing/upload.html>`_.


**Env variables**

======================= ============================ =============================== 
Env Variables                   Example                    Description         
======================= ============================ =============================== 
API_URL                 http://localhost:8888        Server App Url                                           
STATIC_URL              /static                      Relative path of static content                
LOGO                    /static/imgs/logo300.png     Logotype, (login page)
THEME                   theme-lotus                  Theme (gold|wine|blue|green|dark)
======================= ============================ =============================== 

----------

Server APP
----------

**Installation by docker**

.. code-block:: yaml

    server:
        image: maestroserver/server-maestro
        ports:
        - "8888:8888"
        environment:
        - "MAESTRO_MONGO_URI=mongodb/maestro-client"
        - "MAESTRO_DISCOVERY_URI=http://discovery:5000"
        - "MAESTRO_REPORT_URI=http://reports:5000"

.. code-block:: bash

    docker run -p 8888:8888  -e "MAESTRO_MONGO_URI=mongodb/maestro-client" -e "MAESTRO_DISCOVERY_URI=http://discovery:5000" -e "MAESTRO_REPORT_URI=http://reports:5000" maestroserver/server-maestro 

.. Warning::
    * MAESTRO_MONGO_URI - Must be mongodb, mongodb://{uri}/{db-name}
    * SMTP_X - Used for reset emails and accounts, need to be valid SMTP server - `More details smtp <http://docs.maestroserver.io/en/latest/installing/smtp.html>`_. 
    * MAESTRO_UPLOAD_TYPE - Can be local or S3 `More details upload <http://docs.maestroserver.io/en/latest/installing/upload.html>`_.

**Env variables**

============================== ========================== =============================== 
        Env Variables                   Example                   Description                          
============================== ========================== ===============================
 MAESTRO_PORT                   8888                                                                   
 NODE_ENV                       development|production                                                 
 MAESTRO_MONGO_URI              localhost/maestro-client   DB string connection                        
 MAESTRO_SECRETJWT              XXXX                       Secret key - session                                            
 MAESTRO_SECRETJWT_FORGOT       XXXX                       Secret key - forgot request                                            
 MAESTRO_SECRET_CRYPTO_FORGOT   XXXX                       Secret key - forgot content                                            
 MAESTRO_DISCOVERY_URI          http://localhost:5000      Url discovery-app (flask)                   
 MAESTRO_REPORT_URI             http://localhost:5005      Url reports-app (flask)
 MAESTRO_TIMEOUT                1000                       Timeout micro service request
 SMTP_PORT                      1025                                                                   
 SMTP_HOST                      localhost                                                              
 SMTP_SENDER                    myemail@XXXX                                                      
 SMTP_IGNORE                    true|false
 SMTP_USETSL                    true|false
 SMTP_USERNAME
 SMTP_PASSWORD                                                                                                        
 MAESTRO_UPLOAD_TYPE            S3 or Local                Upload mode
 AWS_ACCESS_KEY_ID              XXXX                                                                   
 AWS_SECRET_ACCESS_KEY          XXXX                                                                   
 AWS_DEFAULT_REGION             us-east-1                                                              
 AWS_S3_BUCKET_NAME             maestroserver              Buckete name                             
 LOCAL_DIR                      /public/static/            Where files will be uploaded
 PWD                            $rootDirectory             PWD process
============================== ========================== ===============================

Discovery App
-------------

**Installation by docker**

.. code-block:: yaml

    discovery:
        image: maestroserver/discovery-maestro
        ports:
        - "5000:5000"
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_DATA_URI=http://data:5000"

    discovery_worker:
        image: maestroserver/discovery-maestro-celery
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_DATA_URI=http://data:5000"

.. code-block:: bash

    docker run -p 5000:5000  -e "MAESTRO_DATA_URI=http://data:5000" -e "CELERY_BROKER_URL=amqp://rabbitmq:5672" maestroserver/discovery-maestro 
 
    docker run -e "MAESTRO_DATA_URI=http://data:5000" -e "CELERY_BROKER_URL=amqp://rabbitmq:5672" maestroserver/discovery-maestro-celery 

.. Warning::
    * MAESTRO_REPORT_URI - Enpoint API of Discovery - default port is 5010
    * MAESTRO_DATA_URI - Enpoint API of Data App - default port is 5000

**Env variables**

======================= ============================ ============================
Env Variables                   Example                    Description         
======================= ============================ ============================  
MAESTRO_PORT			5010  					     Port used    
MAESTRO_DATA_URI        http://localhost:5010        Data Layer API URL
MAESTRO_SECRETJWT       xxxx                         Same that Server App
MAESTRO_TRANSLATE_QTD   200                          Prefetch translation process
MAESTRO_GWORKERS        2                            Gunicorn multi process
CELERY_BROKER_URL       amqp://rabbitmq:5672         RabbitMQ connection
CELERYD_TASK_TIME_LIMIT 10                           Timeout workers
======================= ============================ ============================

Reports App
-----------

**Installation by docker**

.. code-block:: yaml

    reports:
        image: maestroserver/reports-maestro
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_MONGO_URI=mongodb"
        - "MAESTRO_MONGO_DATABASE=maestro-reports"

    reports_worker:
        image: maestroserver/reports-maestro-celery
        environment:
        - "MAESTRO_REPORT_URI=http://reports:5005"
        - "MAESTRO_DATA_URI=http://data:5010"
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"

.. Warning::
    * MAESTRO_REPORT_URI - Enpoint API of Reports - default port is 5005
    * MAESTRO_DATA_URI - Enpoint API of Data App - default port is 5000

**Env variables**

========================= ============================ ===========================================
Env Variables                   Example                    Description         
========================= ============================ ===========================================
MAESTRO_PORT			  5005						   Port used 
MAESTRO_MONGO_URI         localhost                    Mongo Url conn
MAESTRO_MONGO_DATABASE    maestro-reports              Db name, its differente of servers-app     
MAESTRO_DATA_URI          http://localhost:5010        Data layer api
MAESTRO_REPORT_URI        http://localhost:5005        Report api
MAESTRO_REPORT_RESULT_QTD 200                          Limit default
MAESTRO_TIMEOUT_DATA      10                           Timeout for data retrived
MAESTRO_TIMEOUT_WEBHOOK   5                            Timeout for notifications
MAESTRO_INSERT_QTD        20                           Prefetch data insert
MAESTRO_GWORKERS          2                            Gworkers thread pool                         
CELERY_BROKER_URL         amqp://rabbitmq:5672         RabbitMQ connection
========================= ============================ ===========================================


Data App
--------

**Installation by docker**

.. code-block:: yaml

    data:
        image: maestroserver/data-maestro
        environment:
            - "MAESTRO_MONGO_URI=mongodb"
            - "MAESTRO_MONGO_DATABASE=maestro-client"

**Env variables**

======================= ============================ ===========================================
Env Variables                   Example                    Description         
======================= ============================ ===========================================
MAESTRO_PORT			5000						 Port used 
MAESTRO_MONGO_URI       localhost                    Mongo Url conn
MAESTRO_MONGO_DATABASE  maestro-reports              Db name, its differente of servers-app     
MAESTRO_GWORKERS   		2       					 Gunicorn multi process  
MAESTRO_INSERT_QTD      200                          Throughput insert in reports collection
======================= ============================ ===========================================
                

Scheduler App
-------------

**Installation by docker**

.. code-block:: yaml

    scheduler:
        image: maestroserver/scheduler-maestro
        environment:
        - "MAESTRO_DATA_URI=http://data:5000"
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"
        - "MAESTRO_MONGO_URI=mongodb"
        - "MAESTRO_MONGO_DATABASE=maestro-client"

    scheduler_worker:
        image: maestroserver/scheduler-maestro-celery
        environment:
        - "MAESTRO_DATA_URI=http://data:5000"
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"

.. code-block:: bash

    docker run -e "MAESTRO_DATA_URI=http://data:5000" -e "CELERY_BROKER_URL=amqp://rabbitmq:5672" maestroserver/scheduler-maestro
 
    docker run -e "MAESTRO_DATA_URI=http://data:5000" -e "CELERY_BROKER_URL=amqp://rabbitmq:5672" maestroserver/scheduler-maestro-celery 
     
.. Warning::
    * MAESTRO_DATA_URI - Enpoint API of Data App - default port is 5000

**Env variables**

======================= ============================ =========================== 
Env Variables                   Example                    Description         
======================= ============================ =========================== 
MAESTRO_DATA_URI        http://data:5000             Data Layer API URL
MAESTRO_MONGO_URI       localhost                    MongoDB URI
MAESTRO_MONGO_DATABASE  maestro-client               Mongo Database name
CELERY_BROKER_URL       amqp://rabbitmq:5672         RabbitMQ connection
======================= ============================ =========================== 


HA - Production Read
--------------------

.. toctree::
   :maxdepth: 2

   production

Advanced configs
----------------
.. toctree::
   :maxdepth: 2

   smtp
   upload
   themes