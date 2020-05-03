Using external store engine as S3
=================================

**Services**

- server
- analytics_front

---------

You can choose two upload mode, a local file or using S3 storage.

The upload system was used on two points:

+---------------+-----------------------------------------------------------+
| server-app    | Using on avatar users, teams and projects images.         |
+---------------+-----------------------------------------------------------+
| analytics app | To store artifacts such as graphs, svgs and pngs          |
+---------------+-----------------------------------------------------------+

Local Storage
-------------

For a single node, the file will be stored on a local disk.

Env variables

 ============= ================ 
  UPLOAD_TYPE   Local        
  LOCAL_DIR     /public/static/ 
 ============= ================ 

 .. code-block:: yaml

    server:
        image: maestroserver/server-maestro
        environment:
        - UPLOAD_TYPE=Local
        - LOCAL_DIR=/public/static/

    client:
        image: maestroserver/client-maestro
        environment:
        - STATIC_URL='http://server-app:8888/static/'

.. Note::

    These are the default configurations, you don't need to declare these values.

------

AWS S3 Storage
--------------

You can use a S3 Amazon storage object service to store an upload files.

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
        - STATIC_URL='https://{my_aws_endpoint}.s3.aws.com.br/{mybucketname}/'


.. Note::

    - Remember to set the righ path on ``STATIC_URL`` endpoint into client-app.
    - The bucket need to be public.

-------

Digital Ocean Spaces
--------------------

You can use Digital ocean space, they uses the same S3 protocol, but rather than AWS you need to set ``AWS_ENDPOINT``. 

Env variables

======================= ================================ 
UPLOAD_TYPE             S3 
AWS_ACCESS_KEY_ID       XXXXXXXXXX                      
AWS_SECRET_ACCESS_KEY   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  
AWS_DEFAULT_REGION      ny3                       
AWS_S3_BUCKET_NAME      maestroserver
AWS_ENDPOINT            S3 endpoint       
======================= ================================ 

- Endpoint can be ny3.spacesdigitalocean
- Access and secret can be get on spaces dashboard.
- AWS_DEFAULT_REGION can be ny3