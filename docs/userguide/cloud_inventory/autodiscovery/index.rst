Auto Discovery
====================


Maestro can connect to cloud providers and synchronize information between each other. You can track and figure out in a single dashboard everything was created on multi-cloud, multi-region architecture.

To set up a new connection, you should follow three steps.

.. image:: ../../../_static/screen/connection.gif
   :alt: Maestro Server - Connections

------

1 - Create datacenter on Maestro (select all regions you use on that provider)

2 - Create a connection and select the one datacenter. - Go to inventory > connections.

.. image:: ../../../_static/screen/conn_p.png
   :alt: Maestro Server - Create connection

3 - Create a cloud credential such as aws access/secret key, azure subscription and more. You can be limited, allowing only read permission.


------------

**Maestro is able to connect on:**

.. toctree::
   :maxdepth: 1

   aws
   azure
   digitalocean
   openstack
