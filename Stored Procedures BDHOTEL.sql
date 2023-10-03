use BDHotel
go

--1)[uspEliminarCama]
create procedure uspEliminarCama
@id int
as
begin
update Cama
set BHABILITADO=0
where IIDCAMA=@id
end
go

--2)[uspEliminarMarca]
create procedure uspEliminarMarca
@id int
as
begin
update Marca
set BHABILITADO=0
where IIDMARCA=@id
end
go

--3)[uspEliminarTipoHabitacion]
create PROCEDURE uspEliminarTipoHabitacion
@id int
as
begin
update TipoHabitacion
set BHABILITADO=0
where IIDTIPOHABILITACION=@id
end
go

--4)[uspFiltarCama]
create procedure uspFiltarCama
@nombrecama varchar(100)
as
begin
if @nombrecama=''
  select IIDCAMA,NOMBRE,DESCRIPCION
  from Cama
  where BHABILITADO=1
else
select IIDCAMA,NOMBRE,DESCRIPCION
  from Cama
  where BHABILITADO=1 and NOMBRE like '%'+@nombrecama+'%'
end
go

--5)[uspFiltarTipoHabitacion]
create procedure uspFiltarTipoHabitacion
@nombrehabitacion varchar(100)
as
begin
if @nombrehabitacion=''
select IIDTIPOHABILITACION,NOMBRE,DESCRIPCION
from TipoHabitacion
where BHABILITADO=1
else
select IIDTIPOHABILITACION,NOMBRE,DESCRIPCION
from TipoHabitacion
where BHABILITADO=1 and NOMBRE LIKE '%'+@nombrehabitacion+'%'
end
go

--6)[uspFiltrarMarca]
create procedure uspFiltrarMarca
@nombre varchar(100)
as begin
if @nombre=''
select IIDMARCA,NOMBREMARCA,DESCRIPCION
from marca
where BHABILITADO=1
else
select IIDMARCA,NOMBREMARCA,DESCRIPCION
from marca
where BHABILITADO=1 and NOMBREMARCA like '%'+@nombre+'%'
end
go

--7)[uspFiltrarPersonaPorTipoUsuario]
create PROCEDURE uspFiltrarPersonaPorTipoUsuario
@idtipousuario int
as
begin
if @idtipousuario=0
select P.IIDPERSONA,P.NOMBRE+ ' '+P.APPATERNO+ ' '+P.APMATERNO
as NOMBRECOMPLETO ,S.NOMBRE AS NOMBRESEXO , T.NOMBRE AS NOMBRETIPOUSUARIO
from Persona P
INNER JOIN SEXO S
ON P.IIDSEXO=S.IIDSEXO 
INNER JOIN TipoUsuario T
ON P.IIDTIPOUSUARIO=T.IIDTIPOUSUARIO
WHERE P.BHABILITADO=1

else
select P.IIDPERSONA,P.NOMBRE+ ' '+P.APPATERNO+ ' '+P.APMATERNO
as NOMBRECOMPLETO ,S.NOMBRE AS NOMBRESEXO , T.NOMBRE AS NOMBRETIPOUSUARIO
from Persona P
INNER JOIN SEXO S
ON P.IIDSEXO=S.IIDSEXO 
INNER JOIN TipoUsuario T
ON P.IIDTIPOUSUARIO=T.IIDTIPOUSUARIO
WHERE P.BHABILITADO=1 and p.IIDTIPOUSUARIO=@idtipousuario
end
go

--8)[uspFiltrarProductoPorCategoria]
create procedure uspFiltrarProductoPorCategoria
@iidcategoria int
as
begin

if @iidcategoria=0
select p.IIDPRODUCTO,p.NOMBRE,m.NOMBREMARCA,p.PRECIOVENTA,p.STOCK
from producto p inner join
Marca m on p.IIDMARCA=m.IIDMARCA
where p.BHABILITADO=1
else
select p.IIDPRODUCTO,p.NOMBRE,m.NOMBREMARCA,p.PRECIOVENTA,p.STOCK
from producto p inner join
Marca m on p.IIDMARCA=m.IIDMARCA
where p.BHABILITADO=1 and p.IIDCATEGORIA=@iidcategoria
end
go

