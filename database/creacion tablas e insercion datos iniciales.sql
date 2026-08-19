-----------------------CREACIÓN DE TABLAS
--Creación tabla clinicas
CREATE TABLE clinicas (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre varchar(150) NOT NULL,
    descripcion text,
    activo boolean NOT NULL DEFAULT true,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp
);

--Creación tabla consultorios
CREATE TABLE consultorios (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinica_id uuid NOT NULL,
    nombre varchar(150) NOT NULL,
    descripcion text,
    activo boolean NOT NULL DEFAULT true,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp,
    CONSTRAINT fk_consultorio_clinica
        FOREIGN KEY (clinica_id) REFERENCES clinicas(id)
);

--Creación tabla roles
CREATE TABLE roles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre varchar(50) NOT NULL UNIQUE,
    descripcion text
);

--Creación tabla usuarios
CREATE TABLE usuarios (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinica_id uuid NOT NULL,
    nombre varchar(100) NOT NULL,
	telefono varchar(10) NOT NULL,
    email varchar(150) NOT NULL UNIQUE,
    password_hash text NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    ultimo_acceso timestamp,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp,
    CONSTRAINT fk_usuario_clinica
        FOREIGN KEY (clinica_id) REFERENCES clinicas(id)
);

--Creación tabla usuarios_roles
CREATE TABLE usuarios_roles (
    usuario_id uuid NOT NULL,
    rol_id uuid NOT NULL,
    PRIMARY KEY (usuario_id, rol_id),
    CONSTRAINT fk_ur_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_ur_rol
        FOREIGN KEY (rol_id) REFERENCES roles(id)
);

SELECT * FROM roles
SELECT * FROM usuarios
SELECT * FROM usuarios_roles

--Creación tabla especialistas
CREATE TABLE especialistas (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id uuid NOT NULL UNIQUE,
    especialidad varchar(100),
    cedula_profesional varchar(50),
    activo boolean NOT NULL DEFAULT true,
    CONSTRAINT fk_doctor_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
SELECT * FROM especialistas
--Creación tabla pacientes
CREATE TABLE pacientes (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinica_id uuid NOT NULL,
    nombre varchar(150) NOT NULL,
    fecha_nacimiento date NOT NULL,
    telefono varchar(10),
    email varchar(150),
    notas text,
    activo boolean NOT NULL DEFAULT true,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp,
    CONSTRAINT fk_paciente_clinica
        FOREIGN KEY (clinica_id) REFERENCES clinicas(id)
);
SELECT * FROM pacientes
--Creación tabla citas
CREATE TABLE citas (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinica_id uuid NOT NULL,
    consultorio_id uuid NOT NULL,
    especialista_id uuid NOT NULL,
    paciente_id uuid NOT NULL,
    fecha_hora timestamp NOT NULL,
    estado varchar(30) NOT NULL DEFAULT 'Programada',
    motivo_consulta text,
    notas text,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp,
    CONSTRAINT fk_cita_clinica
        FOREIGN KEY (clinica_id) REFERENCES clinicas(id),
    CONSTRAINT fk_cita_consultorio
        FOREIGN KEY (consultorio_id) REFERENCES consultorios(id),
    CONSTRAINT fk_cita_especialista
        FOREIGN KEY (especialista_id) REFERENCES especialistas(id),
    CONSTRAINT fk_cita_paciente
        FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);
ALTER TABLE citas ADD COLUMN duracion_minutos INT DEFAULT 30;
SELECT * FROM citas

--Creación tabla expedientes
CREATE TABLE historial_clinico (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id uuid NOT NULL,
    especialista_id uuid NOT NULL,
    cita_id uuid,
    fecha timestamp NOT NULL DEFAULT now(),
    motivo_consulta text,
    diagnostico text,
    tratamiento text,
    observaciones text,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp,
    CONSTRAINT fk_historial_paciente
        FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    CONSTRAINT fk_historial_especialista
        FOREIGN KEY (especialista_id) REFERENCES especialistas(id),
    CONSTRAINT fk_historial_cita
        FOREIGN KEY (cita_id) REFERENCES citas(id)
);
SELECT * FROM historial_clinico
SELECT h.*, p.nombre AS paciente_nombre , u.nombre AS especialista_nombre
    FROM historial_clinico h JOIN pacientes p ON h.paciente_id = p.id
    JOIN especialistas e ON h.especialista_id=e.id JOIN usuarios u ON e.usuario_id=u.id
    WHERE h.paciente_id = $1 ORDER BY h.fecha DESC

SELECT h.*, p.nombre AS paciente_nombre , u.nombre AS especialista_nombre,
    c.fecha_hora AS cita_fecha, c.motivo_consulta AS cita_motivo, c.notas AS cita_notas
    FROM historial_clinico h JOIN pacientes p ON h.paciente_id = p.id
    JOIN especialistas e ON h.especialista_id=e.id JOIN usuarios u ON e.usuario_id=u.id
    LEFT JOIN citas c ON h.cita_id = c.id


SELECT * FROM citas
SELECT * FROM pacientes
--Creación tabla archivos_medicos
CREATE TABLE archivos_clinicos (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    historial_id uuid NOT NULL,
    nombre_archivo varchar(255) NOT NULL,
    tipo_archivo varchar(50),
    ruta_archivo text NOT NULL,
    descripcion text,
    created_at timestamp NOT NULL DEFAULT now(),
    CONSTRAINT fk_archivo_historial
        FOREIGN KEY (historial_id) REFERENCES historial_clinico(id) ON DELETE CASCADE
);
SELECT * FROM archivos_clinicos
--Creación tabla tratamientos
CREATE TABLE tratamientos (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    historial_id uuid NOT NULL,
    nombre varchar(150) NOT NULL,
    descripcion text,
    costo numeric(10,2) NOT NULL,
    estado varchar(30) DEFAULT 'pendiente',
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp,
    CONSTRAINT fk_tratamiento_historial
        FOREIGN KEY (historial_id) REFERENCES historial_clinico(id)
);

--Creación tabla pagos
CREATE TABLE pagos (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    tratamiento_id uuid NOT NULL,
    paciente_id uuid NOT NULL,
    monto numeric(10,2) NOT NULL,
    metodo_pago varchar(50) NOT NULL,
    referencia_pago varchar(100),
    fecha_pago timestamp NOT NULL DEFAULT now(),
    notas text,
    created_at timestamp NOT NULL DEFAULT now(),
    CONSTRAINT fk_pago_tratamiento
        FOREIGN KEY (tratamiento_id) REFERENCES tratamientos(id),
    CONSTRAINT fk_pago_paciente
        FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

SELECT * FROM consultorios

CREATE TABLE odontograma (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	paciente_id uuid NOT NULL,
	diente_numero varchar(5) NOT NULL,
	cara varchar(10),
	estado varchar(50),
	tratamiento_id uuid,
	notas text,
	created_at timestamp DEFAULT now(),
	CONSTRAINT fk_odontograma_paciente
		FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
	CONSTRAINT fk_odontograma_tratamiento
		FOREIGN KEY (tratamiento_id) REFERENCES tratamientos(id)
);

ALTER TABLE odontograma
ADD CONSTRAINT unique_diente_cara
UNIQUE (paciente_id, diente_numero, cara);

SELECT * FROM tratamientos
SELECT * FROM pagos
SELECT * FROM odontograma

SELECT * FROM historial_clinico

ALTER TABLE historial_clinico
ADD COLUMN tipo varchar(50) DEFAULT 'consulta';


SELECT * FROM pacientes
ALTER TABLE pacientes
ADD COLUMN tipo_paciente varchar(20);

