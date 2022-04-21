-- Engine: PostgreSQL 14
-- Date: 2014-12-31

-- Drops
DROP TABLE IF EXISTS persona;
DROP TABLE IF EXISTS vivienda;
DROP TABLE IF EXISTS municipio;

create table municipio
(
    id          serial
        constraint municipio_pk
            primary key,
    nombre      varchar(50) not null,
    area        double precision,
    presupuesto double precision
);


create table vivienda
(
    id           serial
        constraint vivienda_pk
            primary key,
    direccion    varchar(100),
    capacidad    integer default 1 not null,
    niveles      integer           not null,
    id_municipio integer           not null
        constraint vivienda_municipio_id_fk
            references municipio
);

comment on column vivienda.capacidad is 'Cuantas personas pueden habitarla';


create table persona
(
    id          serial
        constraint persona_pk
            primary key,
    cedula      varchar(40) not null,
    nombre      varchar(45) not null,
    telefono    integer,
    edad        integer     not null,
    sexo        integer,
    id_vivienda integer
        constraint persona_vivienda_id_fk
            references vivienda,
    cdf         integer
        constraint persona_persona_id_fk
            references persona
);

comment on column persona.id_vivienda is 'Can be null because of homeless people';

comment on column persona.cdf is 'Cabeza de familia';


create unique index persona_cedula_uindex
    on persona (cedula);

create table persona_has_vivienda
(
    id_persona  integer not null
        constraint persona_has_vivienda_persona_id_fk
            references persona,
    id_vivienda integer not null
        constraint persona_has_vivienda_vivienda_id_fk
            references vivienda,
    primary key (id_persona, id_vivienda)
);


