using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
    public class CategoriaBL
    {
        public List<CategoriaCLS> listarCategoria()
        {
            CategoriaDAL oCategoriaDAL = new CategoriaDAL();
            return oCategoriaDAL.listarCategoria();
        }

        public CategoriaCLS recuperarCategoria(int iidCategoria)
        {
            CategoriaDAL oCategoriaDAL = new CategoriaDAL();
            return oCategoriaDAL.recuperarCategoria(iidCategoria);
        }

        public int guardarCategoria(CategoriaCLS oCategoriaCLS)
        {
            CategoriaDAL oCategoriaDAL = new CategoriaDAL();
            return oCategoriaDAL.guardarCategoria(oCategoriaCLS);
        }

        public int eliminarCategoria(int iidCategoria)
        {
            CategoriaDAL oCategoriaDAL = new CategoriaDAL();
            return oCategoriaDAL.eliminarCategoria(iidCategoria);
        }
    }
}
