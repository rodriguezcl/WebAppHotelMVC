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
   public class MarcaDAL:CadenaDAL
    {

        public List<MarcaCLS> listarMarca()
        {
            List<MarcaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspListarMarca", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MarcaCLS>();
                            MarcaCLS oMarcaCLS;
                            int posId = drd.GetOrdinal("IIDMARCA");
                            int posNombre = drd.GetOrdinal("NOMBREMARCA");
                            int posDescripcion = drd.GetOrdinal("DESCRIPCION");
                            while (drd.Read())
                            {
                                oMarcaCLS = new MarcaCLS();
                                oMarcaCLS.iidMarca = drd.IsDBNull(posId) ? 0 :
                                    drd.GetInt32(posId);
                                oMarcaCLS.nombreMarca = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oMarcaCLS.descripcionMarca = drd.IsDBNull(posDescripcion) ? ""
                                    : drd.GetString(posDescripcion);
                                lista.Add(oMarcaCLS);
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
