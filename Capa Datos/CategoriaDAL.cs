using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;

namespace Capa_Datos
{
    public class CategoriaDAL : CadenaDAL
    {
        public List<CategoriaCLS> listarCategoria()
        {
            List<CategoriaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspListarCategorias", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<CategoriaCLS>();
                            CategoriaCLS oCategoriaCLS;
                            int posId = drd.GetOrdinal("IIDCATEGORIA");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posDescripcion = drd.GetOrdinal("DESCRIPCION");
                            while (drd.Read())
                            {
                                oCategoriaCLS = new CategoriaCLS();
                                oCategoriaCLS.iidCategoria = drd.IsDBNull(posId) ? 0 :
                                    drd.GetInt32(posId);
                                oCategoriaCLS.nombreCategoria = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oCategoriaCLS.descripcionCategoria = drd.IsDBNull(posDescripcion) ? ""
                                    : drd.GetString(posDescripcion);
                                lista.Add(oCategoriaCLS);
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

        public CategoriaCLS recuperarCategoria(int iidCategoria)
        {
            CategoriaCLS oCategoriaCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarCategoria", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idcategoria", iidCategoria);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {


                            int posId = drd.GetOrdinal("IIDCATEGORIA");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posDescripcion = drd.GetOrdinal("DESCRIPCION");
                            while (drd.Read())
                            {
                                oCategoriaCLS = new CategoriaCLS();
                                oCategoriaCLS.iidCategoria = drd.IsDBNull(posId) ? 0 :
                                    drd.GetInt32(posId);
                                oCategoriaCLS.nombreCategoria = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oCategoriaCLS.descripcionCategoria = drd.IsDBNull(posDescripcion) ? ""
                                    : drd.GetString(posDescripcion);

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
            return oCategoriaCLS;


        }

        public int guardarCategoria(CategoriaCLS oCategoriaCLS)
        {
            int rpta = 0;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspGuardarCategoria", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idcategoria", oCategoriaCLS.iidCategoria);
                        cmd.Parameters.AddWithValue("@nombre", oCategoriaCLS.nombreCategoria);
                        cmd.Parameters.AddWithValue("@descripcion", oCategoriaCLS.descripcionCategoria);
                        rpta = cmd.ExecuteNonQuery();
                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }

        public int eliminarCategoria(int iidCategoria)
        {
            int rpta = 0;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspEliminarCategoria", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idcategoria", iidCategoria);
                        rpta = cmd.ExecuteNonQuery();
                        cn.Close();
                    }

                    //Cierro una vez de traer la data

                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }

    }
}
