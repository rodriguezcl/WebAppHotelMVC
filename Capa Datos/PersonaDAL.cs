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

        public PersonaCLS recuperarPersona(int iidpersona)
        {
            PersonaCLS oPersonaCLS=null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarPersona", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@iidpersona", iidpersona);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                           
                           
                            int posIdpersona = drd.GetOrdinal("IIDPERSONA");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posApPaterno = drd.GetOrdinal("APPATERNO");
                            int posApMaterno = drd.GetOrdinal("APMATERNO");
                            int posTelefonoFijo = drd.GetOrdinal("TELEFONOFIJO");
                            int posIdSexo = drd.GetOrdinal("IIDSEXO");
                            int posIdTipoUsuario = drd.GetOrdinal("IIDTIPOUSUARIO");
                            while (drd.Read())
                            {
                                oPersonaCLS = new PersonaCLS();
                                oPersonaCLS.iidpersona = drd.IsDBNull(posIdpersona) ? 0 :
                                    drd.GetInt32(posIdpersona);
                                oPersonaCLS.nombre = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oPersonaCLS.apellidopaterno = drd.IsDBNull(posApPaterno) ? ""
                                    : drd.GetString(posApPaterno);
                                oPersonaCLS.apellidomaterno = drd.IsDBNull(posApMaterno) ? ""
                                    : drd.GetString(posApMaterno);
                                oPersonaCLS.telefono = drd.IsDBNull(posTelefonoFijo) ? ""
                                    : drd.GetString(posTelefonoFijo);
                                oPersonaCLS.iidsexo = drd.IsDBNull(posIdSexo) ? 0
                                    : drd.GetInt32(posIdSexo);
                                oPersonaCLS.iidtipousuario = drd.IsDBNull(posIdTipoUsuario) ? 0
                                     : drd.GetInt32(posIdTipoUsuario);
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
            return oPersonaCLS;


        }

        public int guardarPersona(PersonaCLS oPersonaCLS)
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
                    using (SqlCommand cmd = new SqlCommand("uspGuardarPersona", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@iidpersona", oPersonaCLS.iidpersona);
                        cmd.Parameters.AddWithValue("@nombre", oPersonaCLS.nombre);
                        cmd.Parameters.AddWithValue("@appaterno", oPersonaCLS.apellidopaterno);
                        cmd.Parameters.AddWithValue("@apmaterno", oPersonaCLS.apellidomaterno);
                        cmd.Parameters.AddWithValue("@telefonofijo", oPersonaCLS.telefono);
                        cmd.Parameters.AddWithValue("@iidsexo", oPersonaCLS.iidtipousuario);
                        cmd.Parameters.AddWithValue("@iidtipousuario", oPersonaCLS.iidsexo);
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
    }
}
