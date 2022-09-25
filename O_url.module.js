import {O_folder_file} from "https://deno.land/x/o_folder_file@0.3/O_folder_file.module.js"
class O_url{

    constructor(
        s
    ){
        // check if protocol

        // |-------------------- Schema-spezifischer Teil ---------------------|
        // https://maxmuster:geheim@www.example.com:8080/index.html?p1=A&p2=B#ressource
        // \___/   \_______/ \____/ \_____________/ \__/\_________/ \_______/ \_______/
        //   |         |       |           |         |       |          |         |
        // Schema+ Benutzer Kennwort      Host      Port    Pfad      Query    Fragment
        // ⁺ (hier gleich Netzwerkprotokoll)


        // file:///verzeichnis/unterverzeichnis/datei
        // \__/ \___________________________________/
        //   |                     |
        // Schema                  |
        //         Pfad zu einer lokalen Datei im Dateisystem des Rechners, der den URL interpretiert
        this.o_URL = new URL(s)
        this.s_protocol = this.o_URL.protocol.replaceAll(":", "")
        this.s_schema = this.s_protocol
        this.s_username = this.o_URL.username
        this.s_password = this.o_URL.password
        this.s_password = this.o_URL.password
        this.s_hostname = this.o_URL.hostname
        this.s_port = this.o_URL.port
        this.n_port = parseInt(this.o_URL.port)
        this.s_domainname = this.o_URL.hostname
        this.s_query = this.o_URL.search
        this.s_fragment = this.o_URL.hash
        this.s_ipv4 = ''
        this.s_ipv6 = ''
        this.a_s_ip = []
        this.a_s_ipv4 = []
        this.a_s_ipv6 = []
        this.o_folder_file = new O_folder_file(this.o_URL.pathname)
        this.s_path = this.o_URL.pathname
        this.o_geolocation = null
        


        var s_domainname_trimmed = this.s_domainname.trim()
        if(
            s_domainname_trimmed.indexOf('[') == 0
            &&
            s_domainname_trimmed.indexOf(']') == (s_domainname_trimmed.length-1)
        ){
            var s_domainname_trimmed = s_domainname_trimmed.splice(1, s_domainname_trimmed.length-1);
            this.s_ipv6 = s_domainname_trimmed
            // var a_s_domainname_part = s_domainname_trimmed.split(":")
            // 2606:4700:3033::ac43:b77f 
        }

        if(this.f_b_ipv4(this.s_domainname)){
            this.s_ipv4 = this.s_domainname
        }


    }

    get s(){
        return this._s
    }
    set s(value){
        this._s = value
        this.f_update_all()
    }
    async f_update_o_geolocation(){
        return new Promise( async (f_resolve) => {

            var s_ipv4 = this.s_ipv4
            if(s_ipv4 == ''){
                await this.f_update_a_s_ip()
                var s_ipv4 = this.s_ipv4
            }
            // console.log(this.s_ipv4)
            // this.o_geolocation = await (await fetch("https://"+s_ipv4)).read();
            const s_url = `https://ipinfo.io/${s_ipv4}`
            // console.log(s_url)
            var s_o_geolocation = 
            await (
                await (
                    fetch(
                        s_url,
                        { 
                            headers: { 'Accept': 'application/json'},
                        }
                    )
                )
            ).text();
                        
            this.o_geolocation = JSON.parse(s_o_geolocation)
            f_resolve() 
        })
        // var s_url = `curl ipinfo.io
        // this.o_ipinfo = Deno.run('curl ')
    }

    async f_update_a_s_ip(){
        return new Promise(async (f_resolve)=>{

            var a_s_ip = await this.f_a_s_ip_by_s_domainname(this.s_domainname)
            this.a_s_ipv4 = []
            this.a_s_ipv6 = []
            for(var n_i in a_s_ip){
                var s_ip = a_s_ip[n_i]
                
                if(this.f_b_ipv4(s_ip)){
                    this.a_s_ipv4.push(s_ip)
                    this.s_ipv4 = s_ip
                }else{
                    this.a_s_ipv6.push(s_ip)
                    this.s_ipv6 = s_ip
                }
            }
            f_resolve()  
        })
    }

    async f_a_s_ip_by_s_domainname(s_domainname){
        return new Promise(async (f_resolve) => {

            const o_process = Deno.run(
                {
                    cmd:['nslookup', s_domainname], 
                    stdout: "piped",
                    stderr: "piped",
                }
            )
            const { n_code } = await o_process.status();
            const raw_output = await o_process.output();
            const raw_error_output = await o_process.stderrOutput();
            await o_process.close()
            
            // const raw_output_err = await o_process.sdterrOutput();
            var a_s_address = []

            const s_text = new TextDecoder().decode(raw_output);
            const a_s_line = s_text.split('\n');
            const s_search_name = "Name:"
            const s_search_address = "Address:"
            var b_search_name = false
            var b_search_address = false
    
            for(var n_i in a_s_line){
                var s_line = a_s_line[n_i]
                if(s_line.indexOf(s_search_name) == 0){
                    b_search_name = true
                    continue
                }
                if(b_search_name && s_line.indexOf(s_search_address) == 0){
                    a_s_address.push(s_line.slice(s_search_address.length).trim())
                }
                b_search_address = false
                b_search_name = false
            }


            f_resolve(a_s_address)

        })
    }
    
    f_b_ipv4(s){
        var a_n = s.trim().split('.')
        var self = this
        var a_n_filtered = a_n.filter(n => self.f_b_string_is_numeric(n))
        // console.log(a_n_filtered)
        if(a_n.length == 4 && a_n_filtered.length == 4){
            return true
        }
        return false
    }
    f_b_string_is_numeric(s){
        return /^-?\d+$/.test(s);
    }


}

export {O_url}