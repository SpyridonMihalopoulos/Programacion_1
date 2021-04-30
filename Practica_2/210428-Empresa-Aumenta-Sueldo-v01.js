
// MODELO 
class MPersonal {

    constructor(c = 0, s = 0, tE = 0) {

        this.cedula = c;
        this.sueldo = s;
        this.tEmp = tE;
        
    }

    set cedula(ced) {

        this._cedula = ced;
    }

    get cedula() {
        return this._cedula;
    }

    set sueldo(sueld) {

        this._sueldo = sueld;
    }

    get sueldo() {
        return this._sueldo;
    }

    set tEmp(tE) {

        this._tEmp = tE;
    }

    get tEmp() {
        return this._tEmp;
    }


    calcularNSueldo() {

        if ( this.tEmp == 1 ) {

            return this.sueldo + this.sueldo * 20 / 100 
        }   

        else if ( this.tEmp == 2 ) {

            return this.sueldo + this.sueldo * 10 / 100 
        }

        else return 0;
    }

}


class MEmpresa {

    constructor(cP = 0, cO = 0, aT ) {

        this.cantPerso = cP;
        this.cantObreros = cO;
        this.aumentoTotal = aT;
    }

    set cantPerso(cantP) {
        
        this._cantPerso = cantP;
    }

    get cantPerso() {

        return this._cantPerso;
    }

    set cantObreros(cantO) {

        this._cantObreros = cantO;
    }

    get cantObreros() {

        return this._cantObreros;
    }

    set aumentoTotal(auT) {

        this._aumentoTotal = auT;
    }

    get aumentoTotal() {

        return this._aumentoTotal;
    }

    porcentObrero() {

        return this.cantObreros * 100 / this.cantPerso;
    }

    procesarPersonal( p = new MPersonal() ) {

        this.cantPerso++;

        this.aumentoTotal += parseInt(p.calcularNSueldo() - p.sueldo)

        console.log(this.aumentoTotal)

        if ( p.tEmp == 1 ) this.cantObreros++; 
    }
}

// VISTA

class VPersonal {

    reportePersonal( p = new MPersonal()) {

        consola_salida.innerHTML += 
            `${String(p.cedula).padEnd(45,' . ')}` + 
            `${String(p.sueldo).padEnd(40, ' . ')}` + 
            `${String(p.tEmp).padEnd(32, ' . ')}` + 
            `${String(p.calcularNSueldo() - p.sueldo).padEnd(65,' . ')}` + 
            `${String(p.calcularNSueldo())}` + "<br>"
    }
}

class VEmpresa {

    reporteEmpresa(e = new MEmpresa()) {

        consola_salida.innerHTML += 
            "<br>" + 
            `Total de incremento de sueldo: ${String(e.aumentoTotal)} <br>` + 
            `Porcentaje de personal obrero: ${String(parseInt(e.porcentObrero()))}% <br>`
    }

}


// CONTROLADOR

class Controlador {

    constructor() {

        this.mPersonal = new MPersonal();
        this.mEmpresa = new MEmpresa();
        this.vPersonal = new VPersonal();
        this.vEmpresa = new VEmpresa();
    }

    procesar() {

        this.mEmpresa.aumentoTotal = 0;
        consola_salida.innerHTML = 

            " -- REPORTE DE PRUEBA -- <br> <br>" +
            "Cédula . . . . . . . . . . Sueldo . . . . . . . . . . Tipo . . . . . . . . " + 
            "Incremento . . . . . . . . . . Nuevo Sueldo <br>" + 
            "=========================================================================== <br>"

        const personal1 = new MPersonal( 555, 200, 2);
        const personal2 = new MPersonal( 888, 500, 1);
        const personal3 = new MPersonal( 777, 400, 2);
        const personal4 = new MPersonal( 666, 600, 1);
        const personal5 = new MPersonal( 444, 800, 1);

        this.mEmpresa.procesarPersonal(personal1);
        this.vPersonal.reportePersonal(personal1);

        this.mEmpresa.procesarPersonal(personal2);
        this.vPersonal.reportePersonal(personal2);

        this.mEmpresa.procesarPersonal(personal3);
        this.vPersonal.reportePersonal(personal3);

        this.mEmpresa.procesarPersonal(personal4);
        this.vPersonal.reportePersonal(personal4);

        this.mEmpresa.procesarPersonal(personal5);
        this.vPersonal.reportePersonal(personal5);

        this.vEmpresa.reporteEmpresa(this.mEmpresa);
        
        this.procesar2()

    }

    procesar2() {

        var procesar = confirm("Deseas procesar manualmente?");

        if ( procesar ) { 

            this.mEmpresa.cantObreros = 0;
            this.mEmpresa.aumentoTotal = 0; 
            this.mEmpresa.cantPerso = 0;


            consola_salida.innerHTML += 

                " <br><br>-- REPORTE DE EMPRESA -- <br> <br>" + 
                "Cédula . . . . . . . . . . Sueldo . . . . . . . . . . Tipo . . . . . . . . " + 
                "Incremento . . . . . . . . . . Nuevo Sueldo <br>" + 
                "=========================================================================== <br>"


            while(procesar) {

                this.mPersonal.cedula = prompt("Ingrese cédula:");     
                this.mPersonal.sueldo = parseInt(prompt("Ingrese sueldo:"));     
                this.mPersonal.tEmp = prompt("Ingrese tipo de empleado (1-Obrero, 2-Administrativo):");     

                this.mEmpresa.procesarPersonal(this.mPersonal);

                procesar = confirm("Desea procesar otro empleado?")
                
                this.vPersonal.reportePersonal(this.mPersonal);
            }

            this.vEmpresa.reporteEmpresa(this.mEmpresa);
        }
    }

}


const controlador = new Controlador();

controlador.procesar();

