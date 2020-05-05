Troubleshooting
===============

**1 - AWS was not able to validate the provided access credentials**

I got this error using a valid AWS AK/SK the DescribeInstances operation consistently fails. The other BOTO3 calls work so it's something with this specific call.

.. code-block:: bash

   server-list:
   state: danger
   msg: An error occurred (AuthFailure) when calling the DescribeInstances operation: AWS was not able to validate the provided access credentials At XXXXX


- Do the clock is right on your host?

This message error normally happens when it has a wrong clock configuration, docker uses the host timezone.
If yes can you try to use ntpdate on the host and then spin up again the discovery-maestro and discovery-maestro-workers
https://stackoverflow.com/questions/24551592/how-to-make-sure-dockers-time-syncs-with-that-of-the-host

-  Can be caused by a weird circumstance of running a local version at the same time as a cloud hosted one. Some services ran locally others on the cloud due to the way docker-compose was setup.

-----

**2 - My client got Can't connect to Maestro Server**

- The server api are running?
- Your client service have the right configuration?

.. code-block:: bash

   client:
        image: maestroserver/client-maestro
        environment:
        - "API_URL=//maestro.xxx:8888"   <----------------- Server API
        - "STATIC_URL=//maestro.xxx:8888/static" <--------- Static Files
        - "ANALYTICS_URL=//maestro.xxx:9999" <------------- Analytics Front
        - "WEBSOCKET_URL=wss://xxx:8000" <----------------- WebSocket

-----

**3 - Through Unauthorized error during the synchronization - Permission error**
    
    If through Unauthorized error, you need to grant ready only permission, as an example on AWS you should create IAM and grant full ready only permissions.

-----

**4 - The warning status never change**

   Can be a RabbitMq issue or the Discovery workers weren't running, you can restart the rabbitmq and start the service discovery workers.

You always can check the service logs:

.. code-block:: bash

    docker-compose logs discovery-maestro
    # or
    docker-compose logs discovery-celery # this one is the discovery workers