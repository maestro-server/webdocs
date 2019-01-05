Servers
-------
`Inventory > Server`

The most import fields in server register is:

============ =============================================================================================================================
Field        Functional 
============ ============================================================================================================================= 
Hostname     Hostname, accept duplicate hostname per team, but the inveotry will warning about this.
Ipv4 Private Ipv4 private, same situation of hostname (accept duplicate but will warning) 
Ipv4 Public  Ipv4 public, only for external servers.
OS           Base is most basic form, like Linux adn Windows, Distro normally use for linux, like ubuntu, centos, and version its a number
CPU          CPU
Memory       Memory
Environment  Production | Development | Stage
============ =============================================================================================================================

------------

.. image:: ../../../_static/screen/sv_os.png
   :alt: Maestro Server - Setup OS

Setup OS server

------------

You have some tabs,

============ ======================================================================================================================================================================================================== 
Field        Functional 
============ ======================================================================================================================================================================================================== 
Storage      Add your storage information, mount path, size in GB and if is a root device, some cloud maybe bring news informations.
Datacenter   Provider, region and zones, if this server still in cloud Environment you can put id in id_instance, will be create a link and Maestro will know if its duplicate when execute a auto discovery servers.
Auth         Used to register a methods to authenticate in servers.
Service      Register all services its run inside a servers, this information its used to create some links with applications inventory and used in ``Application Manager`` system.
============ ======================================================================================================================================================================================================== 

------------

.. figure:: ../../../_static/screen/sv_ddc.png
   :alt: Maestro Server - Assing datacenters name

Assing a dc name, region and zone.

------------

.. figure:: ../../../_static/screen/sv_auth.png
   :alt: Maestro Server - Assing service authentication

Register, which mode you can to access and authenticate on server.   

------------

.. Note::

    Services is a very important field in servers, which this information the system will try to find some relation with applications, for example if you register Oracle Database, and create a database and register a relation between this servers, the system will automatically create a service relation.


.. image:: ../../../_static/screen/sv_service.png
   :alt: Maestro Server - Servers and services


Related services running.

------------

**Volumes**

.. image:: ../../../_static/screen/vol_1.png
   :alt: Maestro Server - Volumes - Attached or built

Can be attached or built-in:
 
 - **Attached** are network storage or distributed storage service (ex: NFS)
 
 - **built-in** its hard drive directly on a server (usually premise datacenters).

After created you can describe a mount path, file type, size and virtual volumes configuration (if exist).

.. image:: ../../../_static/screen/vol_2.png
   :alt: Maestro Server - LVMs

------------

**Server Resources**

Datacenters and servers have some assumption resources, and there are volumes, flavors, images, and networks.

.. image:: ../../../_static/screen/volumes_p.png
   :alt: Maestro Server - Servers resources

- **Volumes**: List of volumes (ex: EBS, HardDisk)

- **Flavors**: Datacenters information, can be public or private. 

- **Images**: Images hosted on datacenter, used for virtualization services.

- **Network**: depends on providers architecture, for example aws have security groups, acls, vpcs and subnets and etc.

