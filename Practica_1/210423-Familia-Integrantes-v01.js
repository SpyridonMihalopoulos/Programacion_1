/* 

	Autor: Spyridon Mihalopoulos
	CI: 28.204.677

*/



// -- MODELO -- 

class MIntegrante {

	constructor(ingM = 0, gastM = 0) {

		this.ingresoMensual = ingM;
		this.gastoMensual = gastM;
	} 

	set ingresoMensual(inMen) {

		this._ingresoMensual = inMen;
	}

	get ingresoMensual() {

		return this._ingresoMensual;
	}

	set gastoMensual(gasMen) {

		this._gastoMensual = gasMen;
	}

	get gastoMensual() {

		return this._gastoMensual;
	}

	calcularMontoDisponible() {

		return this.ingresoMensual - this.gastoMensual;
	}

}

class MFamilia {

    constructor(montT = 0) {

		this.montoTotal = montT;
	}

	set montoTotal(mTotal) {

		this._montoTotal = mTotal;
	} 

	get montoTotal() {

		return this._montoTotal
	}


	procesarIntegrante(mInt = new MIntegrante()) {

		console.log("Procesando");
		this.montoTotal += mInt.calcularMontoDisponible();
	}

}


// -- VISTAS -- 
	
class VIntegrante {

	reporteIntegrante( mInt = new MIntegrante() ) {

		reporte.innerHTML += 
			`${String(mInt.ingresoMensual).padEnd(43,' . ')}` + 
			`${String(mInt.gastoMensual).padEnd(43,' . ')}`+
			`${String(mInt.calcularMontoDisponible()).padStart(40,' . ')}` + "<br>" 

	}
}

class VFamilia {

	reporteFamilia( mFam = new MFamilia()) {

		reporte.innerHTML += `<br>Ingreso total familiar: ${mFam.montoTotal} <br>`;
	}

}

// -- CONTROLADOR -- 

class Controlador {

	constructor() {
		this.mInte = new MIntegrante();
		this.mFam = new MFamilia();
		this.vInte = new VIntegrante();
		this.vFam = new VFamilia();
	}

	procesarIntegrantes1() {

		reporte.innerHTML = 

			" -- REPORTE EJEMPLO -- <br><br>" + 
			"Ingreso Mensual..... Gasto Mensual..... Monto Disponible <br>" + 
			"=============================================== <br>" 

		let integrante1 = new MIntegrante(600,500);
		let integrante2 = new MIntegrante(800,400);
		let integrante3 = new MIntegrante(900,200);
		let integrante4 = new MIntegrante(100,50);

		this.mFam.procesarIntegrante(integrante1);
		this.vInte.reporteIntegrante(integrante1);

		this.mFam.procesarIntegrante(integrante2);
		this.vInte.reporteIntegrante(integrante2);

		this.mFam.procesarIntegrante(integrante3);
		this.vInte.reporteIntegrante(integrante3);

		this.mFam.procesarIntegrante(integrante4);
		this.vInte.reporteIntegrante(integrante4);
		
		this.vFam.reporteFamilia(this.mFam);	

		this.procesarIntegrantes2();
	}


	procesarIntegrantes2() {

		var procesar = confirm("Desea procesar manualmente");

		if(procesar) {

			this.mFam.montoTotal = 0;

			reporte.innerHTML += 

				"<br><br> -- REPORTE MANUAL -- <br><br>" + 
				"Ingreso Mensual..... Gasto Mensual..... Monto Disponible <br>" + 
				"=============================================== <br>" 

			while(procesar) {
				
				var ingresoMensual = prompt("Ingreso mensual:");
				var gastoMensual = prompt("Gasto mensual:");

				this.mInte.ingresoMensual = ingresoMensual;
				this.mInte.gastoMensual = gastoMensual;

				this.mFam.procesarIntegrante(this.mInte);
				procesar = confirm("Desea procesar otro integrante?")

				this.vInte.reporteIntegrante(this.mInte);

			}

			this.vFam.reporteFamilia(this.mFam);
		}

		else {
			console.log("Nadie que procesar");
		}

	}
	
}


//MAIN

const controlador = new Controlador();

controlador.procesarIntegrantes1();