--9)[uspFiltrarProductoPorMarca]
create procedure uspFiltrarProductoPorMarca
@iidmarca int
as
begin
select p.IIDPRODUCTO,p.NOMBRE,m.NOMBREMARCA,p.PRECIOVENTA,p.STOCK
from producto p inner join
Marca m on p.IIDMARCA=m.IIDMARCA
where p.BHABILITADO=1 and p.IIDMARCA=@iidmarca
end
go

--10)[uspFiltrarProductos]
create procedure uspFiltrarProductos
@nombre varchar(100)
as
begin
if @nombre=''
select p.IIDPRODUCTO,p.NOMBRE,m.NOMBREMARCA,p.PRECIOVENTA,p.STOCK
from producto p inner join
Marca m on p.IIDMARCA=m.IIDMARCA
where p.BHABILITADO=1
else
select p.IIDPRODUCTO,p.NOMBRE,m.NOMBREMARCA,p.PRECIOVENTA,p.STOCK
from producto p inner join
Marca m on p.IIDMARCA=m.IIDMARCA
where p.BHABILITADO=1 and p.NOMBRE like '%'+@nombre+'%'
end
go

--11)[uspGuardarCama]
create procedure uspGuardarCama
@id int,
@nombre varchar(100),
@descripcion varchar(100)
as
begin
if @id=0
  insert into Cama(NOMBRE,DESCRIPCION,BHABILITADO)
  values(@nombre,@descripcion,1)
else
update Cama
set NOMBRE=@nombre,DESCRIPCION=@descripcion
where IIDCAMA=@id
end
go

--12)[uspGuardarMarca]
create procedure uspGuardarMarca
@id int,
@nombre varchar(100),
@descripcion varchar(100)
as 
begin

if @id=0
 insert into Marca (NOMBREMARCA,DESCRIPCION,BHABILITADO)
 values(@nombre,@descripcion,1)
else
update Marca
set NOMBREMARCA=@nombre,DESCRIPCION=@descripcion
where IIDMARCA=@id
end
go

--13)[uspGuardarTipohabitacion]
create procedure uspGuardarTipohabitacion
@id int,
@nombre varchar(100),
@descripcion varchar(100)
as
begin

if @id=0

insert into TipoHabitacion(NOMBRE,DESCRIPCION,BHABILITADO)
values(@nombre ,@descripcion,1)
else

update TipoHabitacion
set NOMBRE=@nombre , DESCRIPCION=@descripcion
where IIDTIPOHABILITACION=@id 


end
go

--14)[uspListarCama]
create procedure uspListarCama
as
begin
  select IIDCAMA,NOMBRE,DESCRIPCION
  from Cama
  where BHABILITADO=1
end
go

--15)[uspListarCategorias]
create procedure uspListarCategorias
as begin
select IIDCATEGORIA,NOMBRE,DESCRIPCION
from CATEGORIA 
end
go

--16)[uspListarMarca]
create procedure uspListarMarca
as begin
select IIDMARCA,NOMBREMARCA,DESCRIPCION
from marca
where BHABILITADO=1
end
go

--17)[uspListarPersona]
create PROCEDURE uspListarPersona
as
begin
select P.IIDPERSONA,P.NOMBRE+ ' '+P.APPATERNO+ ' '+P.APMATERNO
as NOMBRECOMPLETO ,S.NOMBRE AS NOMBRESEXO , T.NOMBRE AS NOMBRETIPOUSUARIO
from Persona P
INNER JOIN SEXO S
ON P.IIDSEXO=S.IIDSEXO 
INNER JOIN TipoUsuario T
ON P.IIDTIPOUSUARIO=T.IIDTIPOUSUARIO
WHERE P.BHABILITADO=1
end
go

--18)[uspListarProductos]
create procedure uspListarProductos
as
begin
select p.IIDPRODUCTO,p.NOMBRE,m.NOMBREMARCA,p.PRECIOVENTA,p.STOCK
from producto p inner join
Marca m on p.IIDMARCA=m.IIDMARCA
where p.BHABILITADO=1
end
go

