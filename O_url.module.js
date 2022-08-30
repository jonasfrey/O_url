class O_url{

    constructor(
        s
    ){
        this._s = s

        this.s_dir_separator = null
        this.s_file_name = null
        this.s_path_name = null

        this.s_protocol = null
        this.s_windows_drive_letter = null
    }
    get s(){
        return this._s
    }
    set s(value){
        this._s = value
        this.f_update_all()
    }


    f_update_all(){

        // detect separator 
        this.s_dir_separator = '/'
        var n_count_backslash = this.s.filter(s=>s=='\\').length
        var n_count_slash = this.s.filter(s=>s=='/').length 
        if(n_count_backslash > n_count_slash){
            this.s_dir_separator = '\\'
        }


        // check if protocol

        // |-------------------- Schema-spezifischer Teil ---------------------|
        // https://maxmuster:geheim@www.example.com:8080/index.html?p1=A&p2=B#ressource
        // \___/   \_______/ \____/ \_____________/ \__/\_________/ \_______/ \_______/
        //   |         |       |           |         |       |          |         |
        // Schema+ Benutzer Kennwort      Host      Port    Pfad      Query    Fragment
        // ⁺ (hier gleich Netzwerkprotokoll)

        var s_sep = ""
        var a_s_part = this.s.split(s_sep)
        var s_tmp = this.s
        if(a_s_part.length > 1){
            this.s_protocol = a_s_part.shift()
            s_tmp = a_s_part.join(s_sep)
        }

        var a_s_part = s_tmp.split(this.s_dir_separator)


        // we have no chance of checkinf if the first part of the path is a 
        // userpass domain port
        // because the string 'maxmuster:geheim@www.example.com:8080' could be 
        // the name of a folder/director in linux , try it!: '$ mkdir maxmuster:geheim@www.example.com:8080' 
        var s_userpass_domain_port = a_s_part[0]

        //domain names 
        // They must start with a letter, end with a letter or digit, and have as interior characters only letters, digits, and hyphen. There are also some restrictions on the length. Labels must be 63 characters or less

        // file:///verzeichnis/unterverzeichnis/datei
        // \__/ \___________________________________/
        //   |                     |
        // Schema                  |
        //         Pfad zu einer lokalen Datei im Dateisystem des Rechners, der den URL interpretiert

    }

}