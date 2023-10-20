const express = require("express")//memanggil library express js
const bodyParser = require("body-parser")//memanggil library body-parser (bodyParser = var, body-parser = library)
const cors = require("cors")//memanggil library cors
const app = express()//implementasi express

//penggunaan body-parser
//penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())
//penggunaan body-parser
//penggunaan body-pparser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({extended: true}))

//implementasi cors
//penggunaan cors agar end point dapat diakses oleh cross platform 
app.use(cors())

//ngoding disinii
app.get("/kecepatan", (req,res) => {
    //v = kecepatan
    //s = jarak
    //t = waktu
    let kecepatan = req.params.kecepatan
    let jarak = req.params.jarak
    let waktu = req.params.waktu
    let hitung = get_hitung(kecepatan)

    function get_hitung(kecepatan){
    if(hitung == kecepatan){
        return "kecepatan = "  + jarak / waktu 
    }else if(hitung == jarak){
        return "Jarak = " + kecepatan * waktu
    }else if(hitung == waktu){
        return "Waktu" +jarak / kecepatan
    }else{
        return "mohon isi data"
    }
}

   let response = {
    kecepatan: kecepatan,
    jarak: jarak,
    waktu: waktu
   }
   res.json(response);
   })

  

   app.post("/konversi", (req, res) =>{
    let mg = Number(req.body.berat)
    
    let cg = mg / 10
    let dg = mg / 100
    let g = mg / 1000
    let dag = mg /10000
    let hg = mg / 100000
    let kg = mg / 1000000
    let hitung = get_hitung(konversi)

    function get_hitung(konversi){
        if(konversi >= mg){ 
            return cg * 10
        } else if (konversi <= kg){
            return cg / 10
        } else {
            return 'input salah'
        }        
    }
    
    let response = {
        mg: mg,
        "result: " : {
        cg: cg,
        dg: dg,
        g: g,
        dag: dag,
        hg: hg,
        kg: kg,
        hitung: hitung
    }
}
  res.json(response);
});

//!!!!!!!!!!!!!!!!!REMEDDDD!!!!!!!!!!!!!!!!!

app.get("/berat/:satuan/:data", (req, res) => {
    const satuan = req.params.satuan;
    const data = req.params.data;
    const results = {};
    let result;
    const berat = {
        kg: 1,
        hg: 10,
        dag: 100,
        g: 1000,
        dg: 10000,
        cg: 100000,
        mg: 1000000
    };

    if (satuan == "mg") {
        result = data / 1000000;
    } else if (satuan == "cg") {
        result = data / 100000;
    } else if (satuan == "dg") {
        result = data / 10000;
    } else if (satuan == "g") {
        result = data / 1000;
    } else if (satuan == "dag") {
        result = data / 100;
    } else if (satuan == "hg") {
        result = data / 10;
    } else {
        result = data
    }

    for (const jadi in berat) {
        results[jadi] = result * berat[jadi];
    }
    let response = {
        hasil: results
    };

    res.json(response);
})


app.post("/lari", (req, res) => {
    let f = Number(req.body.f);
    let m = Number(req.body.m);
    let a = Number(req.body.a);
    let hitung = req.body.hitung;

    let response;

    if (hitung === 'f') {
        f = m * a;
    } else if (hitung === 'm') {
        m = f / a;
    } else if (hitung === 'a') {
        a = f / m;
    }

    response = {
        "result": {
            f: f,
            m: m,
            a: a
        }
    };

    res.json(response);
});
//menjalankan server pada port 8000
app.listen(8000, () =>{
    console.log("Server run on port 8000");
})