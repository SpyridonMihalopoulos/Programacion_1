class MEstudiante {
	
	constructor(c = '', ca = 0, l = 0){
		this.cedula = c;
		this.carrera = ca; // 1 - Informatica, 2 - Matematica, 3 - Analisis
		this.cantLibros = l;
	}

	set cantLibros(cantL) {
		this._cantLibros =  cantL;
	} 

	get cantLibros() {
		return this._cantLibros;
	}

	montoTotal() {

		switch(this.carrera) {

			case 1:

				return this.cantLibros * 200;

			case 2: 

				return this.cantLibros * 600;

			case 3: 

				return this.cantLibros * 500;

			default:
				break;

		}
	}

	descuento() {
		if(this.cantLibros >= 4) {
			return this.montoTotal() * 20/100;
		}

		else {
			return 0;
		}
	}

}

class MCentro {

	constructor(v = 0, e = 0, es1 = 0) {
		this.vendido_2Libros = v;
		this.estudiantes = e; 
		this.est_1Libro = es1; // Contador de estudiantes que compraron 1 libro
	 }

	set vendido_2Libros(ven){
		this._vendido_2Libros = ven;
	}

	get vendido_2Libros() {
		return this._vendido_2Libros;
	}

	set estudiantes(est) {
		this._estudiantes = est;
	}

	get estudiantes() {
		return this._estudiantes;
	}

	set est_1Libro(est1) {
		this._est_1Libro = est1;
	}

	get est_1Libro() {
		return this._est_1Libro;
	}

	procesarEstudiante(e = new MEstudiante()) {

		this.estudiantes++;
		
		if( e.cantLibros > 2 ) {
			this.vendido_2Libros += e.montoTotal() - e.descuento();
		}

		else if( e.cantLibros == 1 ) {
			this.est_1Libro ++
		}

	}

	porcent_1Libro() {
		return this.est_1Libro * 100 / this.estudiantes;
	}
}

class VEstudiante {

	reporteEstudiante(e = new MEstudiante()) {

		consola_salida.innerHTML += 
			`${String(e.cedula).padEnd(18,' . ')}` +
			`${String(e.carrera).padEnd(18,' . ')}` +
			`${String(e.cantLibros).padEnd(18,' . ')}` +
			`${String(e.descuento()).padEnd(18,' . ')}` +
			`${String(e.montoTotal() - e.descuento()).padStart(18,' . ')}` + '<br>';
	}
}

class VCentro {

	reporteCentro(c = new MCentro()) {
	
		consola_salida.innerHTML += 
			`<br>Monto total vendido a estudiantes con mas de 2 libros: ${String(c.vendido_2Libros)}<br>` + 
			`Porcentaje de estudiantes que compraron solo 1 libro: ${String(c.porcent_1Libro())}%<br>`
	}
}

class Controlador {

	constructor() {
		this.mEst = new MEstudiante();
		this.mCent = new MCentro();
		this.vEst = new VEstudiante();
		this.vCent = new VCentro();
	}

	procesar(){
		
		consola_salida.innerHTML = 
			' -- REPORTE DE PRUEBA -- <br><br>' +
			'Cédula . . . Carrera . . . Libros . . . Descuento . . . Monto total <br>' + 
			'=================================================================== <br>';

		let estudiante1 = new MEstudiante(333,1,2);
		let estudiante2 = new MEstudiante(888,2,4);
		let estudiante3 = new MEstudiante(444,3,1);
		let estudiante4 = new MEstudiante(999,2,3);
		let estudiante5 = new MEstudiante(555,1,3);

		this.mCent.procesarEstudiante(estudiante1);
		this.vEst.reporteEstudiante(estudiante1);

		this.mCent.procesarEstudiante(estudiante2);
		this.vEst.reporteEstudiante(estudiante2);

		this.mCent.procesarEstudiante(estudiante3);
		this.vEst.reporteEstudiante(estudiante3);

		this.mCent.procesarEstudiante(estudiante4);
		this.vEst.reporteEstudiante(estudiante4);

		this.mCent.procesarEstudiante(estudiante5);
		this.vEst.reporteEstudiante(estudiante5);

		this.vCent.reporteCentro(this.mCent);

		this.procesar2();
	}

	procesar2() {
		
		var procesar = confirm('Desea procesar manualmente?');

		if( procesar ) {

			this.mCent.vendido_2Libros = 0;
			this.mCent.estudiantes = 0;
	
			consola_salida.innerHTML += 
				'<br><br> -- REPORTE MANUAL -- <br><br>' +
				'Cédula . . . Carrera . . . Libros . . . Descuento . . . Monto total <br>' + 
				'=================================================================== <br>';

			while( procesar ){
				
				this.mEst.cedula = prompt('Ingrese cédula:')
				this.mEst.carrera = parseFloat(prompt('Ingrese carrera (1 - Informática, 2 - Matemática, 3 - Análisis):'));
				this.mEst.cantLibros = parseFloat(prompt('Ingrese cantidad de libros: '));

				this.mCent.procesarEstudiante(this.mEst);
				this.vEst.reporteEstudiante(this.mEst);

				procesar = confirm("Desea procesar otro estudiante?");
			}

			this.vCent.reporteCentro(this.mCent);
		}
	}

}

const controlador = new Controlador();

controlador.procesar();
