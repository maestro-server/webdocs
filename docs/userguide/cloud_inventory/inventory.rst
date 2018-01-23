Inventory
=========

Inside inventory there are a groups of entities organize by responsabilitie accordly architecture point of view.


Servers
-------

The most import fields in server register is:

============ =============================================================================================================================
Field        Functional 
============ ============================================================================================================================= 
Hostname     Hostname, accept duplicate hostname per team, but the inveotry will warning about this.
Ipv4 Private Ipv4 private, same situation of hostname (accept duplicate but will warning) 
Ipv4 Public  Ipv4 public, only for external servers.
OS           Base is most basic form, like Linux adn Windows, Distro normally use for linux, like ubuntu, centos, and version its a number
CPU           CPU
Memory       Memory
Environment  Production | Development | Stage
============ =============================================================================================================================

You have some tabs,

============ ======================================================================================================================================================================================================== 
Field        Functional 
============ ======================================================================================================================================================================================================== 
Storage      Add your storage information, mount path, size in GB and if is a root device, some cloud maybe bring news informations.
Datacenter   Provider, region and zones, if this server still in cloud Environment you can put id in id_instance, will be create a link and Maestro will know if its duplicate when execute a auto discovery servers.
Auth         Used to register a methods to authenticate in servers.
Service      Register all services its run inside a servers, this information its used to create some links with applications inventory and used in ``Application Manager`` system.
============ ======================================================================================================================================================================================================== 


.. Note::

    Services is a very important field in servers, but of that information the system will try to find some relation with applications, for example if you register Oracle Database, and create a database and register a relation between this servers, the system will automatically create a service relation.


Apps
----

Apps are it all services with is a business responsibility, normally it is an application made by the developer and deploys.

Some fields:

============ =============================================================================================================================
Field        Functional 
============ ============================================================================================================================= 
Name         Hostname, accept duplicate hostname per team, but the inveotry will warning about this.
Environment  Production | Development | Stage
Language
Cluster mode
============ =============================================================================================================================


Specification

============ ======================================================================================================================================================================================================== 
Field        Functional 
============ ======================================================================================================================================================================================================== 
Role         Point information like endpoint, commands, health check, its good for doc.
System       Systems related it.
Server       Servers deployed by app.
Deploy       List of ways to deploy this app.
============ ======================================================================================================================================================================================================== 



Databases
---------

Datacenters
-----------

LoadBalances
------------

System
------

Clients
-------

Services
--------