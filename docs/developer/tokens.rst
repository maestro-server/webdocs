JWT Tokens
==========

Some endpoint needs to be authenticated, Maestro use JWT token to authenticate a user and two or more systems, each system has own secret token shared between concerned services.
Example, WebSocket only accept a request if another service uses a specific jwt (maestro_secretjwt_socket).

Follow an architecture of switch tokens

------------

.. image:: ../_static/screen/tokens.png


+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
| JWT Name                   | Context                                    | Owned by               | Used by         |                                                          |
+============================+============================================+========================+=================+==========================================================+
| SecreteJwt                 | Autheticate user                           | Server App             | Client App      | Jwt user auth                                            |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
|                            |                                            |                        | Discovery App   | Command to crawler 3 party provider                      |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
|                            |                                            |                        | Analytics Front | Jwt user auth                                            |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
|                            |                                            |                        | WebSocket       | Hashtable message bus received                           |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
| SecretJwt Public Analytics | Auth shared links (public access)          | Server App             | Analytics Front | Used to create token to allowed public access on graphs  |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
| SecretJwt Analytics        | Auth along analytics apps                  | Analytics App (Worker) | Analytics Front | Security key to allowed to post on analytics front       |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
| SecretJwt Crpto Forgot     | First secret key, request forgot password  | Server App             | Client App      |                                                          |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
| SecretJwt Forgot           | Second secret key, confirm forgot password | Server App             | Server App      |                                                          |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
| SecretJwt Socket           | Auth along websockets apps                 | Websocket App          | Analytics App   | Security key to allowed to post on websocket message bus |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
|                            |                                            |                        | Discovery App   |                                                          |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+
|                            |                                            |                        | Report App      |                                                          |
+----------------------------+--------------------------------------------+------------------------+-----------------+----------------------------------------------------------+

- **Owned** - Responsible to create and maintain that token
- **Context** - High-level description
- **Used** - Consumed the token