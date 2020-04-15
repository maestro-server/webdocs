
You can use kubernetes to run maestro server, 
the easy way it's create a gke/eks cluster and run all deployment files found in `k8s deployments <https://github.com/maestro-server/infraascode-maestro/tree/master/kubernetes/>`_,

Creating secrets files
----------------------

First step it's create 4 secrets files (secrets/)

- mongo_srv.txt
- smtp.txt
- storage.txt

And populate accordlingly, running

.. code-block:: bash

   kubectl create secret generic smtp --from-env-file secrets/smtp.txt
   kubectl create secret generic mongo_srv --from-env-file secrets/mongo_srv.txt
   kubectl create secret generic storage --from-env-file secrets/storage.txt

**storage.txt**

.. code-block:: bash

	AWS_ACCESS_KEY_ID=
	AWS_SECRET_ACCESS_KEY=
	AWS_DEFAULT_REGION=
	AWS_S3_BUCKET_NAME=

**mongo_srv.txt**

.. code-block:: bash

	MAESTRO_MONGO_URI=mongo+srv://mongodb:27017

**smtp.txt**

.. code-block:: bash

	SMTP_PORT=
	SMTP_HOST=
	SMTP_SENDER=
	SMTP_USERNAME=
	SMTP_PASSWORD=
	SMTP_USETSL=

To check if everything it's ok run 

.. code-block:: bash

	> kubectl get secrets

	NAME                  TYPE                                  DATA      AGE
	mongosrv              Opaque                                1         24d
	smtp                  Opaque                                6         18d
	storage               Opaque                                4         17d

--------

Deployment each service
-----------------------

.. code-block:: bash

	source run.sh

Or

Create a third services.

.. code-block:: bash

	kubectl apply -f mongo/
	kubectl apply -f rabbitmq/
	kubectl apply -f maildev/

Maestro micro services deployments.

.. code-block:: bash

	kubectl apply -f maestro-websocket/
	kubectl apply -f maestro-data/
	kubectl apply -f maestro-discovery/
	kubectl apply -f maestro-reports/
	kubectl apply -f maestro-analytics/
	kubectl apply -f maestro-analytics-front/
	kubectl apply -f maestro-audit/
	kubectl apply -f maestro-scheduler/
	kubectl apply -f maestro-server/
	kubectl apply -f maestro-client/

---------

Checking deployments
--------------------

.. code-block:: bash

	> kubectl get deployments

	NAME                       DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
	maestro-analytics          1         1         1            1           6d
	maestro-analytics-front    1         1         1            1           6d
	maestro-analytics-worker   1         1         1            1           6d
	maestro-audit              1         1         1            1           6d
	maestro-data               1         1         1            1           24d
	maestro-discovery          1         1         1            1           6d
	maestro-discovery-worker   1         1         1            1           6d
	maestro-reports            1         1         1            1           6d
	maestro-reports-worker     1         1         1            1           6d
	maestro-scheduler          1         1         1            1           6d
	maestro-scheduler-worker   1         1         1            1           6d
	maestro-server             2         2         2            2           6d
	maestro-websocket          1         1         1            1           6d
	rabbitmq                   1         1         1            1           24d


Checking exposed services
-------------------------

.. code-block:: bash

	> kubectl get svc  

	NAME                       TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)                       AGE
	external-analytics-front   LoadBalancer   10.XX.252.63    XX.XX.XX.XX      80:30859/TCP                  23d
	external-server            LoadBalancer   10.XX.245.248   XX.XX.XX.XX      80:31254/TCP                  23d
	external-websocket         LoadBalancer   10.XX.253.161   XX.XX.XX.XX      8443:30705/TCP,80:31146/TCP   21d

	internal-analytics         ClusterIP      10.XX.240.129   <none>           5020/TCP                      6d
	internal-analytics-front   ClusterIP      10.XX.243.157   <none>           9999/TCP                      23d
	internal-audit             ClusterIP      10.XX.243.250   <none>           10900/TCP                     6d
	internal-data              ClusterIP      10.XX.244.111   <none>           5010/TCP                      24d
	internal-discovery         ClusterIP      10.XX.240.202   <none>           5000/TCP                      6d
	internal-rabbit            ClusterIP      10.XX.243.117   <none>           5672/TCP,15672/TCP            24d
	internal-reports           ClusterIP      10.XX.241.218   <none>           5005/TCP                      6d
	internal-websocket         ClusterIP      10.XX.241.159   <none>           8000/TCP                      21d

.. Note::

    Must have 3 public endpoint, it's server app, analytics front and websocket system.