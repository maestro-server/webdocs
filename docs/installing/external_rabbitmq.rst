Using external RabbitMQ   
====================================

**Services**

- discovery
- discovery_worker
- reports
- reports_worker
- analytics
- analytics_worker
- scheduler
- scheduler_worker

---------

You can spin up a rabbitmq externally, you can do using the `CELERY_BROKER_URL` env variable.

=================================== ========================== =======================================================
 Env Variables                       Default                    Description                          
 CELERY_BROKER_URL                   amqp://localhost:5672      Amqp endpoint
=================================== ========================== =======================================================

.. code-block:: yaml

    services:
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
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672" 

    reports:
        image: maestroserver/reports-maestro
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"

    reports_worker:
        image: maestroserver/reports-maestro-celery
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"

    scheduler:
        image: maestroserver/scheduler-maestro
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"

    scheduler_worker:
        image: maestroserver/scheduler-maestro-celery
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"

    analytics:
        image: maestroserver/analytics-maestro
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"

    analytics_worker:
        image: maestroserver/analytics-maestro-celery
        environment:
        - "CELERY_BROKER_URL=amqp://rabbitmq:5672"