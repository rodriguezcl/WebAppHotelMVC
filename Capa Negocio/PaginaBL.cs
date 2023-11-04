using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Datos;
namespace Capa_Negocio
{
   public class PaginaBL
    {

        public List<PaginaCLS> listarPagina()
        {
            PaginaDAL obj = new PaginaDAL();
            return obj.listarPagina();

        }

    }
}
