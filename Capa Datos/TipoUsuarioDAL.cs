using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Datos
{
    public class TipoUsuarioDAL: CadenaDAL
    {
        public List<TipoUsuarioCLS> listarTipoUsuario()
        {
            List<TipoUsuarioCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspListarTipoUsuario", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TipoUsuarioCLS>();
                            TipoUsuarioCLS oTipoUsuarioCLS;
                            int posId = drd.GetOrdinal("IIDTIPOUSUARIO");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posDescripcion = drd.GetOrdinal("DESCRIPCION");
                            while (drd.Read())
                            {
                                oTipoUsuarioCLS = new TipoUsuarioCLS();
                                oTipoUsuarioCLS.iidtipousuario = drd.IsDBNull(posId) ? 0 :
                                    drd.GetInt32(posId);
                                oTipoUsuarioCLS.nombre = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oTipoUsuarioCLS.descripcion = drd.IsDBNull(posDescripcion) ? ""
                                    : drd.GetString(posDescripcion);
                                lista.Add(oTipoUsuarioCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }
    }
}
