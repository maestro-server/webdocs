12 Factory and Horizontal Scaling
---------------------------------

All services need work in stateless, like session, images or any process, we use JWT for authentication and isolated storage server.

- Avoid to use any local configurate like local upload, maestro has supported to use s3 storage object.

- Put all connection config in env docker setup, would able to use kubernetes, rancher or any orchestration is good advice.

- Its possible to deploy discovery api in one server, and discovery celery another server.

- In front end, use nginx, or any other proxy.

One example setup, can be in each node,

.. image:: ../_static/screen/ha.png

----------

It's possible to improve discovery and reports app

.. image:: ../_static/screen/discovery_reports.png

----------


Scheduler Beat App
------------------

.. Danger::
	Scheduler app have two parts, the producer called beat and workers, the beat its only service without prepare to setup in high availability, be carefull. It´s hard to put a beat service in HA system in a simple way, I prefer to go in simple way, to minimize, beat schedule is isolated and build in an immutable state (if fall, you call up in another server, and all schedules will be recovered), but must have only one beat instance per time. 
     