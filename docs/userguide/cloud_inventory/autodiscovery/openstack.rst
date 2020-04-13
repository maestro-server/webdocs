Connect with OpenStack
==========================

To register one openstack account, use project name, url api, user, and password.

**Synchronized and permissions to grant.**

+-------------------+----------------------------------------------+
| Server-List:      | servers compute                              |
+-------------------+----------------------------------------------+
| Loadbalance-list: | load_balancers load_balancer                 |
+-------------------+----------------------------------------------+
| volumes-list:     | volumes block_store                          |
+-------------------+----------------------------------------------+
| snapshot-list:    | block_store snapshots                        |
+-------------------+----------------------------------------------+
| images-list:      | compute images                               |
+-------------------+----------------------------------------------+
| security-list:    | network security_groups                      |
+-------------------+----------------------------------------------+
| flavor-list:      | compute flavors                              |
+-------------------+----------------------------------------------+
| network-list:     | network networks, subnets, ports and routers |
+-------------------+----------------------------------------------+

If you like, choose how the resource will be synchronized with an active and inactive button.

------------

.. image:: ../../../_static/screen/conn_openstack.png
   :alt: Maestro Server - OpenStack setup

Setupconnection with OpenStack

------------

.. Note::
    
    PS:  There is scheduler job, its automatize sync, this schedule will be activated by default, and each resource have our own time, in the example, server-list will be synchronized for every 5 minutes, networks stuffs normally happen for every 2 weeks. You can the time using in each resource, more details  see schedulers.


------------

.. image:: ../../../_static/screen/conn_ena.png
   :alt: Maestro Server - Job on connection

Enable and disable the job