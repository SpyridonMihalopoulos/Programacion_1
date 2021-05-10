//MODELO

class MEstudiante {

	constructor(n = '', s = '', n1 = 0, n2 = 0, n3 = 0 ){

		this.nombre = n;
		this.sexo = s;
		this.nota1 = n1;
		this.nota2 = n2;
		this.nota3 = n3;
	}
	
	set nota1(not1) {
		this._nota1 = parseFloat(not1);
	}

	get nota1() {
		return this._nota1;
	}

	set nota2(not2) {
		this._nota2 = parseFloat(not2);
	}

	get nota2() {
		return this._nota2;
	}

	set nota3(not3) {
		this._nota3 = parseFloat(not3);	
	}

	get nota3() {
		return this._nota3;
	}
	
	calcularPromedio() {
		
		return (this.nota1 + this.nota2 + this.nota3)/5;
	}

	condicion() {

		if (this.calcularPromedio() >= 9.5 ) {
			return "Aprobado";
		}

		else if (this.calcularPromedio() < 9.5 ) {
			return "Reprobado";
		}
	}
}

class MMateria {

	constructor(mN = 0, mNom = '') {
		this.mejorNota = mN;
		this.mejorNombre = mNom;
	}

	set mejorNota(mNot) {
		this._mejorNota = mNot;
	} 

	get mejorNota() {
		return this._mejorNota;
	}

	set mejorNombre(mNom) {
		this._mejorNombre = mNom;
	}

	get mejorNombre() {
		return this._mejorNombre;
	}

	procesarEstudiante(e = new MEstudiante()) {
		if( e.calcularPromedio() > this.mejorNota ){
			
			this.mejorNota = e.calcularPromedio();
			this.mejorNombre = e.nombre;
		} 
	}
}

// VISTA 

class VEstudiante {

	reporteEstudiante(e = new MEstudiante()) {
		
		consola_salida.innerHTML += 
			`${String(e.nombre).padEnd(17, ' . ')}` + 
			`${String(e.sexo).padEnd(16, ' . ')}` + 
			`${String(e.nota1).padEnd(16, ' . ')}`+
			`${String(e.nota2).padEnd(16, ' . ')}`+
			`${String(e.nota3).padEnd(17, ' . ')}`+
			`${String(e.condicion()).padEnd(18, ' . ')}`+
			`${String(e.calcularPromedio()).padStart(14, ' . ')}` + '<br>';

	}
		
}

class VMateria {

	reporteMateria(m = new MMateria()) {

		consola_salida.innerHTML += 
			`<br>Estudiante con mayor nota: ${String(m.mejorNombre)}<br><br>`
	}
}


// CONTROLADOR 

class Contorlador {

	constructor() {
		this.mEstudiante = new MEstudiante();
		this.mMateria = new MMateria();
		this.vEstudiante = new VEstudiante();
		this.vMateria = new VMateria();
	}

	procesar() {
	
		var estudiante1 = new MEstudiante('Ana', 'F', 15, 10, 20);
		var estudiante2 = new MEstudiante('Leo', 'M', 30, 25, 20);
		var estudiante3 = new MEstudiante('Ray', 'M', 33, 27, 24);
		var estudiante4 = new MEstudiante('Liz', 'F', 20, 26, 32);

		consola_salida.innerHTML = 
			' -- REPORTE DE PRUEBA -- <br><br>' + 
			'Nombre . . . Sexo . . . Nota 1 . . . Nota2 . . . Nota 3 . . . Condición . . . Promedio' + '<br>' +
			'======================================================================================' + '<br>'

		this.mMateria.procesarEstudiante(estudiante1);
		this.vEstudiante.reporteEstudiante(estudiante1);
		
		this.mMateria.procesarEstudiante(estudiante2);
		this.vEstudiante.reporteEstudiante(estudiante2);

		this.mMateria.procesarEstudiante(estudiante3);
		this.vEstudiante.reporteEstudiante(estudiante3);

		this.mMateria.procesarEstudiante(estudiante4);
		this.vEstudiante.reporteEstudiante(estudiante4);

		this.vMateria.reporteMateria(this.mMateria);

		this.procesar2();
	}

	procesar2() {
		
		var procesar = confirm("Desea procesar manualmente?");

		if (procesar) {
	
			this.mMateria.mejorNombre = "";
			this.mMateria.mejorNota = 0;
			this.mEstudiante.nota1 = 0;
			this.mEstudiante.nota2 = 0;
			this.mEstudiante.nota3 = 0;
			

			consola_salida.innerHTML += 
				'<br> -- REPORTE MANUAL -- <br><br>' + 
	
			'Nombre . . . Sexo . . . Nota 1 . . . Nota2 . . . Nota 3 . . . Condición . . . Promedio' + '<br>' +
			'======================================================================================' + '<br>'

			while(procesar) {
	
				this.mEstudiante.nombre = prompt("Nombre del estudiante:");
				this.mEstudiante.sexo = prompt("Sexo del estudiante:");
				this.mEstudiante.nota1 = prompt("Primer nota:");
				this.mEstudiante.nota2 = prompt("Segunda nota:");
				this.mEstudiante.nota3 = prompt("Tercera nota:");

				this.vEstudiante.reporteEstudiante(this.mEstudiante);

					this.mMateria.procesarEstudiante(this.mEstudiante);
				procesar = confirm('Procesar otro estudiante?');
			}

			this.vMateria.reporteMateria(this.mMateria);
		
		}
	}
}

const controlador = new Contorlador();
controlador.procesar();
