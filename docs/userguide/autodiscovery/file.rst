Import using JSON files
==========================

You can import servers from json files. Maestro can uses three method to get those files.

- By upload file
- Over ssh
- On S3 Bucket

------------

**Resources**

+-------------------+
| server-List:      |
+-------------------+
| volumes-list:     |
+-------------------+
| snapshot-list:    |
+-------------------+
| images-list:      |
+-------------------+
| applications-list |
+-------------------+
| flavor-list:      |
+-------------------+

------------

**Example of json file**

.. code-block:: json

   {
      "servers": [{
         "name" : "myname",
         "hostname" : "myhostname",
         "ipv4_private" : "127.0.0.2",
         "ipv4_public" : "89.89.89.89",
         "os" : {
               "base" : "Linux",
               "dist" : "Ubuntu",
               "version" : "14"
         },
         "datacenters" : {
               "name" : "random-1",
               "provider" : "randomdc",
               "region" : "region-1",
               "zone" : "zon1"
         },
         "role" : "Application",
         "environment" : "Production",
         "services" : [{}],
         "tags" : [{}],
         "cpu" : 2,
         "memory" : 2,
         "storage" : []
      }],
      "applications": [{
         "name" : "myname",
         "family": "Applications"
      }],
      "volumes": [{
         "name" : "vvolume",
         "size": "500"
      }],
      "flavors": [{
         "name" : "flavors"
      }],
      "snapshots": [{
         "name" : "snashots",
         "size": "500"
      }],
      "images": [{
         "name" : "myimages",
         "size": "500"
      }]
   }
