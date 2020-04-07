import requests
import json
from urllib.parse import urlencode

token_endpoint = 'https://login.microsoftonline.com/4ae48b41-0137-4599-8661-fc641fe77bea/oauth2/v2.0/token'
auth_payload= {
            "client_id": "83dadba2-5cb8-40a9-b1c7-f91a1e8d7d1a",
            "scope": "https://arup.onmicrosoft.com/AIS/user_impersonation https://graph.microsoft.com/User.Read",
            "grant_type": "password",
            "username": 'SVC-ADS-AUS.POPL@arup.com',
            "password": 'T#lr+tr*V328rovob$l*',
            }

post_head = {"content-type": "application/x-www-form-urlencoded"}
post_string = urlencode(auth_payload)


r = requests.post(token_endpoint, data=auth_payload, headers=post_head)

print(r.content)

# headers = {
#     # Request headers
#     'Ocp-Apim-Subscription-Key': '6934b8beac4a49f6ba5ac266a129279e',
#     'Authorization': '{access token}',
# }

# params = urllib.parse.urlencode({
#     # Request parameters
#     '$select': '{string}',
#     '$filter': '{string}',
#     '$expand': '{string}',
#     '$orderby': '{string}',
#     '$top': '{integer}',
#     '$skip': '{integer}',
#     '$count': '{boolean}',
# })

# try:
#     conn = http.client.HTTPSConnection('adsprapiman-aue.azure-api.net')
#     conn.request("GET", "/cds/odata/Companies?%s" % params, "{body}", headers)
#     response = conn.getresponse()
#     data = response.read()
#     print(data)
#     conn.close()
# except Exception as e:
#     print("[Errno {0}] {1}".format(e.errno, e.strerror))
