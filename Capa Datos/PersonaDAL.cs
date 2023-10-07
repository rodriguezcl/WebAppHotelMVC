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
  public  class PersonaDAL:CadenaDAL
    {


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
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarPersona",
                        cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@iidpersona", iidpersona);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            
                           
                            int posIdpersona = drd.GetOrdinal("IIDPERSONA");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posAppaterno = drd.GetOrdinal("APPATERNO");
                            int posApmaterno = drd.GetOrdinal("APMATERNO");
                            int posTelefono = drd.GetOrdinal("TELEFONOFIJO");
                            int posidsexo = drd.GetOrdinal("IIDSEXO");
                            int posiidusuario = drd.GetOrdinal("IIDTIPOUSUARIO");
                            while (drd.Read())
                            {
                                oPersonaCLS = new PersonaCLS();
                                oPersonaCLS.iidpersona = drd.IsDBNull(posIdpersona) ? 0 :
                                    drd.GetInt32(posIdpersona);
                                oPersonaCLS.nombre = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oPersonaCLS.apellidopaterno = drd.IsDBNull(posAppaterno) ? ""
                                    : drd.GetString(posAppaterno);
                                oPersonaCLS.apellidomaterno = drd.IsDBNull(posApmaterno) ? ""
                                  : drd.GetString(posApmaterno);
                                oPersonaCLS.telefono = drd.IsDBNull(posTelefono) ? ""
                                  : drd.GetString(posTelefono);
                                oPersonaCLS.iidsexo = drd.IsDBNull(posidsexo) ? 0 :
                                    drd.GetInt32(posidsexo);
                                oPersonaCLS.iidtipousuario = drd.IsDBNull(posiidusuario) ? 0 :
                                  drd.GetInt32(posiidusuario);

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

        public int eliminarPersona(int iidpersona)
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
                    using (SqlCommand cmd = new SqlCommand("uspEliminarPersona", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@iidpersona", iidpersona);
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
                        cmd.Parameters.AddWithValue("@iidsexo", oPersonaCLS.iidsexo);
                        cmd.Parameters.AddWithValue("@iidtipousuario", oPersonaCLS.iidtipousuario);
                        cmd.Parameters.AddWithValue("@foto", oPersonaCLS.foto);
                        cmd.Parameters.AddWithValue("@nombrefoto", oPersonaCLS.nombrefoto);
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
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarPersonaPorTipoUsuario",
                        cn))
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
                            int posNombreTipousuario = drd.GetOrdinal("NOMBRETIPOUSUARIO");
                            while (drd.Read())
                            {
                                oPersonaCLS = new PersonaCLS();
                                oPersonaCLS.iidpersona = drd.IsDBNull(posIdpersona) ? 0 :
                                    drd.GetInt32(posIdpersona);
                                oPersonaCLS.nombreCompleto = drd.IsDBNull(posNombreCompleto) ? ""
                                    : drd.GetString(posNombreCompleto);
                                oPersonaCLS.nombreSexo = drd.IsDBNull(posNombreSexo) ? ""
                                    : drd.GetString(posNombreSexo);
                                oPersonaCLS.nombreTipoUsuario = drd.IsDBNull(posNombreTipousuario) ? ""
                                  : drd.GetString(posNombreTipousuario);
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
                            int posNombreTipousuario = drd.GetOrdinal("NOMBRETIPOUSUARIO");
                            while (drd.Read())
                            {
                                oPersonaCLS = new PersonaCLS();
                                oPersonaCLS.iidpersona = drd.IsDBNull(posIdpersona) ? 0 :
                                    drd.GetInt32(posIdpersona);
                                oPersonaCLS.nombreCompleto = drd.IsDBNull(posNombreCompleto) ? ""
                                    : drd.GetString(posNombreCompleto);
                                oPersonaCLS.nombreSexo = drd.IsDBNull(posNombreSexo) ? ""
                                    : drd.GetString(posNombreSexo);
                                oPersonaCLS.nombreTipoUsuario = drd.IsDBNull(posNombreTipousuario) ? ""
                                  : drd.GetString(posNombreTipousuario);
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
