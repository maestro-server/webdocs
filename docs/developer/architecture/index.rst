Architecture
====================

This section describes advanced configurations and architecture. Maestro is organized by services made in nodejs and python, and they use mongodb as a datastore and rabbitmq as broker, we build and deploy the application using docker.

.. image:: ../../_static/screen/arch_1.png
   :alt: Maestro Server - Architecture overview

----------

.. toctree::
   :maxdepth: 1

   client_app
   server_app
   discovery_app
   reports_app
   scheduler_app
   analytics
   analytics_front
   data_app
   audit
   ws_app