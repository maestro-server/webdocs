Using external Database 
=======================

**Services**

- server
- reports
- scheduler
- analytics_front
- data
- audit

---------

It recommend to spin up a mongodb externally, it uses ``MAESTRO_MONGO_URI`` env variable.

=================================== ========================== =======================================================
 Env Variables                       Default                    Description                          
 MAESTRO_MONGO_URI                   mongodb://localhost:27017  Can be mongodb or mongo+srv://
=================================== ========================== =======================================================

.. code-block:: yaml

    services:
    server:
        image: maestroserver/server-maestro
        environment:
        - "MAESTRO_MONGO_URI=mongodb://{external.mongo.url}"
        - "MAESTRO_MONGO_DATABASE=maestro-client"

    reports:
        image: maestroserver/reports-maestro
        environment:
        - "MAESTRO_MONGO_URI=mongodb://{external.mongo.url}"
        - "MAESTRO_MONGO_DATABASE=maestro-reports"

    scheduler:
        image: maestroserver/scheduler-maestro
        environment:
        - "MAESTRO_MONGO_URI=mongodb://{external.mongo.url}"
        - "MAESTRO_MONGO_DATABASE=maestro-scheduler"

    analytics_front:
        image: maestroserver/analytics-front-maestro
        environment:
        - "MAESTRO_MONGO_URI=mongodb://{external.mongo.url}"
        - "MAESTRO_MONGO_DATABASE=maestro-client" # <------ It need to be the same db of servert-api

    data:
        image: maestroserver/data-maestro
        environment:
        - "MAESTRO_MONGO_URI=mongodb://{external.mongo.url}"
        - "MAESTRO_MONGO_DATABASE=maestro-client" # <------ It need to be the same db of servert-api

    audit:
        image: maestroserver/audit-app-maestro
        environment:
        - "MAESTRO_MONGO_URI=mongodb://{external.mongo.url}"
        - "MAESTRO_MONGO_DATABASE=maestro-audit"



You can replace the db name setting the ``MAESTRO_MONGO_DATABASE`` env var.

=================================== ========================== =======================================================
 Env Variables                       Default                    Description                          
 MAESTRO_MONGO_DATABASE              maestro-client             Database name
=================================== ========================== =======================================================