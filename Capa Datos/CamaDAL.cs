using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Capa_Datos;
using Capa_Entidad;

public class CamaDAL:CadenaDAL
    {
        public List<CamaCLS> listarCama()
        {
            List<CamaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspListarCama", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<CamaCLS>();
                            CamaCLS oCamaCLS;
                            int posId = drd.GetOrdinal("IIDCAMA");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posDescripcion = drd.GetOrdinal("DESCRIPCION");
                            while (drd.Read())
                            {
                                oCamaCLS = new CamaCLS();
                            oCamaCLS.idcama = drd.IsDBNull(posId) ? 0:
                                drd.GetInt32(posId);
                            oCamaCLS.nombre = drd.IsDBNull(posNombre)?""
                                : drd.GetString(posNombre);
                            oCamaCLS.descripcion = drd.IsDBNull(posDescripcion) ? "" 
                                :drd.GetString(posDescripcion);
                                lista.Add(oCamaCLS);
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

    public List<CamaCLS> filtrarCama(string nombrecama)
    {
        List<CamaCLS> lista = null;
        //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
        using (SqlConnection cn = new SqlConnection(cadena))
        {
            try
            {
                //Abro la conexion
                cn.Open();
                //Llame al procedure
                using (SqlCommand cmd = new SqlCommand("uspFiltarCama", cn))
                {
                    //Buena practica (Opcional)->Indicamos que es un procedure
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@nombrecama", nombrecama);
                    SqlDataReader drd = cmd.ExecuteReader();
                    if (drd != null)
                    {
                        lista = new List<CamaCLS>();
                        CamaCLS oCamaCLS;
                        int posId = drd.GetOrdinal("IIDCAMA");
                        int posNombre = drd.GetOrdinal("NOMBRE");
                        int posDescripcion = drd.GetOrdinal("DESCRIPCION");
                        while (drd.Read())
                        {
                            oCamaCLS = new CamaCLS();
                            oCamaCLS.idcama = drd.GetInt32(posId);
                            oCamaCLS.nombre = drd.GetString(posNombre);
                            oCamaCLS.descripcion = drd.GetString(posDescripcion);
                            lista.Add(oCamaCLS);
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

