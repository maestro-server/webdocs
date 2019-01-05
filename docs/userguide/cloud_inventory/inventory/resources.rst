Resources
---------
`Inventory > ${Resource}`

Resource usually its is no functional application, brokers, logs, dns are an example of these resources.

.. image:: ../../../_static/screen/resources_list.png
   :alt: Maestro Server - Resources list

Resources types:

========================== =============================================================================================================================
Family                      Description 
========================== ============================================================================================================================= 
Distributed cache           Cache system, example is Redis, Memcache
Brokers/Streams             Message system or streams system, can be RabbitMQ, SQS, Kafka and Spark Streams
CI/CD                       Ci Tools, like Jenkins, Atlassian Stack, AWS Pipeline
Serverless                  Function list, AWS lambdas, step functions, google function or Kuberless
Services Discovery          We have consul, etcD, hystrix and etc.
Api Gateway                 Api Gateway service, like Kong, AWS api gateway or tunned nginx.
CDNs                        CDNs services, cloudflare, akamai, cloud front and etc.
Auto Scaling                Autoscaling setup
Objects Storages            Objects storages, S3, GlusterFS, Ceph, DO Storages.
Containers Orchestration    Main pieces of orchestration tools, like master of kubernetes, eks configs, docker swarm, mesos and etc
Service Mesh                Like Linkerd, IstIO, Consul or AWS x-ray
Repository                  Nexus3, npm repository, docker repository, S3, private pip, nuget, gems, maven and more
Monitoring System           Prometheus, New Relic, Data dog, zabbix, nagios and etc
Logs System                 ELK stack, data dog, graylog and etc
Emails                      SMTP servers, postfix, or third service like sendgrid
VPNs                        VPNs Gateways
DNS                         Master and slaves, bind9, route 53
Auth                        Authetication systems, AD, LDAP, IAMs and etc
NAS                         NAS Gateway
========================== =============================================================================================================================


Specification

============ ======================================================================================================================================================================================================== 
Field        Functional 
============ ======================================================================================================================================================================================================== 
System       Systems related it.
Server       Servers deployed by app.
Cluster      If service runned on cluster mode
Spec         Specification about sercive, like endpoint, ports and etc.
============ ======================================================================================================================================================================================================== 

.. image:: ../../../_static/screen/resources_spec.png
   :alt: Maestro Server - Resources spec
