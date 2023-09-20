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
   public class ProductoDAL:CadenaDAL
    {



        public List<ProductoCLS> filtrarProductos(string nombre)
        {
            List<ProductoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarProductos", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombre", nombre);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ProductoCLS>();
                            ProductoCLS oProductoCLS;
                            int posId = drd.GetOrdinal("IIDPRODUCTO");
                            int posNombreProducto = drd.GetOrdinal("NOMBRE");
                            int posNombreMarca = drd.GetOrdinal("NOMBREMARCA");
                            int posPrecio = drd.GetOrdinal("PRECIOVENTA");
                            int posStock = drd.GetOrdinal("STOCK");
                            while (drd.Read())
                            {
                                oProductoCLS = new ProductoCLS();
                                oProductoCLS.iidproducto = drd.IsDBNull(posId) ? 0 : drd.GetInt32(posId);
                                oProductoCLS.nombreproducto = drd.IsDBNull(posNombreProducto) ? ""
                                    : drd.GetString(posNombreProducto).ToUpper();
                                oProductoCLS.nombremarca = drd.IsDBNull(posNombreMarca) ? ""
                                   : drd.GetString(posNombreMarca);
                                oProductoCLS.precioventa = drd.IsDBNull(posPrecio) ? 0
                                 : drd.GetDecimal(posPrecio);
                                oProductoCLS.stock = drd.IsDBNull(posStock) ? 0
                                : drd.GetInt32(posStock);
                                oProductoCLS.denominacion =
                                    drd.IsDBNull(posStock) ? "" :
                                   (drd.GetInt32(posStock) > 50 ? "Alto" : "Bajo");
                                lista.Add(oProductoCLS);
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

        public List<ProductoCLS> listarProductos()
        {
            List<ProductoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspListarProductos", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ProductoCLS>();
                            ProductoCLS oProductoCLS;
                            int posId = drd.GetOrdinal("IIDPRODUCTO");
                            int posNombreProducto = drd.GetOrdinal("NOMBRE");
                            int posNombreMarca = drd.GetOrdinal("NOMBREMARCA");
                            int posPrecio = drd.GetOrdinal("PRECIOVENTA");
                            int posStock = drd.GetOrdinal("STOCK");
                            while (drd.Read())
                            {
                                oProductoCLS = new ProductoCLS();
                                oProductoCLS.iidproducto = drd.IsDBNull(posId) ? 0 : drd.GetInt32(posId);
                                oProductoCLS.nombreproducto = drd.IsDBNull(posNombreProducto) ? ""
                                    : drd.GetString(posNombreProducto).ToUpper();
                                oProductoCLS.nombremarca = drd.IsDBNull(posNombreMarca) ? ""
                                   : drd.GetString(posNombreMarca);
                                oProductoCLS.precioventa = drd.IsDBNull(posPrecio) ? 0
                                 : drd.GetDecimal(posPrecio);
                                oProductoCLS.stock = drd.IsDBNull(posStock) ? 0
                                : drd.GetInt32(posStock);
                                oProductoCLS.denominacion =
                                    drd.IsDBNull(posStock) ? "" :
                                   ( drd.GetInt32(posStock) > 50 ? "Alto" : "Bajo");
                                lista.Add(oProductoCLS);
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
