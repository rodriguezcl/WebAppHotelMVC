using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
   public class MarcaBL
    {

        public List<MarcaCLS> listarMarca()
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.listarMarca();

        }

        public List<MarcaCLS> filtrarMarca(string nombremarca)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.filtrarMarca(nombremarca);

        }

        public MarcaCLS recuperarMarca(int id)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.recuperarMarca(id);
        }

        public int guardarMarca(MarcaCLS oMarca)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.guardarMarca(oMarca);
        }

        public int eliminarMarca(int id)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.eliminarMarca(id);
        }

    }
}
