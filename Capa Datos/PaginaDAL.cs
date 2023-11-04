using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Capa_Entidad;
namespace Capa_Datos
{
    public class PaginaDAL:CadenaDAL
    {

        public List<PaginaCLS> listarPagina()
        {
            List<PaginaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspListarPagina", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<PaginaCLS>();
                            PaginaCLS oPaginaCLS;
                            int posId = drd.GetOrdinal("IIDPAGINA");
                            int posNombre = drd.GetOrdinal("MENSAJE");
                       
                            while (drd.Read())
                            {
                                oPaginaCLS = new PaginaCLS();
                                oPaginaCLS.iidpagina = drd.IsDBNull(posId) ? 0 :
                                    drd.GetInt32(posId);
                                oPaginaCLS.mensaje = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                              
                                lista.Add(oPaginaCLS);
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