--19)[uspListarTipoHabitacion]
create procedure uspListarTipoHabitacion
as
begin

select IIDTIPOHABILITACION,NOMBRE,DESCRIPCION
from TipoHabitacion
where BHABILITADO=1
end
go

--20)[uspListarTipoUsuario]
create procedure uspListarTipoUsuario
as
begin
select IIDTIPOUSUARIO,NOMBRE,DESCRIPCION
from TipoUsuario
where BHABILITADO=1
end
go

--21)[uspRecuperarCama]
create procedure uspRecuperarCama
@id int
as
begin
select IIDCAMA,NOMBRE,DESCRIPCION
from Cama
where IIDCAMA=@id
end
go

--22)[uspRecuperarMarca]
create procedure uspRecuperarMarca
@id int
as
begin
select IIDMARCA,NOMBREMARCA,DESCRIPCION
from Marca
where IIDMARCA=@id
end
go

--23)[uspRecuperarTipoHabitacion]
create PROCEDURE uspRecuperarTipoHabitacion
@id int
as
begin

select IIDTIPOHABILITACION,NOMBRE,DESCRIPCION
from TipoHabitacion
where IIDTIPOHABILITACION=@id

end
go

---------------------PROCEDURES PROPIOS--------------------------------


--24)[uspEliminarPersona]
create procedure uspEliminarPersona
@iidpersona int
as
begin
update Persona
set BHABILITADO=0
where IIDPERSONA=@iidpersona
end
go

--25)[uspGuardarPersona]
create procedure uspGuardarPersona
@iidpersona int,
@nombre varchar(100),
@appaterno varchar(100),
@apmaterno varchar(100),
@telefonofijo varchar(100),
@iidsexo int,
@iidtipousuario int
as
begin
if @iidpersona = 0
insert into Persona(NOMBRE, APPATERNO, APMATERNO, TELEFONOFIJO,IIDSEXO,IIDTIPOUSUARIO,BHABILITADO)
values(@nombre,
@appaterno,
@apmaterno,
@telefonofijo,
@iidsexo,
@iidtipousuario, 1)
else
update Persona
set NOMBRE= @nombre,APPATERNO=@appaterno,APMATERNO=@apmaterno,TELEFONOFIJO=@telefonofijo,IIDSEXO=@iidsexo,IIDTIPOUSUARIO=@iidtipousuario
where IIDPERSONA = @iidpersona
end
go

--26)[uspGuardarProducto]
create procedure uspGuardarProducto
@idproducto int,
@nombre varchar(100),
@idmarca int,
@descripcion varchar(100),
@preciocompra decimal (18,2),
@precioventa decimal (18,2),
@stock int,
@iidcategoria int
as 
begin

if @idproducto=0
 insert into Producto (NOMBRE,IIDMARCA,DESCRIPCION,PRECIOCOMPRA,PRECIOVENTA,STOCK,IIDCATEGORIA,BHABILITADO)
 values(@nombre,@idmarca,@descripcion,@preciocompra,@precioventa,@stock,@iidcategoria,1)
else
update Producto
set NOMBRE=@nombre,IIDMARCA=@idmarca,DESCRIPCION=@descripcion,PRECIOCOMPRA=@preciocompra,PRECIOVENTA=@precioventa,STOCK=@stock,IIDCATEGORIA=@iidcategoria
where IIDPRODUCTO=@idproducto
end
go


--27)[uspRecuperarPersona]
create procedure uspRecuperarPersona
@iidpersona int 
as
begin
select IIDPERSONA, NOMBRE, APPATERNO, APMATERNO, TELEFONOFIJO,IIDSEXO,IIDTIPOUSUARIO
from Persona
where IIDPERSONA = @iidpersona
end
go

--28)[uspRecuperarProducto]
create procedure uspRecuperarProducto
@idproducto int
as
begin
select IIDPRODUCTO,NOMBRE,IIDMARCA,DESCRIPCION,PRECIOCOMPRA,PRECIOVENTA,STOCK,IIDCATEGORIA
from Producto
where IIDPRODUCTO=@idproducto
end
go


