# usage 

```javascript 
import {O_url} from "https://deno.land/x/o_url/O_url.module.js"


var o_url = new O_url("https://maxmuster:geheim@www.example.com:8080/index.html?p1=A&p2=B#ressource")
assertEquals(o_url.s_domainname, "www.example.com")
assertEquals(o_url.s_protocol, "https")
assertEquals(o_url.s_username, "maxmuster")
assertEquals(o_url.s_password, "geheim")
assertEquals(o_url.s_port, "8080")
assertEquals(o_url.n_port, 8080)
assertEquals(o_url.s_path, "/index.html")
assertEquals(o_url.s_query, "?p1=A&p2=B")
assertEquals(o_url.s_fragment, "#ressource")

```
## convert domain name to ip address (nslookup) 
```
var o_url = new O_url("https://one.one.one.one")
await o_url.f_update_a_s_ip()
console.log(o_url)
assertEquals(o_url.a_s_ipv4.filter(s => s == '1.1.1.1'),['1.1.1.1'])
```


## geolocation
```
```

# what is a url /  uri ? 
![](./readme/url-structure-and-scheme-2022.png)
![](./readme/url-urn-uri-structure-2022.png)


# basic example 

```javascript 
var s_my_string = "./readme/url-structure-and-scheme-2022.png"

var o_url = new O_url(s_my_string)

console.log(o_url.s_path_name) // "./readme/"

console.log(o_url.s_file_name) // "url-structure-and-scheme-2022.png"

