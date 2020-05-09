Servers
-------
`Inventory > Server`

Server is a computer or a single program instance, which manages access to a centralized resource.

============ =============================================================================================================================
Field        Description
============ =============================================================================================================================
Hostname     Hostname
Ipv4 Private Ipv4 private, It will warning if there are any duplication,
Ipv4 Public  Ipv4 public, only for external servers.
OS           Operation system can be Linux adn Windows. Distro can be ubuntu, centos or any other.
CPU          CPU
Memory       Memory
Environment  Production | Development | Stage | ...
============ =============================================================================================================================

------------

Selecting the OS

.. image:: ../../../_static/screen/sv_os.png
   :alt: Maestro Server - Setup OS


------------

Server details

============ ========================================================================================================================================================================================================
Field        Description
============ ========================================================================================================================================================================================================
Storage      Storage configuration as a mount path, size in GB and if is a boot device.
Datacenter   Providers, region and zones, used by cloud datacenters, you can put the instance id on id_instance field, avoiding Maestro to duplicate this server.
Auth         Dummy information about how the team can loggin into servers.
Service      Show up all services running, It can be used on ``Application Manager`` page to track the service configuration.
============ ========================================================================================================================================================================================================

------------

.. figure:: ../../../_static/screen/sv_ddc.png
   :alt: Maestro Server - Assing datacenters name

Assing a dc name, region and zone on that server.

------------

.. figure:: ../../../_static/screen/sv_auth.png
   :alt: Maestro Server - Assing service authentication

describe how you can to access and authenticate on that server.

------------

.. Note::

   Services can be a very usefull field, Maestro are able to correlate services installed on servers and applications, as an example, you can create an Oracle Database on Databases applications, then you can create a new server and assign this server to that database, Maestro automatically do a service/application bound.


.. image:: ../../../_static/screen/sv_service.png
   :alt: Maestro Server - Servers and services


Related services.

------------

**Volumes**

.. image:: ../../../_static/screen/vol_1.png
   :alt: Maestro Server - Volumes - Attached or built

Can be attached or built-in:

 - **Attached** is a network storage or distributed storage service (ex: NFS)

 - **built-in** is a hard drive set in that server, very common on bare metal.

You will be able to describe where the mount path are, which file type, and a virtual volume configuration (LVM).

.. image:: ../../../_static/screen/vol_2.png
   :alt: Maestro Server - LVMs

------------

**Cloud Server Resources**

Volumes, flavors and images are servers resources provide by cloud providers, on top of servers you can create/list those resources.

.. image:: ../../../_static/screen/volumes_p.png
   :alt: Maestro Server - Servers resources

- **Volumes**: List of volumes (ex: EBS, HardDisk)

- **Flavors**: Instance flavors.

- **Images**: List of images, it used to build new servers. [As a template]

- **Network**: Network provider resources, as an example security groups, acls, vpcs, subnets and etc.

