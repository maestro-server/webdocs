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

    version: '2'

    services:
    server:
        image: maestroserver/server-maestro
        ports:
        - "8888:8888"
        environment:
        - UPLOAD_TYPE=Local
        - LOCAL_DIR=/upload

    client:
        image: maestroserver/client-maestro
        ports:
        - "8888:8888"
        environment:
        - STATIC_URL='/static'


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
 ======================= ================================ 

 .. code-block:: yaml

    version: '2'

    services:
    server:
        image: maestroserver/server-maestro
        ports:
        - "8888:8888"
        environment:
        - AWS_ACCESS_KEY_ID='XXXXXXXXXX'                    
        - AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        - AWS_DEFAULT_REGION='us-east-1'              
        - AWS_S3_BUCKET_NAME='maestroserver'


    client:
        image: maestroserver/client-maestro
        ports:
        - "8888:8888"
        environment:
        - STATIC_URL='http://maestroserver.s3.aws.com.br'


.. Note::

    Need to be adjusted client-app appoint new local file