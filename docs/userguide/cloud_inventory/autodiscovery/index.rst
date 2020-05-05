Auto Discovery
====================


Maestro can connect to a third-party provider and synchronize the information, and you can track and figure out in an easy way everything was created by multi-cloud providers.

To set up a new connection, you should follow three steps.

.. image:: ../../../_static/screen/connection.gif
   :alt: Maestro Server - Connections

------

1 - Create datacenter on Maestro (select all regions you use on that provider)

2 - Create a connection a select the previous datacenter. - Go inventory > connections.

.. image:: ../../../_static/screen/conn_p.png
   :alt: Maestro Server - Create connection

3 - Create a cloud credencial such as aws acess/secret key, azure subscription and more, you can limited allow a read permission.


------------

**Maestro is able to connect on:**

.. toctree::
   :maxdepth: 1

   aws
   azure
   digitalocean
   openstack
