Upload Config
=============

You can choose two mode to upload the files, a local file or using S3 to storage direcly.

Where need to configure an upload file manage:

+---------------+-----------------------------------------------------------+
| server-app    | Using in avatar users, teams and projects images.         |
+---------------+-----------------------------------------------------------+
| discovery app | Using to store report artifact, like pdfs, csv and jsons. |
+---------------+-----------------------------------------------------------+

Local
-----

For a single node, the file will be stored in local disk.

Env variables

 ============= ================ 
  UPLOAD_TYPE   Local        
  LOCAL_DIR     /upload  
 ============= ================ 

 .. code-block:: yaml

    services:
    server:
        image: maestroserver/server-maestro
        environment:
        - UPLOAD_TYPE=Local
        - LOCAL_DIR=/upload

    client:
        image: maestroserver/client-maestro
        environment:
        - STATIC_URL='http://server-app:8888/static'


AWS S3
------

You can use S3 Amazon storage object service, perfectly for HA environments

Env variables

 ======================= ================================ 
  UPLOAD_TYPE             S3 
  AWS_ACCESS_KEY_ID       XXXXXXXXXX                      
  AWS_SECRET_ACCESS_KEY   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  
  AWS_DEFAULT_REGION      us-east-1                       
  AWS_S3_BUCKET_NAME      maestroserver
  AWS_ENDPOINT            S3 endpoint       
 ======================= ================================ 

 .. code-block:: yaml

    services:
    server:
        image: maestroserver/server-maestro
        environment:
        - AWS_ACCESS_KEY_ID='XXXXXXXXXX'                    
        - AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        - AWS_DEFAULT_REGION='us-east-1'              
        - AWS_S3_BUCKET_NAME='maestroserver'


    client:
        image: maestroserver/client-maestro
        environment:
        - STATIC_URL='http://maestroserver.s3.aws.com.br'


.. Note::

    Need to be adjusted client-app appoint new local file

Digital Ocean Spaces
--------------------

You can use Digital ocean space

Env variables

======================= ================================ 
UPLOAD_TYPE             S3 
AWS_ACCESS_KEY_ID       XXXXXXXXXX                      
AWS_SECRET_ACCESS_KEY   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  
AWS_DEFAULT_REGION      us-east-1                       
AWS_S3_BUCKET_NAME      maestroserver
AWS_ENDPOINT            S3 endpoint       
======================= ================================ 

Endpoint can be ny3.spacesdigitalocean
Access and secret it's create on spaces dashboard.
AWS_DEFAULT_REGION can be ny3

-------

Services
--------

- Server App
- Analytics Front