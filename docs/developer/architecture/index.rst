Architecture
====================

This section show a advanced configurations for each micro service.

    **Constainerazed system:**
    Made with containers in mind, Maestro Server is deployed with Docker.

    **Micro service arch:**
    Created with micro services in mind, each service has your responsability.

Services relation, each service communicate by `rest` (http) calls.

.. image:: ../../_static/screen/arch_1.png

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
   ws_app