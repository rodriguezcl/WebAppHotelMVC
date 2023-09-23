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
    public class PersonaDAL: CadenaDAL
    {
        public List<PersonaCLS> listarPersona()
        {
            List<PersonaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspListarPersona", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<PersonaCLS>();
                            PersonaCLS oPersonaCLS;
                            int posIdpersona = drd.GetOrdinal("IIDPERSONA");
                            int posNombreCompleto = drd.GetOrdinal("NOMBRECOMPLETO");
                            int posNombreSexo = drd.GetOrdinal("NOMBRESEXO");
                            int posNombreTipoUsuario = drd.GetOrdinal("NOMBRETIPOUSUARIO");
                            while (drd.Read())
                            {
                                oPersonaCLS = new PersonaCLS();
                                oPersonaCLS.iidpersona = drd.IsDBNull(posIdpersona) ? 0 :
                                    drd.GetInt32(posIdpersona);
                                oPersonaCLS.nombreCompleto = drd.IsDBNull(posNombreCompleto) ? ""
                                    : drd.GetString(posNombreCompleto);
                                oPersonaCLS.nombreSexo = drd.IsDBNull(posNombreSexo) ? ""
                                    : drd.GetString(posNombreSexo);
                                oPersonaCLS.nombreTipoUsuario = drd.IsDBNull(posNombreTipoUsuario) ? ""
                                    : drd.GetString(posNombreTipoUsuario);
                                lista.Add(oPersonaCLS);
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

        public List<PersonaCLS> filtrarPersona(int iidtipousuario)
        {
            List<PersonaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarPersonaPorTipoUsuario", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idtipousuario", iidtipousuario);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<PersonaCLS>();
                            PersonaCLS oPersonaCLS;
                            int posIdpersona = drd.GetOrdinal("IIDPERSONA");
                            int posNombreCompleto = drd.GetOrdinal("NOMBRECOMPLETO");
                            int posNombreSexo = drd.GetOrdinal("NOMBRESEXO");
                            int posNombreTipoUsuario = drd.GetOrdinal("NOMBRETIPOUSUARIO");
                            while (drd.Read())
                            {
                                oPersonaCLS = new PersonaCLS();
                                oPersonaCLS.iidpersona = drd.IsDBNull(posIdpersona) ? 0 :
                                    drd.GetInt32(posIdpersona);
                                oPersonaCLS.nombreCompleto = drd.IsDBNull(posNombreCompleto) ? ""
                                    : drd.GetString(posNombreCompleto);
                                oPersonaCLS.nombreSexo = drd.IsDBNull(posNombreSexo) ? ""
                                    : drd.GetString(posNombreSexo);
                                oPersonaCLS.nombreTipoUsuario = drd.IsDBNull(posNombreTipoUsuario) ? ""
                                    : drd.GetString(posNombreTipoUsuario);
                                lista.Add(oPersonaCLS);
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
