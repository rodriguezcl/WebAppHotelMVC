using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
    public class TipoUsuarioBL
    {
        public List<TipoUsuarioCLS> listarTipoUsuario()
        {
            TipoUsuarioDAL oTipoUsuarioDAL = new TipoUsuarioDAL();
            return oTipoUsuarioDAL.listarTipoUsuario();
        }
    }
}
