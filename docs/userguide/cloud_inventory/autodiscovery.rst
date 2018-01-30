Auto Discovery
====================

To setup connections in auto-discovery, go inventory > connections.

.. figure:: ../../_static/screen/conn.png

    Access connection

In version 0.1, we have two providers:

Connectiong with AWS
--------------------

To register one aws account use access_key and secret_key

**Synchronized and permissions to grant.**

+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| server-List         | ec2 describe_instances                                                                                                                                                                                                    |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| loadbalance-list    | describe_load_balancers and describe_load_balancers                                                                                                                                                                       |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| dbs-list            | rds describe_db_instances                                                                                                                                                                                                 |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| storage-object-list | s3 list_buckets                                                                                                                                                                                                           |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| volumes-list        | ec2 describe_volumes                                                                                                                                                                                                      |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| cdns-list           | cloudfront list_distributions                                                                                                                                                                                             |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| snapshot-list       | ec2 describe_snapshots                                                                                                                                                                                                    |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| images-list         | ec2 vdescribe_images                                                                                                                                                                                                      |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| security-list       | ec2 describe_security_groups                                                                                                                                                                                              |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| network-list        | ec2 describe_vpcs, describe_subnets, describe_vpc_peering_connections, describe_vpn_gateways, describe_vpc_endpoints, describe_route_tables, describe_network_interfaces, describe_nat_gateways and describe_network_acls |
+---------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

------------

.. figure:: ../../_static/screen/conn_aws.png

    Setup connection with AWS

------------

Connectiong with OpenStack
--------------------------

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

.. figure:: ../../_static/screen/conn_openstack.png

    Setupconnection with OpenStack

------------

.. Note::
    
    PS:  There is scheduler job, its automatize sync, this schedule will be activated by default, and each resource have our own time, in the example, server-list will be synchronized for every 5 minutes, networks stuffs normally happen for every 2 weeks.


------------

.. figure:: ../../_static/screen/conn_ena.png

    Enable and disable the job

------------


FAQ
---

- **Permission error**
    
    If through Unauthorized error, you need to grant ready only permission, in AWS you need to create IAM and grant these permissions.

- **Infinitive process loading**

    Its common problem, Maestro needs two services to execute a successful synchronize, Discovery APP and RabbitMQ, normally when discovery app is down, we have infinite process message (because server app notify to start a process, and discovery app need to finish with Success process). 
    Guarantees if discovery app up and running and if it's connected correctly with rabbitmq.

For debbug, use stdout docker, like

.. code-block:: bash

    docker-compose logs discovery-maestro
    # or
    docker-compose logs discovery-celery