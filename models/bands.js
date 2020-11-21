const Band = require("./band");

class Bands{
    constructor(){
        this.bands=[];//creamos el arreglo bandas
    }
    //agregamops una nueva banda
    addBand(band = new Band()){
        this.bands.push(band);
    }
    //obtenemos la banda
    getBands(){
        return this.bands;
    }
    //borramos una bandas
    deleteBand(id = ''){
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }
    //votamos por una banda
    voteBand(id = ''){
        this.bands= this.bands.map(band=>{
            if(band.id=== id){
                band.votes++;
                return band;
            }else{
                return band;
            }
        });
    }
}

module.exports= Bands;
